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
      title="Latest trade"
      className={`group md:basis-1/12 basis-1/6 w-full overflow-x-clip content-box flex-shrink-0 flex-grow-0 flex flex-col items-center justify-between md:p-1 p-0.5`}
    >
      <div
        className={`w-full bg-base-100 border-[1px] ${
          index === 0 ? "border-accent" : "border-[#1E2229]"
        } rounded-[4px] hover:shadow-center hover:shadow-accent hover:border-accent p-2`}
      >
        <div
          className={`z-20 relative overflow-hidden w-full m-h-8 aspect-square rounded-full ${
            index === 0 ? "shadow-accent shadow-center" : ""
          }`}
        >
          <Image
            className="aspect-square w-full opacity-80 object-cover"
            src={`https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/${tradeData.tokenAddress?.icon}`}
            alt="placeholder"
            width={100}
            height={100}
          />
          <span
            className={`absolute bottom-1 left-0 right-0 text-center ${
              index === 0 ? "text-neutral good-title" : "text-neutral"
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
