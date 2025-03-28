"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { PiPasswordBold } from "react-icons/pi";

const Form = () => {
  return (
    <form className="bg-foreground/40 flex max-w-96 flex-col gap-4 rounded-3xl p-8">
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="form-input-label">
          User name
        </label>
        <div className="form-input">
          <FaUser />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Ex: john123"
            className="outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="form-input-label">
          Password
        </label>
        <div className="form-input">
          <PiPasswordBold />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ex: **********"
            className="outline-none"
          />
        </div>
      </div>
      <Link href={"forgot-password"} className="text-center">
        forgot password
      </Link>
      <div className="flex items-center justify-evenly">
        <Link
          href={"/sign-up"}
          className="bg-background text-foreground w-fit rounded-2xl px-3 py-2 font-bold"
        >
          Sign up
        </Link>
        <p className="font-extrabold">or</p>
        <button
          type="submit"
          className="bg-foreground text-background w-fit rounded-2xl px-3 py-2 font-bold"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default Form;
