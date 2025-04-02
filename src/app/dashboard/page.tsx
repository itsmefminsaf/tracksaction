import getUserInfo from "@/actions/getUserInfo";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import MyAccount from "@/components/MyAccount";
import { redirect } from "next/navigation";

const Dashboard = async ({ email }: { email: string }) => {
  const user = await getUserInfo({ name: true });
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <>
      <header className="bg-foreground/50 m-3 flex items-center justify-between rounded-2xl p-5">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Tracksaction"
            width={64}
            className="aspect-square"
          />
          <h1 className="text-4xl font-extrabold">Tracksaction</h1>
          <hr className="mx-4 h-10 w-0.5 rotate-12 bg-white" />
          <h1 className="text-5xl font-bold">Dashboard</h1>
          <hr className="mx-4 h-10 w-0.5 rotate-12 bg-white" />
          <h1 className="text-4xl">{user?.name}</h1>
        </div>
        <MyAccount email={email} />
      </header>
    </>
  );
};

export default Dashboard;
