"use client";

import React, { useActionState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { loginAction } from "@/app/(auth)/actions/authActions";
import { toast } from "sonner";
import { SubmitButton } from "../common/SubmitButton";
import { signIn } from "next-auth/react";
import { stat } from "fs";

function LoginForm() {
  const initState = {
    status: 0,
    message: "",
    errors: {},
    data: {},
  };

  const [state, formAction] = useActionState(loginAction, initState);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      signIn("credentials", {
        email: state.data?.email,
        password: state.data?.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    }
  }, [state]);
  return (
    <div>
      <form action={formAction}>
        <div className="mt-4">
          <Label htmlFor="">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email..."
          />
          <span className="text-red-500">{state.errors?.email}</span>
        </div>
        <div className="mt-4">
          <Label htmlFor="">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password..."
          />
          <span className="text-red-500">{state.errors?.password}</span>

          <div className="font-bold text-right">
            <Link href="forget-password">Forget Password ?</Link>
          </div>
        </div>
        <div className="mt-4">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
