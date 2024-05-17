import Image from "next/image";
import { formatEther } from "viem";
import {
  ArrowTrendingUpIcon, // ArrowTrendingDownIcon,
} from "@heroicons/react/24/solid";
import { Card } from "~~/components/Card";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// weird behaviour where if w-60, then adding w-full does work but with w-64 not...
export const MemeOfTheHill = () => {
  const width = "w-64";
  const hour = Math.floor(new Date().getTime() / 3600000);

  const { data: tokenAddress } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "hourlyVolumeLeader",
    args: [hour],
    watch: true,
  });

  const { data: tokenVolume } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getTokenHourlyVolume",
    args: [tokenAddress, hour],
  });

  const { data: jackpotAmount } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "hourlyJackpot",
    args: [hour],
  });

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

  const { data: price } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getPrice",
    args: [tokenAddress],
  });

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
          <p className="md:text-2xl text-xl text-accent font-bold m-0 p-0">${formatEther(price || BigInt(0))}</p>
          <ArrowTrendingUpIcon height={"1.5rem"} className="text-accent" />
        </div>
        <span className="text-base-300">Hourly Volume:</span>
        <p className="text-neutral mt-2">{formatEther(tokenVolume || BigInt(0))}</p>
      </div>
      Jackpot: {formatEther(jackpotAmount || BigInt(0))}
    </Card>
  );
};
