import { useState } from "react";
// import { TokenCard } from "~~/components/beras/TokenCard";
import { TokenDetailsCard } from "~~/components/beras/TokenDetailsCard";
import { ChartLWC } from "~~/components/beras/tokenDetails/ChartLWC";
import { Swap } from "~~/components/beras/tokenDetails/Swap";
import { TransactionHistory } from "~~/components/beras/tokenDetails/TransactionHistory";

export const TokenPage = ({ tokenAddress }: { tokenAddress: string }) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const trades = [
    {
      type: "BUY",
      amount: "66.599995564440295409",
      value: "1",
      user: "BERAMAN",
      txHash: "0xfsfdgdsgfgd",
      date: 1715567974800,
    },
    {
      type: "BUY",
      amount: "66.599995564440295409",
      value: "0.2",
      user: "COCAINBEAR",
      txHash: "0x154casdcdsa",
      date: 1715567974700,
    },
    {
      type: "SELL",
      amount: "66.599995564440295409",
      value: "0.1",
      user: "REDPANDA",
      txHash: "0x468c4ssd",
      date: 1715567543800,
    },
  ];

  return (
    <>
      <div role="tablist" className="md:hidden tabs tabs-boxed">
        <a
          role="tab"
          className={`tab ${activeTab == 0 ? "tab-active text-neutral" : "text-base-300"}`}
          onClick={() => {
            setActiveTab(0);
          }}
        >
          Chart
        </a>
        <a
          role="tab"
          className={`tab ${activeTab == 1 ? "tab-active text-neutral" : "text-base-300"}`}
          onClick={() => {
            setActiveTab(1);
          }}
        >
          Trade
        </a>
      </div>
      <div className="flex flex-row min-h-full w-full">
        <div className={`${activeTab == 0 ? "block" : "hidden"} md:block md:w-2/3 w-full min-h-full md:pl-5 md:pt-5`}>
          <ChartLWC tokenAddress={tokenAddress} />
          <TransactionHistory trades={trades} />
        </div>
        <div className={`${activeTab == 1 ? "block" : "hidden"} w-full max-w-[400px] md:block md:pt-5 md:p-4`}>
          <Swap tokenAddress={tokenAddress} />
          <TokenDetailsCard tokenAddress={tokenAddress} />
        </div>
      </div>
    </>
  );
};
