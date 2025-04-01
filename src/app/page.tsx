import getSession from "@/actions/getSession";
import Dashboard from "@/components/Dashboard";
import LandingPage from "@/components/LandingPage";

const Page = async () => {
  const email = await getSession();
  return <>{email ? <Dashboard email={email} /> : <LandingPage />}</>;
};

export default Page;
