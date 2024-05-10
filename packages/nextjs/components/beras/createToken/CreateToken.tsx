"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { PhotoUpload } from "./PhotoUpload";
import { formatEther, parseEther } from "viem";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { BugAntIcon } from "@heroicons/react/24/outline";
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
      <div className="flex flex-grow items-center flex-col pt-10">
        <Card title="Create a new coin" className="flex-grow w-96" image=<img src={imageLink} alt="Pick a Pic!" />>
          <div className="flex flex-col justify-center gap-4 ">
            <PhotoUpload onFileSelect={upload} />
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input type="text" className="grow" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Symbol
              <input type="text" className="grow" value={symbol} onChange={e => setSymbol(e.target.value)} />
            </label>
            <textarea
              placeholder="Description"
              className="textarea textarea-bordered"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
            <>
              {formattedBalance.toFixed(4)} {targetNetwork.nativeCurrency.symbol}
            </>
            <label className="input input-bordered flex items-center gap-2">
              Buy
              <input type="text" className="grow" value={buyAmount} onChange={e => setBuyAmount(e.target.value)} />
            </label>
            <button
              className="h-10 btn btn-secondary btn-sm px-2 w-full"
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
                <BugAntIcon className="h-4 w-4" />
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
