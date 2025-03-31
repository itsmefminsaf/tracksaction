import { userType } from "@/utils/types";

const Dashboard = async ({ user }: { user: userType }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
    </div>
  );
};

export default Dashboard;
