import { useEffect, useState } from "react";
import { roundNumber } from "~~/utils/roundNumber";

interface Trade {
  type: string;
  amount: string;
  value: string;
  user: string;
  txHash: string;
  tokenAddress: string;
  date: number;
}

export const TransactionHistory = ({ tokenAddress }: { tokenAddress: string }) => {
  const [tradeHistory, setTradeHistory] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await fetch(`/api/trades/${tokenAddress}`);
        const data = await response.json();
        const { trades } = data;

        setTradeHistory(trades?.length > 0 ? trades : []);
      } catch (error) {
        console.error("Error fetching trade history:", error);
        setTradeHistory([]);
      }
    };

    fetchTrades();
  }, []);

  return (
    <div className="flex justify-center mt-5  border-[1px] border-[#1E2229] overflow-hidden rounded-[4px]">
      <div className="overflow-x-auto w-full shadow-2xl rounded-[4px]">
        <table className="table text-xl bg-base-100 border-[1px] border-[#1E2229] w-full md:table-md table-sm">
          <thead className="bg-base-100">
            <tr className="rounded-[4px] text-sm">
              <th>Type</th>
              <th>Amount</th>
              <th>Value</th>
              <th>User</th>
              <th>Tx</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tradeHistory.length > 0 &&
              tradeHistory.map((trade, index) => {
                const txHash = `https://artio.beratrail.io/tx/${trade.txHash}`;

                return (
                  <tr key={index} className="group hover:bg-accent text-sm text-neutral">
                    <td className="w-1/8 md:py-4">
                      <span
                        className={`${trade.type === "BUY" ? "text-accent" : "text-red-600"} group-hover:text-neutral`}
                      >
                        {trade.type}
                      </span>
                    </td>
                    <td className="w-1/8 md:py-4">
                      <span>{roundNumber(Number(trade.amount), 2)}</span>
                    </td>
                    <td className="w-1/8 md:py-4">
                      <span>{Number(trade.value)}</span>
                    </td>
                    <td className="w-1/4 md:py-4 hover:text-base-100">
                      <a href={`https://artio.beratrail.io/address/${trade.user}`}>{trade.user?.substring(0, 12)}</a>
                    </td>
                    <td className="w-1/4 md:py-4 hover:text-base-100">
                      <a target="_blank" href={txHash}>
                        {trade.txHash?.substring(0, 12)}...
                      </a>
                    </td>
                    <td className="w-2/1 md:py-4">
                      <span>{new Date(Number(trade.date)).toLocaleString()}</span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {tradeHistory.length === 0 && (
          <div className="w-full text-center text-neutral py-2">
            <span>No Trade History</span>
          </div>
        )}
      </div>
    </div>
  );
};
