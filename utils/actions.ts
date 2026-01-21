import db from "@/utils/db";
import { redirect } from "next/navigation";
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
