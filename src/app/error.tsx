"use client";

const error = ({ error }: { error: Error }) => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-3xl text-red-500">: ( There is an error</h1>
      <h1>{error.message}</h1>
      <button
        className="mt-3 rounded-full border-2 border-red-500 px-4 py-3 hover:bg-red-500"
        onClick={() => {
          history.go(0);
        }}
      >
        Refresh the page
      </button>
    </main>
  );
};

export default error;
