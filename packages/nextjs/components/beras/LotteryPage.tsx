// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import { LotteryLeaderCard } from '~~/components/beras/lottery/LotteryLeaderCard'
// import Link from "next/link";

export const LotteryPage = () => {
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
        {/* {lotteryLeaders?.map(tokenAddress => {
          return (
            <div key={tokenAddress} className="md:w-1/4 w-1/3 max-w-[400px] md:p-2 p-1">
              {<Link href={"/token/" + tokenAddress} passHref className="lg:flex items-center">
                <LotteryLeaderCard tokenAddress={tokenAddress} round={round} />
              </Link>}
            </div>
          );
        })} */}
      </div>
    </>
  );
};
