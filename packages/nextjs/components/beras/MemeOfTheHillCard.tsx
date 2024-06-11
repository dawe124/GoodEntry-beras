import Image from "next/image";
import Link from "next/link";
import { formatEther } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { roundNumber } from "~~/utils/roundNumber";

export const MemeOfTheHillCard = ({ width }: { width: number | null }) => {
  const { targetNetwork } = useTargetNetwork();
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

  // const { data: jackpotAmount } = useScaffoldReadContract({
  //   contractName: "TokenController",
  //   functionName: "hourlyJackpot",
  //   args: [hour],
  // });

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
      href={`${
        tokenAddress !== "0x0000000000000000000000000000000000000000" && tokenAddress !== undefined
          ? `/token/${tokenAddress}`
          : "create"
      }`}
      className="group md:w-full md:h-[150px] w-1/2 rounded-[4px] bg-gradient-to-tr from-[#0F161D] via-accent to-[#0F161D] hover:shadow-center hover:shadow-accent duration-300 p-[1px]"
    >
      <div className="card rounded-[4px] h-full image-full md:text-base text-xs">
        <div className="relative card-body p-0 pl-2 bg-gradient-to-br from-base-100 via-base-100 to-accent  md:flex-col flex-row bg-opacity-60 pointer-events-none">
          <img
            className={`z-10 absolute ${
              width !== null && width > 1024
                ? "opacity-90 group-hover:opacity-100 "
                : "opacity-90 group-hover:opacity-100 "
            } md:h-[170px] h-[90px] md:w-[170px] w-[90px] right-0 bottom-0 transition-opacity duration-300`}
            src={`${
              tokenAddress !== "0x0000000000000000000000000000000000000000" && tokenAddress !== undefined
                ? width !== null && width <= 1024
                  ? "/placeholders/pepeking.png"
                  : "/placeholders/pepeking.png"
                : width !== null && width > 1024
                ? "/placeholders/pepeking.png"
                : "/placeholders/pepeking.png"
              // ? "/placeholders/beraking.png"
              // : "/placeholders/empty-throne.png"
            }`}
            alt="Hourly Bera"
          />
          <div className="z-20 flex flex-row my-auto items-center w-full h-full md:py-0 py-2">
            <div className="w-full h-full flex flex-col justify-between md:p-2">
              <span className="md:text-xl text-base good-title">PRINCE OF THE HOUR</span>
              {tokenAddress !== "0x0000000000000000000000000000000000000000" && tokenAddress !== undefined ? (
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
                    <div className="md:w-1/3 w-full flex md:flex-col flex-row">
                      <span className="text-neutral">Market Cap:</span>
                      <div className="flex flex-row pt-0 m-0">
                        <p className="text-accent m-0 p-0 md:pl-0 pl-1">
                          {roundNumber(Number(formatEther(mcap || BigInt(0))), 2)} {targetNetwork.nativeCurrency.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/3 w-full flex md:flex-col flex-row">
                      <span className="text-neutral">Hourly Volume:</span>
                      <p className="text-accent m-0 p-0 md:pl-0 pl-1">
                        {roundNumber(Number(formatEther(tokenVolume || BigInt(0))), 2)}{" "}
                        {targetNetwork.nativeCurrency.symbol}
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
              ) : (
                <>
                  <div className="md:block hidden">A Prince is urgently needed!</div>
                  <div>Create a token and be the next Prince!</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
