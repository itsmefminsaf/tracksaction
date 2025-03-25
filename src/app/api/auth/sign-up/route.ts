import connectToDatabase from "@/utils/connectToMongoDB";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { userType } from "@/utils/types";

export const POST = async (req: NextRequest) => {
  try {
    const { username, password, confirmPassword } = await req.json();

    if (!username || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are mandatory" },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Password and confirm password must be same" },
        { status: 400 },
      );
    }

    const client = await connectToDatabase();
    const db = client.db("auth");
    const users = db.collection("user");
    const existingUser = await users.findOne<userType>({ username });

    if (existingUser) {
      return NextResponse.json(
        { message: "Sorry, username already taken. Try a different one" },
        { status: 409 },
      );
    } else {
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto
        .pbkdf2Sync(password, salt, 1024, 64, "sha256")
        .toString("hex");

      const newUser = await users.insertOne({
        username,
        password: { hash, salt },
      });

      const JWT_SECRET_KEY = process.env.JWT_PRIVATE_KEY as jwt.Secret;

      if (!JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined in .env file");
      }

      const token = jwt.sign({ id: newUser.insertedId }, JWT_SECRET_KEY, {
        expiresIn: "7d",
        algorithm: "HS512",
      });

      return NextResponse.json({ token }, { status: 201 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
