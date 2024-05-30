"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatEther } from "viem";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { Card } from "~~/components/Card";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { formatNumber } from "~~/utils/formatNumber";
import { roundNumber } from "~~/utils/roundNumber";

export const TokenDetailsCard = ({ tokenAddress, width }: { tokenAddress: string; width?: string }) => {
  const { targetNetwork } = useTargetNetwork();

  const [lastTradeDirection, setLastTradeDirection] = useState<string>("BUY");
  const [holders, setHolders] = useState<number>(1);

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

  const { data: price } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getPrice",
    args: [tokenAddress],
  });

  const { data: mcap } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getMcap",
    args: [tokenAddress],
  });

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await fetch(`/api/trades/${tokenAddress}`);
        const data = await response.json();
        const { trades } = data;
        setLastTradeDirection(trades?.length > 0 ? trades.at(-1)?.type : "BUY");
      } catch (error) {
        console.error("Error fetching trade history:", error);
        setLastTradeDirection("BUY");
      }
    };

    fetchTrades();
  }, []);
  useEffect(() => {
    const fetchHolders = async () => {
      try {
        const response = await fetch(
          `https://cdn.testnet.routescan.io/api/evm/80085/erc20/${tokenAddress}/holders?limit=500`,
        );
        const data = await response.json();
        const { items } = data;
        setHolders(items.length || 1);
      } catch (error) {
        console.error("Error fetching holders data:", error);
        setHolders(1);
      }
    };

    fetchHolders();
  }, []);

  let descJson;
  try {
    descJson = JSON.parse(desc || "{}");
  } catch (e) {
    descJson = { img: "", desc: desc || "" };
  }

  const imageLink = "https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/" + descJson?.img;

  return (
    <Card className={`${width} bg-base-300 rounded-[1rem] overflow-hidden md:shadow-lg`}>
      <div className="flex flex-row items-center w-full h-ful md:px-0 px-2">
        <div className="h-16 w-16">
          <Image
            className="rounded-[1rem] aspect-square w-full"
            src={imageLink}
            alt="placeholder"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col h-full justify-start px-4">
          <span className="text-neutral text-xl">{symbol}</span>
          <span className="text-neutral line-clamp-1">{name}</span>
        </div>
      </div>
      <div className="flex flex-col justify-start mt-2 md:px-0 px-2">
        <span className="text-base-300">Current Price:</span>
        <div className="flex flex-row items-center pb-2 pt-0 m-0">
          <p
            className={`${
              lastTradeDirection === "BUY" ? "text-accent" : "text-red-600"
            }  md:text-2xl text-xl font-bold m-0 p-0`}
          >
            ${formatEther(price || BigInt(0))}
          </p>
          {lastTradeDirection === "BUY" ? (
            <ArrowTrendingUpIcon height={"1.5rem"} className="text-accent" />
          ) : (
            <ArrowTrendingDownIcon height={"1.5rem"} className="text-red-600" />
          )}
        </div>
        <span className="text-base-300">Total Market Cap:</span>
        <p className="text-neutral mt-2">
          {roundNumber(Number(formatEther(mcap || BigInt(0))), 2)} {targetNetwork.nativeCurrency.symbol}
        </p>
        <span className="text-base-300">Total Holders:</span>
        <p className="text-neutral mt-2">{formatNumber(holders)}</p>
        <span className="text-base-300">Description:</span>
        <p className="text-neutral mt-2">{descJson.desc}</p>
      </div>
    </Card>
  );
};
