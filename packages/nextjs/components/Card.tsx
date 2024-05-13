type CardProps = {
  icon?: React.ReactNode;
  image?: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
};

// weird behaviour where if w-60, then adding w-full does work but with w-64 not...
export const Card = ({ icon = <></>, image = <></>, title = <></>, children, compact = false }: CardProps) => {
  // let classes = "card w-64 bg-base-100 text-primary-content shadow-xl ";
  // if (className.indexOf("w-full") > -1) classes = classes.replace("w-64", "w-full");
  // classes += className;
  return (
    <div
      /*className={classes}*/ className="w-full bg-base-100 rounded-[1rem] hover:shadow-center hover:shadow-accent duration-300 overflow-hidden flex flex-col"
    >
      <div>
        <figure>{image}</figure>
      </div>
      <div className="bg-base-100">
        <figure>{icon}</figure>
        <div className="md:px-5 px-2">
          {title != "" ? (
            <h2 className="card-title text-neutral md:text-xl text-sm pt-2 line-clamp-1">{title}</h2>
          ) : (
            <></>
          )}

          <div className={"flex flex-col text-base-300 text-sm " + (compact ? "gap-0" : "gap-2")}>{children}</div>
        </div>
      </div>
    </div>
  );
};

type CardRowProps = {
  desc?: React.ReactNode;
  value?: React.ReactNode;
  divider?: boolean;
};

export const CardRow = ({ desc, value, divider = true }: CardRowProps) => {
  return (
    <>
      <div className="text-accent-content text-xs">
        {desc}
        <span className="float-right font-bold text-primary-content">{value}</span>
      </div>
      {divider ? <hr className="border-secondary-content my-0" /> : <></>}
    </>
  );
};

export const CardAccentRow = ({ desc, value }: CardRowProps) => {
  return (
    <>
      <div className="card card-compact py-1 text-primary-content text-xs bg-base-200 my-2 rounded-full border-solid border-2 border-blue-400">
        <div className="flex justify-between md:p-1 md:px-2">
          {desc}
          <span className="float-right font-bold text-accent">{value}</span>
        </div>
      </div>
    </>
  );
};
