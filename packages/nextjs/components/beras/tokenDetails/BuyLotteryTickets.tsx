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
    args: [tokenAddress, BigInt(today - 1), connectedAddress],
    watch: true,
  });
  const { data: ticketTodayBalance } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getUserLotteryPayout",
    args: [tokenAddress, BigInt(today), connectedAddress],
    watch: false,
  });
  const { data: ticketTomorrowBalance } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getUserLotteryPayout",
    args: [tokenAddress, BigInt(today + 1), connectedAddress],
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

  const { data: payout } = useScaffoldReadContract({
    contractName: "TokenController",
    // @ts-ignore
    functionName: "claim",
    args: [tokenAddress],
  });

  const { writeContractAsync: tokenController, isMining: isTxing } = useScaffoldWriteContract("TokenController");

  if (!mcap || !lotteryThreshold || mcap < lotteryThreshold) {
    return (
      <div className="flex flex-grow items-center flex-col md:shadow-lg md:mb-5 mb-2 md:mt-0 mt-2">
        <Card title="Lottery" className="flex-grow w-96 rounded-[1rem] bg-base-200">
          <div className="flex flex-col justify-center gap-4 ">
            Mcap: {formatEther(mcap || BigInt(0))}
            <br />
            Lottery Opens at: {formatEther(lotteryThreshold || BigInt(0))}
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
            <button
              className="p-2 mb-5 rounded-[1rem] text-neutral flex flex-row items-center justify-center bg-secondary"
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
            <hr />
            Yesterday: {formatEther(ticketYesterdayBalance || BigInt(0))} {tokenSymbol}
            <button
              className="p-2 mb-5 rounded-[1rem] text-neutral flex flex-row items-center justify-center bg-secondary w-24"
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
            <br />
            Today&lsquo;s round: {formatEther(ticketTodayBalance || BigInt(0))} {tokenSymbol}
            <br />
            Tomorrow: {formatEther(ticketTomorrowBalance || BigInt(0))} {tokenSymbol}
          </div>
        </Card>
      </div>
    </>
  );
};
