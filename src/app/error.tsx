"use client";

const error = () => {
  return (
    <main className="h-screen w-screen">
      <h1 className="text-5xl text-red-500">Something went wrong.</h1>
      <button
        className="rounded-full px-4 py-3"
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
