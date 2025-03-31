"use client";

import { formState } from "@/utils/types";
import Link from "next/link";
import { useActionState } from "react";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import signInAction from "./action";

const Form = () => {
  const initialState: formState = {
    values: {},
  };
  const [state, action, isPending] = useActionState(signInAction, initialState);
  return (
    <form
      action={action}
      className="bg-foreground/40 flex max-w-96 flex-col gap-4 rounded-3xl p-8"
    >
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
      {state.error && (
        <p className="w-fit place-self-center rounded-full bg-red-500 px-2 py-1 text-xs">
          {state.error}
        </p>
      )}
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
          className="bg-foreground text-background disabled:bg-foreground/50 w-fit rounded-2xl px-3 py-2 font-bold"
          disabled={isPending}
        >
          {isPending ? "Signing in" : "Sing in"}
        </button>
      </div>
    </form>
  );
};

export default Form;
