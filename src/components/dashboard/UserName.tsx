import getUserInfo from "@/actions/getUserInfo";

const UserName = async () => {
  const user = await getUserInfo({ name: true });
  return <h1>{user?.name}</h1>;
};

export default UserName;
export const dynamic = "force-dynamic";
