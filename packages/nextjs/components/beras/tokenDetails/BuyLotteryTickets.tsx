"use client";

import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Card } from "~~/components/Card";
import { useWatchBalance } from "~~/hooks/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { roundNumber } from "~~/utils/roundNumber";

export const BuyLotteryTickets = ({ tokenAddress }: { tokenAddress: string }) => {
  const { targetNetwork } = useTargetNetwork();
  const { address: connectedAddress } = useAccount();
  const [amount, setAmount] = useState("0");
  const { data: balance } = useWatchBalance({ address: connectedAddress });
  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0;

  const today = Math.floor(new Date().getTime() / 86400000);

  const { data: tokenSymbol } = useScaffoldReadContract({
    contractName: "Token",
    functionName: "symbol",
    address: tokenAddress,
  });

  const { data: ticketYesterdayBalance } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getUserLotteryPayout",
    args: [tokenAddress, today - 1, connectedAddress],
    watch: true,
  });
  const { data: ticketTodayBalance } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getUserLotteryPayout",
    args: [tokenAddress, today, connectedAddress],
    watch: false,
  });
  const { data: ticketTomorrowBalance } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getUserLotteryPayout",
    args: [tokenAddress, today + 1, connectedAddress],
    watch: true,
  });
  const { data: mcap } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getMcap",
    args: [tokenAddress],
  });
  const { data: lotteryThreshold } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "lotteryThreshold",
  });
  const { data: isLotteryRunning } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "isLotteryRunning",
  });

  const { data: payout } = useScaffoldReadContract({
    contractName: "TokenController",
    // @ts-ignore
    functionName: "claim",
    args: [tokenAddress],
  });

  const { writeContractAsync: tokenController, isMining: isTxing } = useScaffoldWriteContract("TokenController");

  if (!isLotteryRunning) return <></>;

  if (!mcap || !lotteryThreshold || mcap < lotteryThreshold) {
    return (
      <div className="flex flex-grow items-center flex-col md:shadow-lg md:mb-5 mb-2 md:mt-0 mt-2">
        <Card title="Lottery" className="flex-grow w-96 rounded-[1rem] bg-base-200">
          <div className="flex flex-col justify-center gap-4 mb-2">
            Market Cap: {roundNumber(Number(formatEther(mcap || BigInt(0))), 2)} {targetNetwork.nativeCurrency.symbol}
            <br />
            Lottery Opens at: {roundNumber(Number(formatEther(lotteryThreshold || BigInt(0))), 2)}{" "}
            {targetNetwork.nativeCurrency.symbol}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-grow items-center flex-col md:shadow-lg md:mb-5 mb-2 md:mt-0 mt-2">
        <Card title="Lottery" className="flex-grow w-96 rounded-[1rem] bg-base-200">
          <div className="flex flex-col justify-center gap-4 ">
            <div className="float-right">
              {formattedBalance.toFixed(4)} {targetNetwork.nativeCurrency.symbol}
            </div>
            <input
              className="input input-bordered w-full text-neutral border  border-base-300 focus:outline-none focus:ring-2 focus:ring-accent"
              type="number"
              min="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <div className="relative h-full group w-full">
              <div className="absolute transitiona-all duration-1000 opacity-70  -inset-px bg-gradient-to-b from-[#FFB702] to-[#FFB702] rounded-[1rem] blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <button
                className="relative w-full p-2 rounded-[1rem] text-neutral flex flex-row items-center justify-center tradecard-gradient-0"
                onClick={async () => {
                  await tokenController({
                    functionName: "buyTicket",
                    args: [tokenAddress],
                    value: parseEther(amount),
                  });
                }}
                disabled={isTxing}
              >
                {!isTxing ? (
                  <CurrencyDollarIcon className="h-4 w-4" />
                ) : (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
                <span className="text-neutral">100x or GTFO</span>
              </button>
            </div>
            <p className="my-0 text-neutral">
              Today&lsquo;s round: {formatEther(ticketTodayBalance || BigInt(0))} {tokenSymbol}
            </p>
            <p className="my-0 text-neutral">
              Tomorrow: {formatEther(ticketTomorrowBalance || BigInt(0))} {tokenSymbol}
            </p>
            <hr />
            <div className="bg-base-200 rounded-[1rem] border border-base-300 md:mb-5 mb-2 p-2">
              <div className="flex flex-row items-center justify-between">
                <span className="text-neutral">
                  <span>Your Rewards: </span>
                  <span
                    className={`${
                      formatEther(ticketYesterdayBalance || BigInt(0)) != "0" ? "text-accent font-semibold" : ""
                    }`}
                  >
                    {formatEther(ticketYesterdayBalance || BigInt(0))}
                  </span>{" "}
                  {tokenSymbol}
                </span>
                <button
                  className={`p-2 rounded-[1rem] text-neutral flex flex-row items-center justify-center bg-secondary w-24 cursor-pointer`}
                  disabled={!(payout && BigInt(payout as unknown as string) > BigInt(0))}
                  onClick={async () => {
                    await tokenController({
                      functionName: "claim",
                      args: [tokenAddress],
                    });
                  }}
                >
                  Claim
                </button>
              </div>
              <p>Claim your rewards within 24 hours or your tokens will be redistributed</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
