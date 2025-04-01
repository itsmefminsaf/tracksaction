"use server";

import comparePasswords from "@/utils/comparePassword";
import connectToDatabase from "@/utils/connectToMongoDB";
import createSession from "@/utils/createSession";
import { formState } from "@/utils/types";
import { redirect } from "next/navigation";

const signInAction = async (
  prevState: formState,
  formDate: FormData,
): Promise<formState> => {
  const email = formDate.get("email") as string;
  const password = formDate.get("password") as string;

  const values = { email, password };

  if (!email || !password) {
    return { values, error: "All fields are mandatory" };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("auth");
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      return { values, error: "User not found. Try Sign up" };
    }

    const correctPassword = await comparePasswords(password, user.password);

    if (!correctPassword) {
      values.password = "";
      return { values, error: "Incorrect password" };
    }

    await createSession(email);
  } catch (error) {
    console.log(error);
    return { values, error: "Something went wrong" };
  }

  redirect("/");
};

export default signInAction;
