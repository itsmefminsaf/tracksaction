import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <h1>Welcome to Tracksaction</h1>
      <Link href={"/sign-in"}>Sign in</Link>
      <Link href={"/sign-up"}>Sign up</Link>
    </>
  );
};

export default LandingPage;
