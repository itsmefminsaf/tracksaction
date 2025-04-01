import { userType } from "@/utils/types";

const Dashboard = async ({ user }: { user: userType }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      {user.sessions.map((session, index) => {
        return (
          <li key={index}>
            <span>{index + 1}.</span>
            {session}
          </li>
        );
      })}
    </div>
  );
};

export default Dashboard;
