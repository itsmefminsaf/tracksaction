import { ObjectId } from "mongodb";

export type userType = {
  _id?: ObjectId;
  name: string;
  email: string;
  password: {
    hash: string;
    salt: string;
  };
  transactions?: {
    date: string;
    time: string;
    description: string;
    amount: number;
  }[];
};

export type formState = {
  values: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  error?: string;
};
