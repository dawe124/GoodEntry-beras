import { useState } from "react";
import { TokenCard } from "~~/components/beras/TokenCard";
import { ChartLWC } from "~~/components/beras/tokenDetails/ChartLWC";
import { Swap } from "~~/components/beras/tokenDetails/Swap";

export const TokenPage = ({ tokenAddress }: { tokenAddress: string }) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <>
      <div role="tablist" className="md:hidden tabs tabs-boxed">
        <a
          role="tab"
          className={`tab ${activeTab == 0 ? "tab-active" : ""}`}
          onClick={() => {
            setActiveTab(0);
          }}
        >
          Chart
        </a>
        <a
          role="tab"
          className={`tab ${activeTab == 1 ? "tab-active" : ""}`}
          onClick={() => {
            setActiveTab(1);
          }}
        >
          Trade
        </a>
      </div>
      <div className="flex flex-row min-h-full">
        <div
          className={`w-full flex-grow ${activeTab == 0 ? "block" : "hidden"} md:block md:w-8/12 min-h-full md:pt-10`}
        >
          <ChartLWC tokenAddress={tokenAddress} />
        </div>
        <div className={`${activeTab == 1 ? "block" : "hidden"} md:block md:w-4/12 md:pt-10 md:p-4`}>
          <Swap tokenAddress={tokenAddress} />
          <TokenCard tokenAddress={tokenAddress} width="w-full mt-4" />
        </div>
      </div>
    </>
  );
};
