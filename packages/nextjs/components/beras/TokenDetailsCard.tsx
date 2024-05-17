import Image from "next/image";
import { formatEther } from "viem";
import {
  ArrowTrendingUpIcon, // ArrowTrendingDownIcon,
} from "@heroicons/react/24/solid";
import { Card } from "~~/components/Card";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { formatNumber } from "~~/utils/formatNumber";

// weird behaviour where if w-60, then adding w-full does work but with w-64 not...
export const TokenDetailsCard = ({ tokenAddress, width }: { tokenAddress: string; width?: string }) => {
  const { data: name } = useScaffoldReadContract({
    contractName: "Token",
    address: tokenAddress,
    functionName: "name",
  });

  const { data: symbol } = useScaffoldReadContract({
    contractName: "Token",
    address: tokenAddress,
    functionName: "symbol",
  });

  const { data: desc } = useScaffoldReadContract({
    contractName: "Token",
    address: tokenAddress,
    functionName: "desc",
  });

  const { data: mcap } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getMcap",
    args: [tokenAddress],
  });

  const price = 69420;

  const holders = 88;

  let descJson;
  try {
    descJson = JSON.parse(desc || "{}");
  } catch (e) {
    descJson = { img: "", desc: desc || "" };
  }

  const imageLink = "https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/" + descJson?.img;

  return (
    <Card className={`${width} bg-base-300 rounded-[1rem] overflow-hidden md:shadow-lg`}>
      <div className="flex flex-row items-center w-full h-ful md:px-0 px-2">
        <div className="h-16 w-16">
          <Image
            className="rounded-[1rem] aspect-square w-full"
            src={imageLink}
            alt="placeholder"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col h-full justify-start px-4">
          <span className="text-neutral text-xl">{symbol}</span>
          <span className="text-neutral line-clamp-1">{name}</span>
        </div>
      </div>
      <div className="flex flex-col justify-start mt-2 md:px-0 px-2">
        <span className="text-base-300">Current Price:</span>
        <div className="flex flex-row items-center pb-2 pt-0 m-0">
          <p className="md:text-2xl text-xl text-accent font-bold m-0 p-0">${formatNumber(price)}</p>
          <ArrowTrendingUpIcon height={"1.5rem"} className="text-accent" />
        </div>
        <span className="text-base-300">Total Market Cap:</span>
        <p className="text-neutral mt-2">{formatEther(mcap || BigInt(0))}</p>
        <span className="text-base-300">Total Holders:</span>
        <p className="text-neutral mt-2">{formatNumber(holders)}</p>
        <span className="text-base-300">Description:</span>
        <p className="text-neutral mt-2">{descJson.desc}</p>
      </div>
    </Card>
  );
};
