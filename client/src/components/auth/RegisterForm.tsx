"use client";

import { registerAction } from "@/app/(auth)/actions/authActions";
import React, { useActionState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitButton } from "../common/SubmitButton";
import { toast } from "sonner";
import { stat } from "fs";

export default function RegisterForm() {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };

  const [state, formAction] = useActionState(registerAction, initState);

  useEffect(() => {
    if(state.status === 500){
      toast.error(state.message)
    }else if(state.status === 200){
      toast.success(state.message)
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
        <div className="mt-4">
          <Label htmlFor="">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name..."
          />
          <span className="text-red-500">{state.errors?.name}</span>
        </div>
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
        </div>
        <div className="mt-4">
          <Label htmlFor="">Confirm Password</Label>
          <Input
            id="cpassword"
            type="password"
            name="confirm_password"
            placeholder="Enter your confirm password..."
          />
          <span className="text-red-500">{state.errors?.confirm_password}</span>
        </div>
        <div className="mt-4">
          <SubmitButton />
        </div>

        {state.message && (
          <p
            className={`mt-4 text-sm ${
              state.status === 200 ? "text-green-600" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </>
  );
}
