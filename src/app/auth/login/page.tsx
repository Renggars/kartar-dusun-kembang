"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { trpc } from "@/trpc/client";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid."),
  password: z.string().min(8, "Password minimal 8 karakter."),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      router.push("/");
      toast.success("Login berhasil!");
    },
    onError: (error) => {
      toast.error(`Login gagal: ${error.message}`);
    },
  });

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Masuk ke akun Anda
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          <FaEye className="w-5 h-5" />
                        ) : (
                          <IoIosEyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <Label className="flex items-center gap-2 cursor-pointer text-black">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600 rounded-sm"
                />
                Ingat saya
              </Label>
              <a
                href="/auth/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Lupa Password?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
