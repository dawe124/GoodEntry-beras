export const HelpCommand = ({ cmd }: { cmd: React.ReactNode }) => {
  return (
    <span className="font-bold text-accent">
      {cmd}
      <br />
    </span>
  );
};

export const HelpDesc = ({ desc }: { desc: React.ReactNode }) => {
  return (
    <span className="text-neutral">
      {desc}
      <br />
    </span>
  );
};

export const Help = () => {
  return (
    <div className="p-2 bg-base-100 rounded-md border border-base-300">
      <p className="m-0 text-base-300">Available Commands:</p>
      <HelpCommand cmd="/help" />
      <HelpDesc desc="/help me help you" />
      <HelpCommand cmd="/setname username" />
      <HelpDesc desc="Sets username (if available)" />
      <HelpCommand cmd="$TICKER" />
      <HelpDesc desc="Sends token ticker with link (eg. $BERA)" />
      <HelpCommand cmd="ooga booga" />
      <span>Sends highlighted </span>
      <span className="text-red-300 oonga-boonga">OOGA BOOGA</span>
      <br />
      <HelpCommand cmd="viva las beras" />
      <span className="text-neutral">
        <span>Sends highlighted </span>
        <span className="newest-trade">VIVA LAS BERAS</span>
        <br />
      </span>
    </div>
  );
};
