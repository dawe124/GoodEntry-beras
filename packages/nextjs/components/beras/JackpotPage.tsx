// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import { LotteryLeaderCard } from '~~/components/beras/lottery/LotteryLeaderCard'
// import Link from "next/link";
import { Card } from "~~/components/Card";

export const JackpotPage = () => {
  // const round: number = Math.floor(new Date().getTime() / 86400000) + 1

  // const getLotteryLeaders = (amount: number, round: number) => {

  //   const lotteryLeaders: string[] = []

  //   for (let i = 0; i < amount; i++) {
  //       const { data: address } = useScaffoldReadContract({
  //         contractName: "TokenController",
  //         functionName: "tokenDailyLotteryLeaders",
  //         args: [BigInt(round), BigInt(i)]
  //       });

  //       if (address !== undefined && address !== '0x0000000000000000000000000000000000000000') lotteryLeaders.push(address)
  //   }

  //   return lotteryLeaders
  // }

  // const lotteryLeaders = getLotteryLeaders(5, round)

  return (
    <>
      <div className="flex flex-row min-h-full w-full mx-auto">
        <Card title="Jackpot" className="flex-grow w-96 rounded-[1rem] bg-base-200">
          <div></div>
        </Card>
      </div>
    </>
  );
};
