import Link from "next/link";
import { TokenCard } from "~~/components/beras/TokenCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// Use contract list of coins for now, create a server side DB and return according to criteria later
export const TokenList = () => {
  const { data: lastTokens } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getLastTokens",
  });

  return (
    <div className="w-full bg-base-200 rounded-md p-5 md:mt-5 md:shadow-lg">
      <h2 className="text-neutral text-xl font-bold">Last Tokens</h2>
      <div className="w-full carousel rounded-box overflow-x-scroll">
        <div className="carousel-item">
          <Link
            href={"/token/" + "xxxx"}
            passHref
            className="lg:flex items-center gap-2 ml-4 mr-6 shrink-0"
            key={"xxxx"}
          >
            <TokenCard tokenAddress={"xxxx"} />
          </Link>
        </div>
        <div className="carousel-item">
          <Link
            href={"/token/" + "xxxx"}
            passHref
            className="lg:flex items-center gap-2 ml-4 mr-6 shrink-0"
            key={"xxxx"}
          >
            <TokenCard tokenAddress={"xxxx"} />
          </Link>
        </div>
        <div className="carousel-item">
          <Link
            href={"/token/" + "xxxx"}
            passHref
            className="lg:flex items-center gap-2 ml-4 mr-6 shrink-0"
            key={"xxxx"}
          >
            <TokenCard tokenAddress={"xxxx"} />
          </Link>
        </div>
        {/* <div className="carousel-item">
          <Link
            href={"/token/" + 'xxxx'}
            passHref
            className="lg:flex items-center gap-2 ml-4 mr-6 shrink-0"
            key={'xxxx'}
          >
            <TokenCard tokenAddress={'xxxx'} />
          </Link>
        </div>  */}
        {lastTokens?.map((tokenAddress, index) => {
          return (
            <div className="carousel-item" key={index}>
              <Link href={"/token/" + tokenAddress} passHref className="lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
                <TokenCard tokenAddress={tokenAddress} />
              </Link>
            </div>
          );
        })}
      </div>
      {/* <div className="flex justify-center items-center gap-12 flex-col sm:flex-row flex-wrap">
        {lastTokens?.map(tokenAddress => {
          return (
            <Link
              href={"/token/" + tokenAddress}
              passHref
              className="lg:flex items-center gap-2 ml-4 mr-6 shrink-0"
              key={tokenAddress}
            >
              <TokenCard tokenAddress={tokenAddress} />
            </Link>
          );
        })}
      </div> */}
    </div>
  );
};
