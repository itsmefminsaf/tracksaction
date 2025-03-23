import connectToDatabase from "@/utils/connectToMongoDB";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async (req: NextRequest) => {
  try {
    const { uname, pwd, confirmPwd } = await req.json();
    if (!uname || !pwd || !confirmPwd) {
      return NextResponse.json(
        { message: "All fields are mandatory" },
        { status: 400 },
      );
    }
    if (pwd !== confirmPwd) {
      return NextResponse.json(
        { message: "Confirm password and password must be same" },
        { status: 400 },
      );
    }
    const client = await connectToDatabase();
    const db = client.db("auth");
    const user = db.collection("user");
    const existingUser = await user.findOne({ uname });
    if (existingUser) {
      return NextResponse.json(
        { message: "Sorry, username already taken. Try a different one" },
        { status: 409 },
      );
    } else {
      const salt = crypto.randomBytes(16).toString("hex");
      const pwdHash = await crypto
        .pbkdf2Sync(pwd, salt, 1024, 64, "sha256")
        .toString("hex");
      await user.insertOne({ uname, pwdHash, salt });
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 },
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
