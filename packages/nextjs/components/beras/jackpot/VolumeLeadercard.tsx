import Image from "next/image";
import Link from "next/link";
import { formatEther } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { roundNumber } from "~~/utils/roundNumber";

export const VolumeLeaderCard = ({
  tokenAddress,
  index,
  volume,
}: {
  tokenAddress: string;
  index: number;
  volume: any;
}) => {
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

  let descJson;
  try {
    descJson = JSON.parse(desc || "{}");
  } catch (e) {
    descJson = { img: "", desc: desc || "" };
  }

  const imageLink = "https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/" + descJson?.img;

  return (
    <Link
      href={`/token/${tokenAddress}`}
      className={`${index} md:w-1/3 md:h-[150px] w-full rounded-[1rem] bg-gradient-to-tr bg-base-100 p-[1px] overflow-y-hidden  hover:shadow-center hover:shadow-[#FFB702] duration-300`}
    >
      <div className="card rounded-[1rem] h-full image-full overflow-hidden md:text-base text-xs">
        <div className="relative card-body p-0 pl-2 bg-gradient-to-tl from-base-200 to-base-100 md:flex-col flex-row bg-opacity-60 pointer-events-none">
          <img
            className="z-10 absolute opacity-40 md:h-[150px] h-[90px] md:w-[150px] w-[90px] right-0 bottom-0"
            src={"/placeholders/lottery.png"}
            alt="Lottery"
          />
          <div className="z-20 flex flex-row my-auto items-center w-full h-full md:py-0 py-2">
            <div className="w-full h-full flex flex-col justify-between md:p-2">
              <span className="md:text-xl text-base oonga-boonga">Daily Leader #{index + 1}</span>
              <>
                <div className="flex flex-row items-center">
                  <div className="aspect-square w-[1rem] h-[1rem] overflow-hidden mr-[0.5rem] rounded-sm">
                    <Image
                      className="aspect-square w-full object-cover opacity-80"
                      src={imageLink}
                      alt="placeholder"
                      width={30}
                      height={30}
                    />
                  </div>
                  <span className="text-neutral md:text-base text-sm font-bold">{symbol}</span>
                  <span className="md:block hidden ml-2">({name})</span>
                </div>
                <div className="flex md:flex-row flex-col w-full md:gap-2 gap-1">
                  <div className="md:w-1/2 w-full flex md:flex-col flex-row">
                    <span className="text-neutral">Market Cap:</span>
                    <div className="flex flex-row pt-0 m-0">
                      <p className="text-accent m-0 p-0 md:pl-0 pl-1">
                        {roundNumber(Number(formatEther(mcap || BigInt(0))), 2)} {targetNetwork.nativeCurrency.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 w-full flex md:flex-col flex-row">
                    <span className="text-neutral">Daily Volume:</span>
                    <p className="text-accent m-0 p-0 md:pl-0 pl-1">
                      {roundNumber(Number(formatEther(volume || BigInt(0))), 2)} {targetNetwork.nativeCurrency.symbol}
                    </p>
                  </div>
                  {/* <div className="md:w-1/3 w-full flex md:flex-col flex-row">
                      <span className="text-neutral">Jackpot:</span>
                      <p className="text-accent m-0 p-0 md:pl-0 pl-1 line-clamp-1">
                        {formatEther(jackpotAmount || BigInt(0))} {targetNetwork.nativeCurrency.symbol}
                      </p>
                    </div> */}
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
