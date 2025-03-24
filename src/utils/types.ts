export type userType = {
  _id?: string;
  username: string;
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
