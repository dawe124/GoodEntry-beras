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
      token: "BERA",
      address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
    },
    {
      id: "2",
      name: "Griffin",
      transaction: "sell",
      amount: 69,
      token: "RABBIT",
      address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
    },
    {
      id: "3",
      name: "HarryPotterObama",
      transaction: "buy",
      amount: 694,
      token: "HPO",
      address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
    },
    {
      id: "4",
      name: "BidenTrump",
      transaction: "sell",
      amount: 0.01,
      token: "KEK",
      address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
    },
    {
      id: "5",
      name: "JustinSun",
      transaction: "sell",
      amount: 888.8,
      token: "PIDGEON",
      address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
    },
    {
      id: "6",
      name: "Boaty McBoatface",
      transaction: "buy",
      amount: 2016,
      token: "PARKBOYS",
      address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
    },
    {
      id: "7",
      name: "Pikachu",
      transaction: "buy",
      amount: 420,
      token: "MYMAN",
      address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
    },
    {
      id: "8",
      name: "Griffin",
      transaction: "sell",
      amount: 69,
      token: "ASIMOV",
      address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
    },
    {
      id: "9",
      name: "HarryPotterObama",
      transaction: "buy",
      amount: 694,
      token: "R2D2",
      address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
    },
    {
      id: "10",
      name: "BidenTrump",
      transaction: "sell",
      amount: 0.01,
      token: "APPLES",
      address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
    },
    {
      id: "11",
      name: "JustinSun",
      transaction: "sell",
      amount: 888.8,
      token: "NOTBTC",
      address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
    },
    {
      id: "12",
      name: "Boaty McBoatface",
      transaction: "buy",
      amount: 2016,
      token: "FARMER",
      address: "0xB4c1B0d2a27A34dbb7411Ee19a5CC17D8Ca60341",
    },
  ];

  return (
    <div className="w-full md:mt-5">
      <div className="flex flex-row items-center">
        <CurrencyDollarIcon className="text-neutral text-xs h-5 mb-1 mr-1" />
        <h2 className="text-neutral text-xl font-bold">Latest Trades</h2>
      </div>
      <div className="100vh flex flex-nowrap overflow-hidden">
        {lastTrades?.map((trade, index) => {
          return (
            <div key={trade.id} className="md:w-1/12 w-1/6 md:basis-1/12 basis-1/6 flex-shrink-0">
              <Link href={`/token/${trade.address}`} passHref className="m-0 p-0">
                <LastTradeCard tradeData={trade} index={index} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
