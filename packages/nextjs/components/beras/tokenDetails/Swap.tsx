"use client";

import { useState } from "react";
import { formatEther, maxUint256, parseEther } from "viem";
import { useAccount } from "wagmi";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Card } from "~~/components/Card";
import { useWatchBalance } from "~~/hooks/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

export const Swap = ({ tokenAddress }: { tokenAddress: string }) => {
  const { targetNetwork } = useTargetNetwork();
  const [activeTab, setActiveTab] = useState<string>("buy");
  const { address: connectedAddress } = useAccount();
  const [amount, setAmount] = useState("0");
  const { data: balance } = useWatchBalance({ address: connectedAddress });
  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0;

  const { data: tokenSymbol } = useScaffoldReadContract({
    contractName: "Token",
    functionName: "symbol",
    address: tokenAddress,
  });

  const { data: tokenBalance } = useScaffoldReadContract({
    contractName: "Token",
    functionName: "balanceOf",
    address: tokenAddress,
    args: [connectedAddress],
    watch: true,
  });

  const { data: tokenControllerData } = useDeployedContractInfo("TokenController");
  const { writeContractAsync: tokenController, isMining: isTxing } = useScaffoldWriteContract("TokenController");
  const { writeContractAsync: token, isMining: isApproving } = useScaffoldWriteContract("Token", tokenAddress);

  const { data: tokenAllowance } = useScaffoldReadContract({
    contractName: "Token",
    functionName: "allowance",
    address: tokenAddress,
    args: [connectedAddress, tokenControllerData?.address],
    watch: true,
  });

  const pasteBuyBalance = () => {
    console.log(formattedBalance);
    setAmount(formattedBalance.toString());
  };
  const pasteSellBalance = () => {
    console.log(formatEther(tokenBalance || BigInt(0)));
    setAmount(formatEther(tokenBalance || BigInt(0)).toString());
  };

  return (
    <>
      <div className="flex flex-grow items-center flex-col md:shadow-lg md:mb-5 mb-2 md:mt-0 mt-2">
        <Card title="Swap" className="flex-grow w-96 rounded-[1rem] bg-base-200">
          <div className="flex flex-col justify-center gap-4 ">
            <div className="flex flex-row">
              <button
                className={`w-2/4 p-2 rounded-l-[1rem] text-neutral ${
                  activeTab == "buy" ? "bg-secondary" : "bg-primary"
                }`}
                onClick={() => {
                  setActiveTab("buy");
                }}
              >
                Buy
              </button>
              <button
                className={`w-2/4 p-2 rounded-r-[1rem] text-neutral ${
                  activeTab == "sell" ? "bg-warning" : "bg-primary"
                }`}
                onClick={() => {
                  setActiveTab("sell");
                }}
              >
                Sell
              </button>
            </div>
            <div
              title="Click to input total balance"
              className="float-right text-right hover:text-neutral duration-300"
            >
              {activeTab == "buy" ? (
                <span className="cursor-pointer" onClick={pasteBuyBalance}>
                  {formattedBalance.toFixed(4)} {targetNetwork.nativeCurrency.symbol}
                </span>
              ) : (
                <span className="cursor-pointer" onClick={pasteSellBalance}>
                  {formatEther(tokenBalance || BigInt(0))} {tokenSymbol}
                </span>
              )}
            </div>

            <input
              className="input input-bordered w-full text-neutral border  border-base-300 focus:outline-none focus:ring-2 focus:ring-accent"
              type="number"
              min="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />

            <button
              title={amount == "0" ? "Cannot buy or sell with 0 input" : undefined}
              className={`p-2 mb-5 rounded-[1rem] text-neutral flex flex-row items-center ${
                amount == "0" ? "cursor-not-allowed" : "cursor-pointer"
              } justify-center
                ${
                  activeTab == "buy"
                    ? "bg-secondary"
                    : !tokenAllowance || tokenAllowance < parseEther(amount)
                    ? "bg-base-300"
                    : "bg-warning"
                }
              `}
              onClick={async () => {
                if (activeTab == "buy")
                  await tokenController({
                    functionName: "buy",
                    args: [tokenAddress, BigInt(0)],
                    value: parseEther(amount),
                  });
                else {
                  if (!tokenAllowance || tokenAllowance < parseEther(amount)) {
                    await token({
                      functionName: "approve",
                      args: [tokenControllerData?.address || "0x", maxUint256],
                    });
                  }
                  await tokenController({
                    functionName: "sell",
                    args: [tokenAddress, parseEther(amount)],
                  });
                }
              }}
              disabled={isTxing || isApproving || amount == "0"}
            >
              {!isTxing ? (
                <CurrencyDollarIcon className="h-4 w-4" />
              ) : (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              <span className="text-neutral">
                {activeTab == "buy"
                  ? "Buy"
                  : !tokenAllowance || tokenAllowance < parseEther(amount)
                  ? "Approve"
                  : "Sell"}
              </span>
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};
