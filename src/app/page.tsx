import getSession from "@/actions/getSession";
import Link from "next/link";

const Page = async () => {
  const authenticated = await getSession();
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <h1>Welcome to Tracksaction</h1>
      {authenticated ? (
        <Link href={"/dashboard"} className="cta-button">
          Go to dashboard
        </Link>
      ) : (
        <div className="flex gap-3">
          <Link href={"/sign-in"} className="cta-button">
            Sign in
          </Link>
          <Link href={"/sign-up"} className="cta-button">
            Sign up
          </Link>
        </div>
      )}
    </main>
  );
};

export default Page;
