import getUserInfo from "@/actions/getUserInfo";

const Dashboard = async ({ email }: { email: string }) => {
  const user = await getUserInfo(email, { name: true });
  return (
    <div>
      <h1>{user?.name}</h1>
      <h1>{email}</h1>
    </div>
  );
};

export default Dashboard;
