"use server";

import connectToDatabase from "@/utils/connectToMongoDB";
import { userReqFieldsType, userType } from "@/utils/types";
import getSession from "./getSession";

const getUserInfo = async (reqFields: userReqFieldsType) => {
  try {
    const email = await getSession();

    if (!email) {
      return null;
    }

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
