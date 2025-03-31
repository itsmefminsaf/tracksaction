import crypto from "crypto";
import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

const createSession = async (email: string) => {
  const session_id = crypto.randomBytes(512).toString("hex").normalize();
  (await cookies()).set("session_id", session_id, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  const redis = Redis.fromEnv();

  await redis.set(`session_id:${session_id}`, email, { ex: 60 * 60 * 24 * 7 });
  return;
};

export default createSession;
