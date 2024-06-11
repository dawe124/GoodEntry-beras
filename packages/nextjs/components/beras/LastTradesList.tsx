import { useEffect, useState } from "react";
import Link from "next/link";
import { LastTradeCard } from "~~/components/beras/LastTradeCard";

// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface Trade {
  type: string;
  amount: string;
  value: string;
  user: string;
  txHash: string;
  tokenAddress: {
    _id: string;
    icon: string;
    symbol: string;
  };
  date: number;
}

// Use contract list of coins for now, create a server side DB and return according to criteria later
export const LastTradesList = () => {
  const [lastTrades, setLastTrades] = useState<Trade[]>([]);
  // const { data: lastTokens } = useScaffoldReadContract({
  //   contractName: "TokenController",
  //   functionName: "getLastTokens",
  // });
  useEffect(() => {
    const fetchlastTrades = async () => {
      try {
        const response = await fetch(`/api/trades`, {
          cache: "no-store",
          // next: { revalidate: 900 } // 15m
        });
        const data = await response.json();
        const { trades } = data;

        setLastTrades(trades?.length > 0 ? trades : []);
      } catch (error) {
        console.error("Error fetching last trade history:", error);
        setLastTrades([]);
      }
    };

    fetchlastTrades();
  }, []);

  return (
    <div className="w-full md:mt-5">
      <div className="100vh flex flex-nowrap overflow-hidden">
        {lastTrades?.map((trade, index) => {
          return (
            <div key={index} className="md:w-1/12 w-1/6 md:basis-1/12 basis-1/6 flex-shrink-0">
              <Link href={`/token/${trade.tokenAddress?._id}`} passHref className="m-0 p-0">
                <LastTradeCard tradeData={trade} index={index} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
