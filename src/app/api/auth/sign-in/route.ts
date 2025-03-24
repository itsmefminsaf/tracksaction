import connectToDatabase from "@/utils/connectToMongoDB";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { userType } from "@/utils/types";

export const POST = async (req: NextRequest) => {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are mandatory" },
        { status: 400 },
      );
    }

    const client = await connectToDatabase();
    const db = client.db("auth");
    const user = db.collection("user");
    const existingUser = await user.findOne<userType>({ username });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordCorrect =
      crypto
        .pbkdf2Sync(password, existingUser.password.salt, 1024, 64, "sha256")
        .toString("hex") === existingUser.password.hash;

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 },
      );
    }

    const JWT_SECRET_KEY = process.env.JWT_PRIVATE_KEY as jwt.Secret;

    if (!JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined in .env file");
    }

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
      expiresIn: "7d",
      algorithm: "HS512",
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
