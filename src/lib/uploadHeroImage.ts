import { supabase } from "./supabase";

// Upload gambar baru ke bucket "hero-images"
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
  return data?.publicUrl || null;
}

// Hapus gambar lama dari Supabase Storage berdasarkan URL publik
export async function deleteHeroImage(publicUrl: string) {
  try {
    const path = publicUrl.split("/hero-images/")[1];
    if (!path) return;

    const { error } = await supabase.storage.from("hero-images").remove([path]);

    if (error) {
      console.warn("Gagal menghapus gambar lama:", error.message);
    } else {
      console.log("Gambar lama berhasil dihapus:", path);
    }
  } catch (err) {
    console.error("Error saat menghapus gambar:", err);
  }
}
