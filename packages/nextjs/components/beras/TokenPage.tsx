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
          className={`tab ${activeTab == 0 ? "tab-active" : "text-base-300"}`}
          onClick={() => {
            setActiveTab(0);
          }}
        >
          Chart
        </a>
        <a
          role="tab"
          className={`tab ${activeTab == 1 ? "tab-active" : "text-base-300"}`}
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
        </div>
        <div className={`${activeTab == 1 ? "block" : "hidden"} md:block md:pt-5 md:p-4`}>
          <Swap tokenAddress={tokenAddress} />
          <TokenCard tokenAddress={tokenAddress} width="w-full mt-4" />
        </div>
      </div>
    </>
  );
};
