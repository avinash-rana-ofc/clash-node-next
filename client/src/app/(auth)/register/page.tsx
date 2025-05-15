import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md px-10 py-5 rounded-xl w-[500px]">
        <h1 className="bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 font-extrabold text-transparent text-4xl text-center">
          Clash
        </h1>
        <h1 className="font-bold text-3xl">Register Page</h1>
        <p>Welcome to clash</p>
        <form action="">
          <div className="mt-4">
            <Label htmlFor="">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name..."
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email..."
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password..."
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="">Confirm Password</Label>
            <Input
              id="cpassword"
              type="password"
              name="confirm_password"
              placeholder="Enter your confirm password..."
            />
          </div>
          <div className="mt-4">
            <Button className="w-full">Submit</Button>
          </div>
        </form>
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
