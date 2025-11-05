// src/server/service/authService.ts
import { hash, compare } from "bcrypt-ts";
import { TRPCError } from "@trpc/server";
import { generateAuthTokens } from "./tokenService";
import { cookies } from "next/headers";
import type { Context } from "@/server/context";
import type { RegisterInput, LoginInput } from "@/server/validation/authSchema";

export const registerUser = async (ctx: Context, input: RegisterInput) => {
  const { email, password, username } = input;

  const existingUser = await ctx.prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Email already in use",
    });
  }

  const hashedPassword = await hash(password, 10);

  const user = await ctx.prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  return {
    id: user.id,
    email: user.email,
    username: user.username,
  };
};

export const loginUser = async (ctx: Context, input: LoginInput) => {
  try {
    const { email, password } = input;
    const { prisma } = ctx;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Email atau kata sandi salah.",
      });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Email atau kata sandi salah.",
      });
    }

    // Buat Access dan Refresh Token
    const tokens = generateAuthTokens({ id: user.id });
    const cookieStore = await cookies();

    // Atur Access Token
    cookieStore.set("token", tokens.access.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 jam
      path: "/",
    });

    // Atur Refresh Token
    cookieStore.set("refreshToken", tokens.refresh.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 hari
      path: "/",
    });

    return {
      message: "Login berhasil!",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  } catch (err) {
    console.error("❌ Error in loginUser service:", err);
    if (err instanceof TRPCError) {
      throw err; // Lempar ulang error TRPC yang sudah kita buat
    }
    // Untuk error lainnya
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Terjadi kesalahan saat login",
    });
  }
};

/**
 * Logout user dengan menghapus cookies
 */
export const logoutUser = async () => {
  try {
    const cookieStore = await cookies();

    // Hapus Access Token
    cookieStore.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    // Hapus Refresh Token
    cookieStore.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return { message: "Logout berhasil" };
  } catch (err) {
    console.error("Error in logoutUser service:", err);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Gagal logout",
    });
  }
};
