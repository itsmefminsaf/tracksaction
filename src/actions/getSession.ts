"use server";

import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

const getSession = async () => {
  try {
    const session = (await cookies()).get("session_id")?.value;

    if (!session) {
      return null;
    }

    return (await Redis.fromEnv().get(`session_id:${session}`)) as string;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export default getSession;
