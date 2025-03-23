import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "Where is the token" },
        { status: 400 },
      );
    }

    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY as jwt.Secret,
    ) as { _id: string };

    if (!tokenPayload) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json({ uid: tokenPayload._id }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
