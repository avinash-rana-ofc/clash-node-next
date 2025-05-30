import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md px-10 py-5 rounded-xl w-[500px]">
        <h1 className="bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 font-extrabold text-transparent text-4xl text-center">
          Clash
        </h1>
        <h1 className="font-bold text-3xl">Login Page</h1>
        <p>Welcome back</p>
        <LoginForm />
        <p className="mt-2 text-center">Don't have an account ?{" "} <strong><Link href="/register">Register</Link></strong></p>
      </div>
    </div>
  );
}
