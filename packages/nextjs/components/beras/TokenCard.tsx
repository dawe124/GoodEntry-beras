import Image from "next/image";
import {
  ArrowTrendingUpIcon, // ArrowTrendingDownIcon,
} from "@heroicons/react/24/solid";
import { Card } from "~~/components/Card";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// weird behaviour where if w-60, then adding w-full does work but with w-64 not...
export const TokenCard = ({ tokenAddress, width }: { tokenAddress: string; width?: string }) => {
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
        <p className="text-base-300 md:text-start text-center md:block hidden">{descJson.desc}</p>
        <div className="flex flex-row items-center justify-center md:pb-5 pb-2 pt-0 m-0">
          <p className="md:text-2xl text-xl text-accent font-bold md:text-start text-center m-0 p-0">$1000</p>
          <ArrowTrendingUpIcon height={"1.5rem"} className="text-accent" />
        </div>
      </div>
    </Card>
  );
};
