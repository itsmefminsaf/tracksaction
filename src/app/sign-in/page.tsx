import PingAnimation from "@/components/PingAnimation";
import Form from "./Form";

const SignInPage = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <PingAnimation text="Sign In" />
      <Form />
    </main>
  );
};

export default SignInPage;
