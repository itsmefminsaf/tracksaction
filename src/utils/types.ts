import { ObjectId } from "mongodb";

export type transactionType = {
  date: string;
  time: string;
  description: string;
  amount: number;
};

export type modelType = {
  name: string;
  image?: string;
  important?: boolean;
  transactions?: transactionType[];
};

export type userType = {
  _id?: ObjectId;
  name: string;
  email: string;
  password: {
    hash: string;
    salt: string;
  };
  models?: modelType[];
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
