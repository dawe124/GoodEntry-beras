"use client";

import { formatEther } from "viem";
import { StarIcon } from "@heroicons/react/24/solid";
import { VolumeLeaderCard } from "~~/components/beras/jackpot/VolumeLeadercard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { roundNumber } from "~~/utils/roundNumber";

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

  return (
    <>
      <div className="flex flex-col min-h-full w-full mx-auto md:gap-5 gap-2">
        <div className="w-full h-[300px] z-10 md:block hidden rounded-[4px] bg-gradient-to-tr from-[#1E2229] via-accent to-[#1E2229] hover:shadow-center hover:shadow-accent duration-300 p-[1px] md:mb-0 mb-2">
          <div className="relative flex flex-row h-full w-full rounded-[4px] items-center bg-base-100 justify-between md:p-2 py-2 back">
            <img src="/placeholders/pepejackpot.png" className="absolute z-[20] -right-5 bottom-0 h-[350px]" />
            <div className="w-full z-30 flex flex-col justify-center items-center py-2">
              <p className="md:text-6xl text-3xl font-bold hero-title mb-2 pb-0 mx-auto banner-neon tracking-wider">
                DAILY JACKPOT
              </p>
              <p className="md:text-4xl text-xl text-accent font-bold tracking-wider mb-6 pb-0 mx-auto">
                REWARD: {roundNumber(Number(formatEther(jackpot || BigInt(0))), 8)}{" "}
                {targetNetwork.nativeCurrency.symbol}
              </p>
              <div className="flex flex-row">
                <div className="w-[150px] opacity-20 text-center p-2 bg-base-100 border-[1px] border-accent rounded-[4px] hover:shadow-center hover:shadow-accent duration-300">
                  <div className="flex flex-col h-full items-center justify-center">
                    <div className="flex flex-row items-center">
                      <StarIcon className="h-4 w-4" />
                      <span>Previous</span>
                    </div>
                    <p className="text-accent p-0 m-0">
                      {formatEther(prevHourJackpot || BigInt(0))} {targetNetwork.nativeCurrency.symbol}
                    </p>
                  </div>
                </div>
                <div className="w-[150px] scale-125 z-20 bg-base-100 border-[1px] border-accent p-2 rounded-[4px] shadow-center shadow-accent duration-300">
                  <div className="flex flex-col h-full items-center justify-center">
                    <div className="flex flex-row items-center">
                      <StarIcon className="h-4 w-4" />
                      <span>Hourly Jackpot</span>
                    </div>
                    <p className="text-accent p-0 m-0">
                      {roundNumber(Number(formatEther(hourlyJackpot || BigInt(0))), 8)}{" "}
                      {targetNetwork.nativeCurrency.symbol}
                    </p>
                  </div>
                </div>
                <div className="w-[150px] opacity-40 text-center p-2 bg-base-100 border-[1px] border-accent rounded-[4px] hover:shadow-center hover:shadow-accent duration-300">
                  <div className="flex flex-col h-full items-center justify-center">
                    <div className="flex flex-row items-center">
                      <StarIcon className="h-4 w-4" />
                      <span>Next Hour</span>
                    </div>
                    <p className="text-accent p-0 m-0">??? {targetNetwork.nativeCurrency.symbol}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full z-10 md:hidden block rounded-[4px] bg-gradient-to-tr from-[#1E2229] via-accent to-[#1E2229] hover:shadow-center hover:shadow-accent duration-300 p-[1px] md:mb-0 mb-2">
          <div className="relative flex flex-row h-full w-full rounded-[4px] items-center bg-base-100 justify-between md:p-2 py-2 back">
            {/* <img
                  src="/placeholders/banner.png"
                  className="absolute opacity-60 z-[20] left-0 -bottom-[10px] h-[125px]"
                /> */}
            <div className="w-full z-30 flex flex-col justify-center items-center py-2">
              <p className="md:text-6xl text-3xl font-bold hero-title mb-2 pb-0 mx-auto banner-neon tracking-wider">
                DAILY JACKPOT
              </p>
              <p className="md:text-4xl text-xl text-accent font-bold tracking-wider mb-6 pb-0 mx-auto">
                REWARD: {roundNumber(Number(formatEther(jackpot || BigInt(0))), 8)}{" "}
                {targetNetwork.nativeCurrency.symbol}
              </p>
              <div className="flex flex-row">
                <div className="w-[100px] h-[65px] text-xs opacity-20 text-center p-2 bg-base-100 border-[1px] border-accent rounded-[4px] hover:shadow-center hover:shadow-accent duration-300">
                  <div className="flex flex-col h-full items-center justify-center">
                    <div className="flex flex-row items-center">
                      <StarIcon className="h-4 w-4" />
                      <span>Previous</span>
                    </div>
                    <p className="text-accent p-0 m-0">
                      {roundNumber(Number(formatEther(prevHourJackpot || BigInt(0))), 8)}{" "}
                      {targetNetwork.nativeCurrency.symbol}
                    </p>
                  </div>
                </div>
                <div className="w-[100px] h-[65px] text-xs scale-125 z-20 bg-base-100 border-[1px] border-accent py-2 px-1 rounded-[4px] hover:shadow-center hover:shadow-accent duration-300">
                  <div className="flex flex-col h-full items-center justify-center">
                    <div className="flex flex-row items-center">
                      <StarIcon className="h-2 w-2" />
                      <span>Hourly Jackpot</span>
                    </div>
                    <p className="text-accent p-0 m-0">
                      {roundNumber(Number(formatEther(hourlyJackpot || BigInt(0))), 8)}{" "}
                      {targetNetwork.nativeCurrency.symbol}
                    </p>
                  </div>
                </div>
                <div className="w-[100px] h-[65px] text-xs opacity-40 text-center p-2 bg-base-100 border-[1px] border-accent rounded-[4px] hover:shadow-center hover:shadow-accent duration-300">
                  <div className="flex flex-col h-full items-center justify-center">
                    <div className="flex flex-row items-center">
                      <StarIcon className="h-4 w-4" />
                      <span>Next Hour</span>
                    </div>
                    <p className="text-accent p-0 m-0">??? {targetNetwork.nativeCurrency.symbol}</p>
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
