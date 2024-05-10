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
    <div className="flex-grow bg-base-300 mt-16 px-8 py-12">
      <div className="flex justify-center items-center gap-12 flex-col sm:flex-row flex-wrap">
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
      </div>
    </div>
  );
};
