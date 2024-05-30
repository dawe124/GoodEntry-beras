import Image from "next/image";
import { roundNumber } from "~~/utils/roundNumber";

export const LastTradeCard = ({
  tradeData,
  index,
}: {
  tradeData: {
    type: string;
    amount: string;
    user: string;
    tokenAddress: { _id: string; icon: string; symbol: string };
  };
  index: number;
}) => {
  return (
    <div
      className={`group md:basis-1/12 basis-1/6 w-full overflow-x-clip content-box flex-shrink-0 flex-grow-0 flex flex-col items-center justify-between md:p-1 p-0.5`}
    >
      <div className="w-full rounded-lg">
        <div
          className={`z-20 relative overflow-hidden w-full m-h-8 aspect-square tradecard-gradient-${index} rounded-lg  group-hover:shadow-center ${
            index === 0 ? "group-hover:shadow-[#FFB702]" : "group-hover:shadow-accent"
          }`}
        >
          <Image
            className="aspect-square w-full opacity-30 object-cover"
            src={`https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/${tradeData.tokenAddress?.icon}`}
            alt="placeholder"
            width={100}
            height={100}
          />
          <span
            className={`absolute bottom-1 left-0 right-0 text-center ${
              index === 0 ? "text-neutral newest-trade" : "text-neutral"
            }`}
          >
            {tradeData.tokenAddress?.symbol}
          </span>
        </div>
        <div className="p-1 line-clamp-1 overflow-ellipsis">
          <p
            className={`font-semibold ${
              tradeData.type == "SELL" ? "text-red-600" : "text-accent"
            } text-md p-0 m-0 text-center`}
          >
            {roundNumber(Number(tradeData.amount), 0)}
          </p>
        </div>
      </div>
    </div>
  );
};
