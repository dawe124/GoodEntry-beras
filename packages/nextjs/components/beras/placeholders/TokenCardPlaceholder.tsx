import Image from "next/image";
import { Card } from "~~/components/Card";

export const TokenCardPlaceholder = () => {
  const imageLink = "/berahead.png";

  return (
    <Card
      image={
        <Image
          src={imageLink}
          width={400}
          height={400}
          className="rounded-[4px] p-2 w-full aspect-square object-cover"
          alt="Token Image"
        />
      }
      title={"Las Beras"}
      className={`bg-base-300 rounded-[4px] overflow-hidden md:shadow-lg line-clamp-2`}
    >
      <div className="flex flex-col md:justify-start justify-center">
        <p className="text-base-300 md:text-start text-center md:block hidden h-10 overflow-y-clip">Las Beras</p>
        <div className="w-full flex flex-row items-center justify-between md:pb-5 pb-2 pt-0 m-0">
          <span className="md:block hidden text-neutral">Market Cap: </span>
          <p className="md:text-xl text-sm text-accent font-bold md:text-start text-center m-0 p-0 ">Over 9000!</p>
        </div>
      </div>
    </Card>
  );
};
