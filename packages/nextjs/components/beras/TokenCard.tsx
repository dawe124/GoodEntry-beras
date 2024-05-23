import Image from "next/image";
import { formatEther } from "viem";
import { Card } from "~~/components/Card";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { roundNumber } from "~~/utils/roundNumber";

const TokenCard = ({ tokenAddress, width }: { tokenAddress: string; width?: string }) => {
  const { targetNetwork } = useTargetNetwork();

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

  const { data: mcap } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getMcap",
    args: [tokenAddress],
  });

  const { data: desc } = useScaffoldReadContract({
    contractName: "Token",
    address: tokenAddress,
    functionName: "desc",
  });

  let descJson;
  try {
    descJson = JSON.parse(desc || "{}");
  } catch (e) {
    descJson = { img: "", desc: desc || "" };
  }
  const imageLink = "https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/" + descJson?.img;

  return (
    <Card
      image={
        <Image
          src={imageLink}
          width={400}
          height={400}
          className="rounded-[1rem] p-2 w-full aspect-square object-cover"
          alt="Token Image"
        />
      }
      title={name + " (" + symbol + ")"}
      className={`${width} bg-base-300 rounded-[1rem] overflow-hidden md:shadow-lg line-clamp-2`}
    >
      <div className="flex flex-col md:justify-start justify-center">
        <p className="text-base-300 md:text-start text-center md:block hidden h-10 overflow-y-clip">{descJson.desc}</p>
        <div className="w-full flex flex-row items-center justify-between md:pb-5 pb-2 pt-0 m-0">
          <span className="md:block hidden text-neutral">Market Cap: </span>
          <span className="md:hidden block text-neutral">MC: </span>
          <p className="md:text-xl text-sm text-accent font-bold md:text-start text-center m-0 p-0 ">
            {roundNumber(Number(formatEther(mcap || BigInt(0))), 2)} {targetNetwork.nativeCurrency.symbol}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TokenCard;
