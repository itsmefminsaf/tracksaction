import PingAnimation from "@/components/PingAnimation";
import Form from "./Form";

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <PingAnimation text="Sign up" />
      <Form />
    </main>
  );
};

export default SignUpPage;
