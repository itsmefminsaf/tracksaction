import getUserInfo from "@/actions/getUserInfo";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const user = await getUserInfo({ name: true });
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <header>
      <h1>{user?.name}</h1>
    </header>
  );
};

export default Dashboard;
export const dynamic = "force-dynamic";
