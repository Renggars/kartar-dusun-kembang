"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/server/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";

// 🔹 Validasi menggunakan Zod
const registerSchema = z
  .object({
    username: z.string().min(3, "Nama minimal 3 karakter."),
    email: z.string().email("Email tidak valid."),
    password: z.string().min(8, "Password minimal 8 karakter."),
    confirmPassword: z
      .string()
      .min(8, "Konfirmasi password minimal 8 karakter."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok.",
    path: ["confirmPassword"],
  });

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 🔹 tRPC Mutation untuk register
  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast.success("Registrasi berhasil! Silakan login.");
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error(`Registrasi gagal: ${error.message}`);
    },
  });

  const onSubmit = (data: RegisterInput) => {
    const { confirmPassword, ...payload } = data;
    registerMutation.mutate(payload);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Daftar Akun Baru
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-black">
                    Nama Lengkap
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama Anda"
                      type="text"
                      className="text-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-black">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      type="email"
                      className="text-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-black">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                        className="text-gray-800"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-black">
                    Konfirmasi Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="********"
                        type={showConfirmPassword ? "text" : "password"}
                        className="text-gray-800"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Mendaftarkan..." : "Daftar"}
            </Button>

            {/* Link ke Login */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Sudah punya akun?{" "}
              <a href="/auth/login" className="text-blue-600 hover:underline">
                Masuk di sini
              </a>
            </p>
          </form>
        </Form>
      </div>
    </main>
  );
}
