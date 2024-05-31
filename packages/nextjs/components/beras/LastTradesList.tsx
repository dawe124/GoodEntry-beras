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
        const response = await fetch(`/api/trades`);
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

  // const lastTrades = [
  //   {
  //     id: "1",
  //     transaction: "buy",
  //     amount: 420,
  //     token: "BERA",
  //     address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
  //     imgUrl: "/placeholders/pikachu.jpg",
  //   },
  //   {
  //     id: "2",
  //     transaction: "sell",
  //     amount: 69,
  //     token: "RABBIT",
  //     address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
  //     imgUrl: "/placeholders/hahaha-no.jpg",
  //   },
  //   {
  //     id: "3",
  //     transaction: "buy",
  //     amount: 694,
  //     token: "HPO",
  //     address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
  //     imgUrl: "/placeholders/pepe.jpg",
  //   },
  //   {
  //     id: "4",
  //     transaction: "sell",
  //     amount: 0.01,
  //     token: "KEK",
  //     address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
  //     imgUrl: "/placeholders/ripndip.jpg",
  //   },
  //   {
  //     id: "5",
  //     transaction: "sell",
  //     amount: 888.8,
  //     token: "PIDGEON",
  //     address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
  //     imgUrl: "/placeholders/powerpuff.jpg",
  //   },
  //   {
  //     id: "6",
  //     transaction: "buy",
  //     amount: 2016,
  //     token: "PARKBOYS",
  //     address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
  //     imgUrl: "/placeholders/weasel.jpg",
  //   },
  //   {
  //     id: "7",
  //     transaction: "buy",
  //     amount: 420,
  //     token: "MYMAN",
  //     address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
  //     imgUrl: "/placeholders/pikachu.jpg",
  //   },
  //   {
  //     id: "8",
  //     transaction: "sell",
  //     amount: 69,
  //     token: "ASIMOV",
  //     address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
  //     imgUrl: "/placeholders/ripndip.jpg",
  //   },
  //   {
  //     id: "9",
  //     transaction: "buy",
  //     amount: 694,
  //     token: "R2D2",
  //     address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
  //     imgUrl: "/placeholders/pikachu.jpg",
  //   },
  //   {
  //     id: "10",
  //     transaction: "sell",
  //     amount: 0.01,
  //     token: "APPLES",
  //     address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
  //     imgUrl: "/placeholders/powerpuff.jpg",
  //   },
  //   {
  //     id: "11",
  //     transaction: "sell",
  //     amount: 888.8,
  //     token: "NOTBTC",
  //     address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
  //     imgUrl: "/placeholders/hahaha-no.jpg",
  //   },
  //   {
  //     id: "12",
  //     transaction: "buy",
  //     amount: 2016,
  //     token: "FARMER",
  //     address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
  //     imgUrl: "/placeholders/weasel.jpg",
  //   },
  // ];

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
