// app/admin/pesan/page.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { trpc } from "@/trpc/client";

export default function PesanPage() {
  const utils = trpc.useUtils();

  // Ambil semua pesan dari server
  const { data: messages, isLoading } = trpc.message.getAll.useQuery();

  // Mutasi hapus pesan
  const deleteMutation = trpc.message.delete.useMutation({
    onSuccess: () => {
      toast.success("Pesan berhasil dihapus");
      utils.message.getAll.invalidate(); // refresh data
    },
    onError: () => {
      toast.error("Gagal menghapus pesan");
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus pesan ini?")) {
      deleteMutation.mutate({ id });
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-600">Memuat pesan...</p>;
  }

  return (
    <Card className="w-full bg-gray-50 shadow-md border border-gray-200 rounded-bl-2xlxl">
      <CardHeader className="pb-2">
        <CardTitle className="text-3xl font-bold text-gray-800">
          Manajemen Pesan
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto rounded-lg">
          <Table className="min-w-full text-sm">
            <TableHeader className="bg-gray-700 text-white">
              <TableRow>
                <TableHead className="text-white font-semibold w-[140px]">
                  Tanggal
                </TableHead>
                <TableHead className="text-white font-semibold">Nama</TableHead>
                <TableHead className="text-white font-semibold">
                  Email
                </TableHead>
                <TableHead className="text-white font-semibold">
                  Pesan
                </TableHead>
                <TableHead className="text-white text-right font-semibold">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {messages?.map((msg, index) => (
                <TableRow
                  key={msg.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition-colors`}
                >
                  <TableCell className="text-gray-800">
                    {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-gray-800">{msg.name}</TableCell>
                  <TableCell className="text-gray-800">{msg.email}</TableCell>
                  <TableCell className="text-gray-800 max-w-[300px] truncate">
                    {msg.message}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(msg.id)}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <p className="text-gray-600 italic text-sm mt-4 text-right">
            Daftar pesan masuk dari formulir kontak
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
