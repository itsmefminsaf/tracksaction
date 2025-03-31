import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

const getSession = async () => {
  const session = (await cookies()).get("session_id")?.value;

  if (!session) {
    return null;
  }

  const uid = (await Redis.fromEnv().get(`session_id:${session}`)) as string;
  return uid;
};

export default getSession;
