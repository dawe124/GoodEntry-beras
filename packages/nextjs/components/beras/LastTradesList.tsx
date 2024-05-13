import Link from "next/link";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { LastTradeCard } from "~~/components/beras/LastTradeCard";

// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// Use contract list of coins for now, create a server side DB and return according to criteria later
export const LastTradesList = () => {
  // const { data: lastTokens } = useScaffoldReadContract({
  //   contractName: "TokenController",
  //   functionName: "getLastTokens",
  // });
  const lastTrades = [
    {
      id: "1",
      name: "Pikachu",
      transaction: "buy",
      amount: 420,
      imgUrl: "/placeholders/pikachu.jpg",
    },
    {
      id: "2",
      name: "Griffin",
      transaction: "sell",
      amount: 69,
      imgUrl: "/placeholders/ripndip.jpg",
    },
    {
      id: "3",
      name: "HarryPotterObama",
      transaction: "buy",
      amount: 694,
      imgUrl: "/placeholders/powerpuff.jpg",
    },
    {
      id: "4",
      name: "BidenTrump",
      transaction: "sell",
      amount: 0.01,
      imgUrl: "/placeholders/hahaha-no.jpg",
    },
    {
      id: "5",
      name: "JustinSun",
      transaction: "sell",
      amount: 888.8,
      imgUrl: "/placeholders/pepe.jpg",
    },
    {
      id: "6",
      name: "Boaty McBoatface",
      transaction: "buy",
      amount: 2016,
      imgUrl: "/placeholders/weasel.jpg",
    },
  ];

  return (
    <div className="md:mt-5">
      <div className="flex flex-row items-center">
        <CurrencyDollarIcon className="text-neutral text-xs h-5 mb-1 mr-1" />
        <h2 className="text-neutral text-xl font-bold">Latest Trades</h2>
      </div>
      <div className="rounded-box flex flex-wrap">
        {lastTrades?.map((trade, index) => {
          return (
            <div key={trade.id} className="md:w-1/6 w-1/6">
              <Link href={"/#"} passHref className="lg:flex items-center m-0 p-0">
                <LastTradeCard tradeData={trade} index={index} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
