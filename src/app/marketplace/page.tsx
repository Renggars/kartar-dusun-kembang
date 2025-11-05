import Marketplace from "@/components/Marketplace";

export const metadata = {
  title: "Marketplace Dusun Kembang",
  description: "Jelajahi UMKM, event, wisata, dan café di Dusun Kembang.",
};

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Marketplace />
    </main>
  );
}
