import { TokenCard } from "~~/components/beras/TokenCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// Use contract list of coins for now, create a server side DB and return according to criteria later
export const TokenList = ({ setNav }: { setNav: any }) => {
  const { data: lastTokens } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getLastTokens",
  });
  console.log("how many tokens", lastTokens);

  return (
    <div className="flex-grow bg-base-300 mt-16 px-8 py-12">
      <div className="flex justify-center items-center gap-12 flex-col sm:flex-row flex-wrap">
        {lastTokens?.map(tokenAddress => {
          return (
            <div
              key={tokenAddress}
              onClick={() => {
                setNav(tokenAddress);
              }}
            >
              <TokenCard tokenAddress={tokenAddress} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
