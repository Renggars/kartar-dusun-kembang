import { supabase } from "./supabase";

export async function uploadHeroImage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("hero-images") // pastikan sudah buat bucket ini di Supabase
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("hero-images").getPublicUrl(fileName);
  return data?.publicUrl || null;
}
