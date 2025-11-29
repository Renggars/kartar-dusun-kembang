import { supabase } from "./supabase";

/**
 * Mengunggah file gambar ke bucket 'gallery-images' di Supabase Storage.
 * @param file Objek File yang akan diunggah.
 * @returns URL publik dari gambar yang diunggah.
 */
export async function uploadGalleryImage(file: File): Promise<string> {
  // Membuat nama file unik
  const fileName = `gallery-${Date.now()}-${file.name.replace(/\s/g, "_")}`;

  // 1. Upload file
  const { error: uploadError } = await supabase.storage
    .from("gallery-images") // Pastikan bucket ini sudah ada di Supabase
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false, // Jangan timpa jika nama file sama (sudah diatasi dengan Date.now())
    });

  if (uploadError) {
    console.error("Supabase Upload Error:", uploadError.message);
    throw new Error(`Gagal mengunggah gambar: ${uploadError.message}`);
  }

  // 2. Mendapatkan URL publik
  const { data: publicUrlData } = supabase.storage
    .from("gallery-images")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

/**
 * Menghapus gambar Galeri dari Supabase berdasarkan URL publiknya.
 * @param publicUrl URL publik dari gambar yang akan dihapus.
 */
export async function deleteGalleryImage(publicUrl: string) {
  try {
    // Mengekstrak path/nama file dari URL
    const path = publicUrl.split("/gallery-images/")[1];
    if (!path) {
      console.warn("URL Galeri tidak valid, tidak dapat menghapus:", publicUrl);
      return;
    }

    const { error } = await supabase.storage
      .from("gallery-images")
      .remove([path]);

    if (error) {
      console.warn("Gagal menghapus gambar galeri:", error.message);
    } else {
      console.log("Gambar galeri terhapus:", path);
    }
  } catch (err) {
    console.error("Error saat menghapus gambar galeri:", err);
  }
}
