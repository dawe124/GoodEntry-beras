import Image from "next/image";

export const LastTradeCard = ({
  tradeData,
  index,
}: {
  tradeData: { id: string; name: string; transaction: string; amount: number; imgUrl: string };
  index: number;
}) => {
  return (
    <div
      className={`w-full flex flex-col md:bg-base-200 items-center justify-between md:rounded-[1rem] rounded-xl hover:shadow-center hover:shadow-accent duration-300 md:p-2 p-0.5 md:mx-2 ${
        index == 0 ? "tradecard-rainbow" : ""
      }`}
    >
      <div className=" relative overflow-hidden w-full m-h-8">
        <Image
          className="md:rounded-[1rem] rounded-md aspect-square w-full"
          src={tradeData.imgUrl}
          alt="placeholder"
          width={100}
          height={100}
        />
      </div>
      <div className="flex w-full flex-col">
        <p className="font-bold text-neutral md:text-xl text-xs p-0 pt-1 m-0 text-center line-clamp-1">
          {tradeData.name}
        </p>
        <p
          className={`font-semibold ${
            tradeData.transaction == "sell" ? "text-red-600" : "text-accent"
          } md:text-xl text-xs p-0 m-0 text-center`}
        >
          ${tradeData.amount}
        </p>
      </div>
    </div>
    // <Card
    //   image=<img src={imageLink} className="rounded-[1rem] p-2 aspect-square" alt="Token Image" />
    //   title={name + " (" + symbol + ")"}
    //   className={`${width} bg-base-300 rounded-[1rem] overflow-hidden md:shadow-lg line-clamp-2`}
    // >
    //   <div className="flex flex-col md:justify-start justify-center">
    //     <p className="text-base-300 md:text-start text-center md:block hidden">{descJson.desc}</p>
    //     <div className="flex flex-row items-center justify-center md:pb-5 pb-2 pt-0 m-0">
    //       <p className="md:text-2xl text-xl text-accent font-bold md:text-start text-center m-0 p-0">$1,000</p>
    //       <ArrowTrendingUpIcon height={"1.5rem"} className="text-accent" />
    //     </div>
    //   </div>
    // </Card>
  );
};
