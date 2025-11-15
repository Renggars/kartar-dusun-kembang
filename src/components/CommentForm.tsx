"use client";

import { trpc } from "@/trpc/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuMessageCircleMore, LuSend } from "react-icons/lu";

type MessageFormData = {
  name: string;
  email: string;
  message: string;
};

export const CommentForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>();

  const createMessage = trpc.message.create.useMutation({
    onSuccess: () => {
      reset();
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      alert("Failed to send message, please try again.");
    },
  });

  const onSubmit = (data: MessageFormData) => {
    setLoading(true);
    createMessage.mutate(data);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl w-full border border-gray-200 shadow-xl">
      <div className="flex items-center gap-4 mb-10 mt-1">
        <div className="p-3 rounded-2xl bg-indigo-100">
          <LuMessageCircleMore className="text-3xl md:text-4xl text-indigo-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Send Message{" "}
        </h2>
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Nama Lengkap */}
        <label className="flex flex-col">
          <span className="text-gray-900 font-medium mb-4">Full Name</span>
          <input
            type="text"
            {...register("name", { required: "Full name is required" })}
            placeholder="Your Full Name"
            className="bg-gray-100 py-4 px-6 placeholder:text-gray-500 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </label>
        <label className="flex flex-col">
          <span className="text-gray-900 font-medium mb-4">Your Email</span>
          <input
            type="text"
            {...register("email", { required: "Email is required" })}
            placeholder="Your Email"
            className="bg-gray-100 py-4 px-6 placeholder:text-gray-500 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-gray-900 font-medium mb-4">Your Message</span>
          <textarea
            {...register("message", { required: "Message is required" })}
            rows={4}
            placeholder="Your Message"
            className="bg-gray-100 py-4 px-6 placeholder:text-gray-500 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full relative h-12 bg-linear-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold rounded-2xl overflow-hidden group transition-all duration-250 cursor-pointer"
        >
          <div className="absolute bg-white/30 inset-0 translate-y-12 group-hover:translate-y-0 transition-transform duration-500" />
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Posting...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <LuSend className="text-xl" />
              <span>Post Comment</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};
