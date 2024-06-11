import Image from "next/image";
import { formatEther } from "viem";
import { Card } from "~~/components/Card";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const LotteryLeaderCard = ({ tokenAddress, round }: { tokenAddress: string; round: number }) => {
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

  const { data: lotterySettings } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getLotterySettings",
    args: [tokenAddress, round],
  });

  const strike = formatEther(lotterySettings?.[0] || BigInt(0));
  const payoutPerTicket = formatEther(lotterySettings?.[1] || BigInt(0));
  const totalOI = formatEther(lotterySettings?.[2] || BigInt(0));

  let descJson;
  try {
    descJson = JSON.parse(desc || "{}");
  } catch (e) {
    descJson = { img: "", desc: desc || "" };
  }
  const imageLink = "https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/" + descJson?.img;

  return (
    <Card className={`bg-base-300 rounded-[4px] overflow-hidden md:shadow-lg`}>
      <div className="h-16 w-16">
        <Image
          className="rounded-[4px] aspect-square w-full"
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
      <div className="flex flex-col h-full justify-start px-4">
        <span className="text-neutral text-xl">{strike}</span>
        <span className="text-neutral text-xl">{payoutPerTicket}</span>
        <span className="text-neutral text-xl">{totalOI}</span>
      </div>
    </Card>
  );
};
