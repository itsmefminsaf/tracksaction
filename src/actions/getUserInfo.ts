"use server";

import connectToDatabase from "@/utils/connectToMongoDB";
import { userReqFieldsType, userType } from "@/utils/types";
import getSession from "./getSession";
import { redirect } from "next/navigation";

const getUserInfo = async (reqFields: userReqFieldsType) => {
  const email = await getSession();

  if (!email) redirect("/sign-in");

  try {
    return (await connectToDatabase())
      .db("auth")
      .collection("users")
      .findOne<userType>({ email }, { projection: reqFields });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export default getUserInfo;
