import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

let cachedClient: MongoClient | null = null;

const connectToDatabase = async () => {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
};

export default connectToDatabase;
