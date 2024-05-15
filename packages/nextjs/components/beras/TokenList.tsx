import Link from "next/link";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { TokenCard } from "~~/components/beras/TokenCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// Use contract list of coins for now, create a server side DB and return according to criteria later
export const TokenList = () => {
  const { data: lastTokens } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getLastTokens",
  });

  return (
    <div className="md:mt-5">
      <div className="flex flex-row items-center">
        <ClipboardDocumentListIcon className="text-neutral text-xs h-5 mb-1 mr-1" />
        <h2 className="text-neutral text-xl font-bold">Newest Tokens</h2>
      </div>
      <div className="rounded-box flex flex-wrap">
        {lastTokens?.map(tokenAddress => {
          return (
            <div key={tokenAddress} className="md:w-1/4 w-1/3 max-w-[400px] md:p-2 p-1">
              <Link href={"/token/" + tokenAddress} passHref className="lg:flex items-center">
                <TokenCard tokenAddress={tokenAddress} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
