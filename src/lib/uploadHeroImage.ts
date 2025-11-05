import { supabase } from "./supabase";

export async function uploadHeroImage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("hero-images")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) {
    console.error("Upload error:", error.message);
    console.log("Failed to upload image to Supabase Storage.");
    return null;
  }

  const { data } = supabase.storage.from("hero-images").getPublicUrl(fileName);
  console.log("Public URL:", data?.publicUrl);

  console.log(data.publicUrl);
  return data?.publicUrl || null;
}
