import connectToDatabase from "@/utils/connectToMongoDB";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const { uname, pwd } = await req.json();

    if (!uname || !pwd) {
      return NextResponse.json(
        { message: "Username and password are mandatory" },
        { status: 400 },
      );
    }

    const client = await connectToDatabase();
    const db = client.db("auth");
    const user = db.collection("user");
    const existingUser = await user.findOne({ uname });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { salt, _id, pwdHash } = existingUser;

    const isPasswordCorrect =
      crypto.pbkdf2Sync(pwd, salt, 1024, 64, "sha256").toString("hex") ===
      pwdHash;

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 },
      );
    }
    const token = jwt.sign(
      { _id },
      process.env.JWT_PRIVATE_KEY as jwt.PrivateKey,
      {
        algorithm: "HS256",
        expiresIn: "7d",
      },
    );
    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
