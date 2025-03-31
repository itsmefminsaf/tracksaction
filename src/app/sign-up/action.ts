"use server";

import connectToDatabase from "@/utils/connectToMongoDB";
import createSession from "@/utils/createSession";
import generatePasswordHash from "@/utils/generatePasswordHash";
import { formState } from "@/utils/types";
import { redirect } from "next/navigation";

const signUpAction = async (prevState: formState, formDate: FormData) => {
  const name = formDate.get("name") as string;
  const email = formDate.get("email") as string;
  const password = formDate.get("password") as string;
  const confirmPassword = formDate.get("confirmPassword") as string;

  const values = { name, email, password, confirmPassword };

  if (!name || !email || !password || !confirmPassword) {
    return { values, error: "All fields are mandatory" };
  }

  if (password !== confirmPassword) {
    values.confirmPassword = "";
    return { values, error: "Passwords must be same" };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("auth");
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      values.email = "";
      return { values, error: "Email already used" };
    }

    const { hash, salt } = await generatePasswordHash(password);

    await users.insertOne({
      name,
      email,
      password: { hash, salt },
    });

    await createSession(email);
  } catch (error) {
    console.log(error);
    return { values, error: "Something went wrong" };
  }
  redirect("/");
};

export default signUpAction;
