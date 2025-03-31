"use client";

import Link from "next/link";
import { useActionState } from "react";
import { FaUser } from "react-icons/fa";
import { PiPasswordBold } from "react-icons/pi";
import signUpAction from "./action";
import { formState } from "@/utils/types";
import { MdEmail } from "react-icons/md";

const Form = () => {
  const initialState: formState = {
    values: {},
  };
  const [state, action, isPending] = useActionState(signUpAction, initialState);
  return (
    <form
      action={action}
      className="bg-foreground/40 flex max-w-96 flex-col gap-4 rounded-3xl p-8"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="form-input-label">
          Name
        </label>
        <div className="form-input">
          <FaUser />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ex: SAF shop"
            className="outline-none"
            defaultValue={state?.values.name}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="form-input-label">
          Email
        </label>
        <div className="form-input">
          <MdEmail />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ex: name@mail.com"
            className="outline-none"
            defaultValue={state?.values.email}
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
            defaultValue={state?.values.password}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="confirmPassword" className="form-input-label">
          Confirm Password
        </label>
        <div className="form-input">
          <PiPasswordBold />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Ex: **********"
            className="outline-none"
            defaultValue={state.values.confirmPassword}
          />
        </div>
      </div>
      {state.error && (
        <p className="w-fit place-self-center rounded-full bg-red-500 px-2 py-1 text-xs">
          {state.error}
        </p>
      )}
      <div className="flex items-center justify-evenly">
        <button
          type="submit"
          className="bg-foreground text-background disabled:bg-background/50 w-fit rounded-2xl px-3 py-2 font-bold"
          disabled={isPending}
        >
          {isPending ? "SIgning in" : "Sing in"}
        </button>
        <p className="font-extrabold">or</p>
        <Link
          href={"/sign-in"}
          className="bg-background text-foreground w-fit rounded-2xl px-3 py-2 font-bold"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default Form;
