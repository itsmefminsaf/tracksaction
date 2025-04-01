"use server";

import connectToDatabase from "@/utils/connectToMongoDB";
import { userReqFieldsType, userType } from "@/utils/types";

const getUserInfo = async (email: string, reqFields: userReqFieldsType) => {
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
