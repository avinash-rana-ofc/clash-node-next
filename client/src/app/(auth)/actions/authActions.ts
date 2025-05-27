"use server";

import { REGISTER_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";

export async function registerAction(prevState: any, formdata: FormData) {
  console.log("The form data is", formdata);

  try {
    console.log(REGISTER_URL);
    const payload = {
      name: formdata.get("name")?.toString() ?? "",
      email: formdata.get("email")?.toString() ?? "",
      password: formdata.get("password")?.toString() ?? "",
      confirm_password: formdata.get("confirm_password")?.toString() ?? "",
    };

    const { data } = await axios.post(REGISTER_URL, payload);
    return {
      status: 200,
      message:
        data?.message ??
        "Account created successfully! Please check your email and verify your email",
      errors: {},
    };
  } catch (error) {
    //console.log(error);
    
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
