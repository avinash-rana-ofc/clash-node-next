"use server";

import { REGISTER_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";

export async function registerAction(prevState: any, formData: FormData) {
  console.log("The form data is", formData);

  try {
    console.log(REGISTER_URL)
    await axios.post(REGISTER_URL, formData);
    return {
      status: 200,
      message:
        "Account created successfully! Please check your email and verify your email",
        errors : {}
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data?.message,
          errors: error.response?.data?.errors,
        };
      }
    }

    return {
      status: 500,
      message: "Something went wrong. PLease try again!",
      errors: {},
    };
  }
}
