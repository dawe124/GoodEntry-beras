// import Image from "next/image";

export const LastTradeCard = ({
  tradeData,
  index,
}: {
  tradeData: { id: string; name: string; transaction: string; amount: number; token: string };
  index: number;
}) => {
  return (
    // <div className="basis-1/6 flex-shrink-0 w-full h-[60px] bg-red-500 border border-blue-500">
    // </div>
    <div
      className={`group md:basis-1/12 basis-1/6 w-full overflow-x-clip content-box flex-shrink-0 flex-grow-0 flex flex-col items-center justify-between md:p-1 p-0.5`}
    >
      <div className="w-full rounded-lg">
        <div
          className={`z-20 relative overflow-hidden w-full m-h-8 aspect-square tradecard-gradient-${index} rounded-lg  group-hover:shadow-center ${
            index === 0 ? "group-hover:shadow-[#FFB702]" : "group-hover:shadow-accent"
          }`}
        >
          {/* <Image
            className="md:rounded-[1rem] rounded-md aspect-square w-full"
            src={tradeData.imgUrl}
            alt="placeholder"
            width={100}
            height={100}
          /> */}
          <span
            className={`absolute bottom-1 left-0 right-0 text-center ${
              index === 0 ? "text-neutral newest-trade" : "text-neutral"
            }`}
          >
            {tradeData.token}
          </span>
        </div>
        <div className="p-1 line-clamp-1 overflow-ellipsis">
          <p className="font-bold text-neutral text-xs p-0 pt-1 m-0 text-center line-clamp-1">{tradeData.name}</p>
          <p
            className={`font-semibold ${
              tradeData.transaction == "sell" ? "text-red-600" : "text-accent"
            } text-xs p-0 m-0 text-center`}
          >
            ${tradeData.amount}
          </p>
        </div>
      </div>
    </div>
  );
};
