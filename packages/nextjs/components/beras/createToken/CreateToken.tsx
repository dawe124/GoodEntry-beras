"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { PhotoUpload } from "./PhotoUpload";
import { formatEther, parseEther } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Card } from "~~/components/Card";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useWatchBalance } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { usePinataSaver } from "~~/hooks/usePinataSaver";

export const CreateToken = () => {
  const { address: connectedAddress } = useAccount();
  //const [balance, setBalance] = useState(0);
  const [buyAmount, setBuyAmount] = useState("0");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [desc, setDesc] = useState("");
  const [txResult, setTxResult] = useState<`0x${string}` | undefined>();
  const { data: balance } = useWatchBalance({ address: connectedAddress });
  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0;
  const { targetNetwork } = useTargetNetwork();

  const { ipfsHash: ipfsHash, upload: upload } = usePinataSaver();
  const imageLink = "https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/" + ipfsHash;

  const { writeContractAsync: createToken, isMining: isCreating } = useScaffoldWriteContract("TokenController");
  const { data: txReceipt } = useWaitForTransactionReceipt({ hash: txResult });

  useEffect(() => {
    const topics = txReceipt?.logs?.[1].topics;
    if (topics?.[0] == "0x770db03755ff17c018f3ebbf742668ca2448cd2e258df0f111ed829b327f1dac") {
      redirect(("/token/" + topics?.[2]?.replace("000000000000000000000000", "")) as string);
    }
  }, [txReceipt]);
  return (
    <>
      <div className="flex flex-grow items-center flex-col md:pt-5 pt-2">
        <Card
          title="Create a new coin"
          className="flex-grow w-96 rounded-md"
          image=<img src={imageLink} alt="Pick a Pic!" />
        >
          <div className="flex flex-col justify-center gap-4 ">
            <PhotoUpload onFileSelect={upload} />
            <label className="text-md flex items-center">Name</label>
            <input
              type="text"
              className="rounded-md input input-bordered border-base-300 shadow-md text-neutral focus:outline-none focus:ring-2 focus:ring-accent"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label className="text-md flex items-center">Symbol</label>
            <input
              type="text"
              className="rounded-md input input-bordered border-base-300 shadow-md text-neutral focus:outline-none focus:ring-2 focus:ring-accent"
              value={symbol}
              onChange={e => setSymbol(e.target.value)}
            />
            <label className="text-md flex items-center">Description</label>
            <textarea
              placeholder="Input token description"
              className="textarea textarea-bordered border-base-300 rounded-md shadow-md text-neutral focus:outline-none focus:ring-2 focus:ring-accent"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
            <>
              <span className="text-neutral">
                {formattedBalance.toFixed(4)} {targetNetwork.nativeCurrency.symbol}
              </span>
            </>
            <label className="text-md flex items-center">Buy</label>

            <input
              type="text"
              className="rounded-md input input-bordered border-base-300 text-neutral shadow-md focus:outline-none focus:ring-2 focus:ring-accent"
              value={buyAmount}
              onChange={e => setBuyAmount(e.target.value)}
            />

            <button
              className="h-10 btn btn-secondary btn-sm text-neutral px-2 mb-2 w-full"
              onClick={async () => {
                const log = await createToken({
                  functionName: "createToken",
                  args: [name, symbol, JSON.stringify({ img: ipfsHash, desc: desc })],
                  value: parseEther(buyAmount),
                });
                setTxResult(log);
              }}
              disabled={isCreating}
            >
              {!isCreating ? (
                <PlusCircleIcon className="h-4 w-4" />
              ) : (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              <span>Create</span>
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};
