const PingAnimation = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-5">
      <div className="bg-foreground before:bg-foreground size-8 rounded-full before:absolute before:size-8 before:animate-ping before:rounded-full"></div>
      <h1 className="text-3xl font-extrabold">{text}</h1>
    </div>
  );
};

export default PingAnimation;
