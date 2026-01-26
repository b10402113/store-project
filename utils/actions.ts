"use server";
import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from "./schema";
import { log } from "console";
import { uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};
const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) {
    redirect("/");
  }
  return user;
};
const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "an error occurred",
  };
};
export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: { featured: true },
  });
  return products;
};
export const fetchAllProducts = async ({ search = "" }) => {
  return db.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          company: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
};
export const fetchSingleProduct = async (id: string) => {
  const product = await db.product.findUnique({
    where: { id },
  });
  if (!product) {
    redirect("/products");
  }
  return product;
};

export const createProductAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    // const name = formData.get("name") as string;
    // const company = formData.get("company") as string;
    // const description = formData.get("description") as string;
    // const price = parseFloat(formData.get("price") as string);
    // const image = formData.get("imageUrl") as File;
    // const featured = Boolean(formData.get("featured") as string);
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validateFile = validateWithZodSchema(imageSchema, { image: file });
    console.log(validateFile);
    const fullPath = await uploadImage(validateFile.image);
    console.log("RAW DATA");

    console.log(rawData);
    // const validatedFields = productSchema.safeParse(rawData);
    // if (!validatedFields.success) {
    //   const errors = validatedFields.error.errors.map((err) => err.message);
    //   throw new Error(errors.join(", "));
    // }
    const validateFields = validateWithZodSchema(productSchema, rawData);

    // return { message: "Validation succeeded!" };

    await db.product.create({
      data: {
        // name,
        // company,
        // description,
        // price,
        // featured,
        ...validateFields,
        image: fullPath,
        clerkId: user.id,
      },
    });
    // return { message: "Product created successfully!" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
  const user = await getAdminUser();
  const products = await db.product.findMany({
    where: { clerkId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return products;
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  const admin = await getAdminUser();
  try {
    await db.product.deleteMany({
      where: {
        id: productId,
        clerkId: admin.id,
      },
    });
    revalidatePath("/admin/products");
    return { message: "Product deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData,
) => {
  const admin = await getAdminUser();
  try {
    const productId = formData.get("id") as string;

    const rawData = Object.fromEntries(formData);
    const validateFields = validateWithZodSchema(productSchema, rawData);
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validateFields,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    // redirect("/admin/products");
    // return { message: "Product updated successfully" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products");
};
export const updateProductImageAction = async (
  prevState: any,
  formData: FormData,
) => {
  return { message: "Product Image updated successfully" };
};
export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      clerkId: user.id,
      productId,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};
export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      // remove favorite
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          clerkId: user.id,
          productId,
        },
      });
    }
    // add favorite

    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed from faves" : "Added to faves",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();

  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return favorites;
};
