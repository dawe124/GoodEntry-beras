// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { roundNumber } from "~~/utils/roundNumber";

export const TransactionHistory = ({
  trades,
}: {
  trades: { type: string; amount: string; value: string; user: string; txHash: string; date: number }[];
}) => {
  // export const TransactionHistory = () => {

  // const { data: tokenAddress } = useScaffoldReadContract({
  //     contractName: "TokenController",
  //     functionName: 'tickers',
  //     args: ['PARKBOYS']
  //   });

  //   console.log(tokenAddress)

  return (
    <div className="flex justify-center mt-5    ">
      <div className="overflow-x-auto w-full shadow-2xl rounded-xl">
        <table className="table text-xl bg-base-100 table-zebra w-full md:table-md table-sm">
          <thead className="bg-base-200">
            <tr className="rounded-xl text-sm text-neutral">
              <th>Type</th>
              <th>Amount</th>
              <th>Value</th>
              <th>Trader</th>
              <th>Tx</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => {
              const txHash = `https://artio.beratrail.io/tx/${trade.txHash}`;

              return (
                <tr key={index} className="hover text-sm text-neutral">
                  <td className="w-1/8 md:py-4">
                    <span className={`${trade.type === "BUY" ? "text-accent" : "text-red-600"}`}>{trade.type}</span>
                  </td>
                  <td className="w-1/8 md:py-4">
                    <span>{roundNumber(Number(trade.amount), 2)}</span>
                  </td>
                  <td className="w-1/8 md:py-4">
                    <span>{Number(trade.value)}</span>
                  </td>
                  <td className="w-1/4 md:py-4">
                    <span>{trade.user}</span>
                  </td>
                  <td className="w-1/4 md:py-4 hover:text-base-100">
                    <a href={txHash}>{trade.txHash}</a>
                  </td>
                  <td className="w-2/1 md:py-4">
                    <span>{new Date(Number(trade.date)).toLocaleString()}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
