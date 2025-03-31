import getSession from "@/actions/getSession";

const Page = async () => {
  const uid = await getSession();

  if (uid) {
    return <h1>{uid}</h1>;
  }

  return <h1>Landing page</h1>;
};

export default Page;
