import { Suspense, lazy } from "react";
import Link from "next/link";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { TokenCardPlaceholder } from "~~/components/beras/placeholders/TokenCardPlaceholder";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const TokenCard = lazy(() => import("~~/components/beras/TokenCard"));

export const TokenList = () => {
  const { data: lastTokens } = useScaffoldReadContract({
    contractName: "TokenController",
    functionName: "getLastTokens",
  });

  return (
    <div className="md:mt-5">
      <div className="flex flex-row items-center">
        <ClipboardDocumentListIcon className="text-neutral text-xs h-5 mb-1 mr-1" />
        <h2 className="text-neutral text-xl font-bold">Newly Minted</h2>
      </div>
      <div className="rounded-box flex flex-wrap">
        {lastTokens?.map(tokenAddress => {
          return (
            <div key={tokenAddress} className="md:w-1/4 w-1/3 max-w-[400px] md:p-2 p-1">
              <Suspense fallback={<TokenCardPlaceholder />}>
                <Link href={"/token/" + tokenAddress} passHref className="lg:flex items-center">
                  <TokenCard tokenAddress={tokenAddress} />
                </Link>
              </Suspense>
            </div>
          );
        })}
      </div>
    </div>
  );
};
