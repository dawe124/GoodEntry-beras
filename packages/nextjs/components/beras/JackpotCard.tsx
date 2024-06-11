import Link from "next/link";
import { formatEther } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { roundNumber } from "~~/utils/roundNumber";

export const JackpotCard = ({ width }: { width: number | null }) => {
  const { targetNetwork } = useTargetNetwork();

  const today = Math.floor(new Date().getTime() / 86400000);

  const { data: jackpotToday } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "dailyJackpot",
    args: [today],
  });

  const { data: jackpotYestesday } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "dailyJackpot",
    args: [today - 1],
  });

  return (
    <Link
      href={`/jackpot`}
      className="group md:w-full md:h-[150px] w-1/2 rounded-[4px] bg-gradient-to-tr from-accent via-base-100 to-accent hover:shadow-center hover:shadow-accent duration-300 p-[1px]"
    >
      <div className="card rounded-[4px] h-full image-full md:text-base text-xs">
        <div className="relative card-body p-0 pl-2 bg-gradient-to-br from-accent via-base-100 to-base-100 md:flex-col flex-row bg-opacity-90 pointer-events-none">
          <img
            className="z-20 absolute opacity-90 md:h-[175px] h-[90px] md:w-[175px] w-[90px] -right-3 bottom-0 group-hover:opacity-90 transition-opacity duration-300"
            src={width !== null && width <= 1024 ? "/placeholders/pepejackpot.png" : "/placeholders/pepejackpot.png"}
            alt="Jackpot"
          />
          <div className="z-20 flex flex-row my-auto items-center w-full h-full md:py-0 py-2">
            <div className="w-full h-full flex flex-col justify-between md:p-2">
              <span className="md:text-xl text-base good-title">DAILY JACKPOT</span>
              <div className="flex flex-row items-center">
                <span className="md:block hidden text-neutral md:text-base text-xs font-bold">
                  Find your best entry
                </span>
              </div>
              <div className="flex md:flex-row flex-col w-full md:gap-2 gap-1">
                <div className="md:w-1/3 w-full flex md:flex-col flex-row">
                  <span className="text-neutral">Today&apos;s Pot:</span>
                  <div className="flex flex-row pt-0 m-0">
                    <p className="text-accent m-0 p-0 md:pl-0 pl-1">
                      {roundNumber(Number(formatEther(jackpotToday || BigInt(0))), 6)}{" "}
                      {targetNetwork.nativeCurrency.symbol}
                    </p>
                  </div>
                </div>
                <div className="md:w-2/3 w-full flex md:flex-col flex-row">
                  <span className="text-neutral">Yesterday&apos;s Pot:</span>
                  <p className="text-accent m-0 p-0 md:pl-0 pl-1">
                    {roundNumber(Number(formatEther(jackpotYestesday || BigInt(0))), 6)}{" "}
                    {targetNetwork.nativeCurrency.symbol}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
