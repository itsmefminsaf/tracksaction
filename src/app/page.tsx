import getSession from "@/actions/getSession";
import Dashboard from "@/components/Dashboard";
import LandingPage from "@/components/LandingPage";

const Page = async () => {
  const uid = await getSession();
  return <>{uid ? <Dashboard uid={uid} /> : <LandingPage />}</>;
};

export default Page;
