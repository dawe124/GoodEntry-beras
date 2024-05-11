export const HelpCommand = ({ cmd }: { cmd: React.ReactNode }) => {
  return (
    <span className="font-bold primary">
      {cmd}
      <br />
    </span>
  );
};

export const HelpDesc = ({ desc }: { desc: React.ReactNode }) => {
  return (
    <span className="">
      {desc}
      <br />
    </span>
  );
};

export const Help = () => {
  return (
    <div className="p-2 bg-base-100">
      <HelpCommand cmd="/help" />
      <HelpDesc desc="/help me help you" />
      <HelpCommand cmd="/setname username" />
      <HelpDesc desc="Sets username (if available)" />
    </div>
  );
};
