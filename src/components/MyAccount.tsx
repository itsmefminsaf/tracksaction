"use client";

import Image from "next/image";
import userImage from "@/assets/user.svg";
import { useEffect, useState } from "react";
import getUserInfo from "@/actions/getUserInfo";
import { userType } from "@/utils/types";

const MyAccount = ({ email }: { email: string }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<userType | null>();

  useEffect(() => {
    const getUser = async () => {
      setUser(await getUserInfo(email, { sessions: true }));
    };
    getUser();
  }, [email]);
  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="flex items-center justify-center gap-1 rounded-full bg-white px-2 hover:cursor-pointer"
      >
        <h4 className="text-foreground text-xl font-bold">My Account</h4>
        <Image src={userImage} alt="User" width={48} />
      </button>
      {open ? (
        <div className="absolute top-16 right-0 max-w-72 overflow-hidden rounded-3xl border-[16px] border-white bg-white text-black">
          <h3 className="mb-2 text-3xl font-bold">Your sessions</h3>
          {user?.sessions.map((session, index) => {
            return (
              <li key={index} className="list-none">
                {session}
              </li>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyAccount;
