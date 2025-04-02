import Link from "next/link";

const not_found = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <h2 className="text-3xl font-extrabold">404</h2>
      <h1 className="text-4xl">You are on wrong way</h1>
      <Link
        href={"/"}
        className="border-foreground hover:bg-foreground rounded-full border-2 px-4 py-2 font-bold duration-300 hover:text-black"
      >
        Go to home
      </Link>
    </div>
  );
};

export default not_found;
