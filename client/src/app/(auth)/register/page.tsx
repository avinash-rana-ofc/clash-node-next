import Link from "next/link";
import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md px-10 py-5 rounded-xl w-[500px]">
        <h1 className="bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 font-extrabold text-transparent text-4xl text-center">
          Clash
        </h1>
        <h1 className="font-bold text-3xl">Register Page</h1>
        <p>Welcome to clash</p>
        <RegisterForm />
        <p className="mt-2 text-center">
          Already registered ?{" "}
          <strong>
            <Link href="/login">Login</Link>
          </strong>
        </p>
      </div>
    </div>
  );
}
