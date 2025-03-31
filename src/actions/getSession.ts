import connectToDatabase from "@/utils/connectToMongoDB";
import { userType } from "@/utils/types";
import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

const getSession = async () => {
  const session = (await cookies()).get("session_id")?.value;

  if (!session) {
    return null;
  }

  const email = (await Redis.fromEnv().get(`session_id:${session}`)) as string;

  const client = await connectToDatabase();
  const db = client.db("auth");
  const users = db.collection("users");

  const user = (await users.findOne({ email })) as userType;

  return user;
};

export default getSession;
