import { createClient } from "@supabase/supabase-js";
const bucket = "main-bucket";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
);

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const ext = image.name.split(".").pop();
  const randomName = crypto.randomUUID();
  //   const newName = `${randomName}.${ext}`;
  const newName = `${timestamp}-${randomName}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: "3600",
    });
  if (!data) {
    console.log(error);

    throw new Error("Image upload failed");
  }
  return supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl;
};
