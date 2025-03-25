import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Bearer token expected" },
      { status: 400 },
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY as jwt.Secret) as {
      id: string;
    };

    return NextResponse.json({ message: "Verified" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 },
    );
  }
};
