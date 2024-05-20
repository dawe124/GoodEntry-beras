"use client";

import { formatEther } from "viem";
import { StarIcon } from "@heroicons/react/24/solid";
import { VolumeLeaderCard } from "~~/components/beras/jackpot/VolumeLeadercard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

export const JackpotPage = () => {
  const { targetNetwork } = useTargetNetwork();

  const day: number = Math.floor(new Date().getTime() / 86400000);
  const hour: number = Math.floor(new Date().getTime() / 3600000);

  const { data: jackpot } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "dailyJackpot",
    args: [day],
  });

  const { data: leaders } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getDailyVolumeLeaders",
    args: [day],
  });

  const { data: hourlyJackpot } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "hourlyJackpot",
    args: [hour],
  });
  const { data: prevHourJackpot } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "hourlyJackpot",
    args: [hour - 1],
  });

  console.log(jackpot);

  return (
    <>
      <div className="flex flex-col min-h-full w-full mx-auto md:gap-5 gap-2">
        <div className="w-full z-10 md:block hidden rounded-[1rem] bg-gradient-to-tr from-[#0F161D] via-[#C9FFFF] to-[#0F161D] hover:shadow-center hover:shadow-accent duration-300 p-[1px] md:mb-0 mb-2">
          <div className="relative flex flex-row h-full w-full rounded-[1rem] items-center bg-[#0F161D] justify-between md:p-2 py-2 back">
            <img src="/placeholders/banner.png" className="absolute z-[20] left-0 -bottom-[20px] h-[250px]" />
            <img
              src="/placeholders/banner3.svg"
              className="absolute banner-image-shadow z-[19] left-0 -bottom-[20px] h-[250px]"
            />
            <div className="w-full z-30 flex flex-col justify-center items-center py-2">
              <p className="md:text-6xl text-3xl font-bold hero-title mb-2 pb-0 mx-auto banner-neon tracking-wider">
                DAILY JACKPOT
              </p>
              <p className="md:text-4xl text-xl text-accent font-bold tracking-wider mb-6 pb-0 mx-auto">
                REWARD: {formatEther(jackpot || BigInt(0))} {targetNetwork.nativeCurrency.symbol}
              </p>
              <div className="flex flex-row">
                <div className="w-[150px] opacity-20 text-center p-2 tradecard-gradient-0 rounded-[1rem] hover:shadow-center hover:shadow-[#FFB702] duration-300">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center">
                      <StarIcon className="h-4 w-4" />
                      <span>Previous</span>
                    </div>
                    <p>
                      {formatEther(prevHourJackpot || BigInt(0))} {targetNetwork.nativeCurrency.symbol}
                    </p>
                  </div>
                </div>
                <div className="w-[150px] scale-125 z-20 tradecard-gradient-0 p-2 rounded-[1rem] shadow-center shadow-[#FFB702] duration-300">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center">
                      <StarIcon className="h-4 w-4" />
                      <span>Hourly Jackpot</span>
                    </div>
                    <p>
                      {formatEther(hourlyJackpot || BigInt(0))} {targetNetwork.nativeCurrency.symbol}
                    </p>
                  </div>
                </div>
                <div className="w-[150px] opacity-40 text-center p-2 tradecard-gradient-0 rounded-[1rem] hover:shadow-center hover:shadow-[#FFB702] duration-300">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center">
                      <StarIcon className="h-4 w-4" />
                      <span>Next Hour</span>
                    </div>
                    <p>??? {targetNetwork.nativeCurrency.symbol}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full z-10 md:hidden block rounded-[1rem] bg-gradient-to-tr from-[#0F161D] via-[#C9FFFF] to-[#0F161D] hover:shadow-center hover:shadow-accent duration-300 p-[1px] md:mb-0 mb-2">
          <div className="relative flex flex-row h-full w-full rounded-[1rem] items-center bg-[#0F161D] justify-between md:p-2 py-2 back">
            {/* <img
                  src="/placeholders/banner.png"
                  className="absolute opacity-60 z-[20] left-0 -bottom-[10px] h-[125px]"
                /> */}
            <div className="w-full z-30 flex flex-col justify-center items-center py-2">
              <p className="md:text-6xl text-3xl font-bold hero-title mb-2 pb-0 mx-auto banner-neon tracking-wider">
                DAILY JACKPOT
              </p>
              <p className="md:text-4xl text-xl text-accent font-bold tracking-wider mb-6 pb-0 mx-auto">
                REWARD: {formatEther(jackpot || BigInt(0))} {targetNetwork.nativeCurrency.symbol}
              </p>
              <div className="flex flex-row">
                <div className="w-[100px] h-[65px] text-xs opacity-20 text-center p-2 tradecard-gradient-0 rounded-[1rem] hover:shadow-center hover:shadow-[#FFB702] duration-300">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center">
                      <StarIcon className="h-4 w-4" />
                      <span>Previous</span>
                    </div>
                    <p>
                      {formatEther(prevHourJackpot || BigInt(0))} {targetNetwork.nativeCurrency.symbol}
                    </p>
                  </div>
                </div>
                <div className="w-[100px] h-[65px] text-xs scale-125 z-20 tradecard-gradient-0 py-2 px-1 rounded-[1rem] hover:shadow-center hover:shadow-[#FFB702] duration-300">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center">
                      <StarIcon className="h-2 w-2" />
                      <span>Hourly Jackpot</span>
                    </div>
                    <p>
                      {formatEther(hourlyJackpot || BigInt(0))} {targetNetwork.nativeCurrency.symbol}
                    </p>
                  </div>
                </div>
                <div className="w-[100px] h-[65px] text-xs opacity-40 text-center p-2 tradecard-gradient-0 rounded-[1rem] hover:shadow-center hover:shadow-[#FFB702] duration-300">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row items-center">
                      <StarIcon className="h-4 w-4" />
                      <span>Next Hour</span>
                    </div>
                    <p>??? {targetNetwork.nativeCurrency.symbol}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex md:flex-row flex-col md:gap-5 gap-2">
          {leaders?.[0]?.map((tokenAddress, index) => {
            if (tokenAddress !== "0x0000000000000000000000000000000000000000") {
              return (
                <VolumeLeaderCard
                  key={index}
                  index={index}
                  tokenAddress={tokenAddress}
                  volume={leaders?.[1]?.[index]}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
