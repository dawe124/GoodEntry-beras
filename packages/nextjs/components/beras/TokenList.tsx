import { Suspense, lazy } from "react";
import Link from "next/link";
import { ClipboardDocumentListIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { TokenSearch } from "~~/components/beras/TokenSearch";
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
      <div className="md:hidden flex flex-row items-center justify-between border-b-[1px] border-b-[#1E2229] pb-2 mb-2">
        <div className="flex flex-row items-center">
          <MagnifyingGlassIcon className="text-neutral text-xs h-5 mr-1" />
          <h2 className="text-neutral md:text-xl text-md font-bold m-0 p-0 mr-5">Search:</h2>
        </div>
        <TokenSearch />
      </div>
      <div className="flex flex-row items-center">
        <ClipboardDocumentListIcon className="text-neutral text-xs h-5 mr-1" />
        <h2 className="text-neutral md:text-xl text-md font-bold m-0 p-0">Newly Minted</h2>
        <div className="md:block hidden ml-5">
          <TokenSearch />
        </div>
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
