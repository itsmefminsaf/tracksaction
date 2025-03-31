import getSession from "@/actions/getSession";
import Dashboard from "@/components/Dashboard";
import LandingPage from "@/components/LandingPage";

const Page = async () => {
  const user = await getSession();
  return <>{user ? <Dashboard user={user} /> : <LandingPage />}</>;
};

export default Page;
