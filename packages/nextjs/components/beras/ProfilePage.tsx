import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { formatEther } from "viem";
import { ProfileCard } from "~~/components/beras/profile/ProfileCard";
import { formatNumber } from "~~/utils/formatNumber";
import { roundNumber } from "~~/utils/roundNumber";

interface Token {
  _id: string;
  name: string;
  symbol: string;
  icon: string;
  description: string | undefined;
  creation_date: number;
  last_trade: number | undefined;
  creator: string | undefined;
}

interface Holding {
  chainId: string;
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenQuantity: string;
  tokenValueInUsd: string;
  updatedAtBlock: string;
}

function getTokenByCreator(data: { [key: string]: Token }, creatorAddress: string): Token[] {
  return Object.values(data).filter(item => item?.creator === creatorAddress);
  // return Object.values(data).filter(item => item?.created_by === creatorAddress);
}

function getTokenImage(data: object, tokenAddress: string): string {
  const findToken = Object.values(data).filter(item => item.address === tokenAddress);
  return findToken[0]?.icon;
}

export const ProfilePage = ({ address }: { address: string }) => {
  const [createdTokensList, setCreatedTokensList] = useState<Token[]>([]);
  const [serverTokenList, setServerTokenList] = useState<Token[]>([]);
  const [userHoldings, setUserHoldings] = useState<Holding[]>([]);

  const { data: session } = useSession();

  // @ts-ignore
  const userAddress = session?.address;

  useEffect(() => {
    const fetchUserTokens = async () => {
      try {
        const response = await fetch(`/api/tokens`);
        const { token } = await response.json();

        setServerTokenList(token);

        const tokenArray = getTokenByCreator(token, address);

        setCreatedTokensList(tokenArray);
      } catch (error) {
        setCreatedTokensList([]);
        console.error("Error fetching token list:", error);
      }
    };
    fetchUserTokens();
  }, []);

  useEffect(() => {
    const fetchUserHoldings = async () => {
      try {
        const response = await fetch(
          `https://api.routescan.io/v2/network/testnet/evm/all/address/${address}/erc20-holdings`,
        );
        const { items } = await response.json();

        setUserHoldings(items || []);
      } catch (error) {
        // setCreatedTokensList([]);
        console.error("Error fetching user holdings:", error);
      }
    };
    fetchUserHoldings();
  }, []);

  return (
    <>
      <div className="flex flex-row min-h-full w-full mx-auto">
        <div className="md:w-[600px] w-full md:pl-5 md:pt-5 mx-auto">
          <ProfileCard address={address} />
          <div className="w-full bg-base-100 rounded-[1rem] md:p-5 p-2 mt-5">
            <p>Tokens created by this user:</p>
            {createdTokensList.length > 0 ? (
              createdTokensList.map((token, index) => (
                <Link
                  key={index}
                  href={`/token/${token._id}`}
                  className="flex flex-row bg-base-200 p-2 rounded-[1rem] mb-2 hover:shadow-center hover:shadow-accent duration-300"
                >
                  <div
                    className={`z-20 relative overflow-hidden w-16 h-16 aspect-square rounded-lg  group-hover:shadow-center`}
                  >
                    <Image
                      className="aspect-square w-full object-cover"
                      src={`https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/${token.icon}`}
                      alt={`${token.name}`}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col ml-2">
                    <span>
                      {token.symbol} ({token.name})
                    </span>
                    <span className="md:block hidden text-base-300">{token._id}</span>
                    <span className="md:hidden block text-base-300">
                      {token._id.substring(0, 6) + "..." + token._id.substring(token._id.length - 6, token._id.length)}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <>
                {userAddress && userAddress === address ? (
                  <>
                    <p className="text-neutral">You haven&apos;t created any tokens yet</p>
                    <Link href={`/create`} className="bg-secondary rounded-[1rem] py-2 px-5">
                      Create a Token
                    </Link>
                  </>
                ) : (
                  <p className="text-neutral">This user hasn&apos;t created any tokens yet</p>
                )}
              </>
            )}
          </div>
          <div className="w-full bg-base-100 rounded-[1rem] md:p-5 p-2 mt-5">
            <p>User Holdings:</p>
            {userHoldings.length > 0 ? (
              userHoldings.map((token, index) => (
                <Link
                  key={index}
                  href={`/token/${token.tokenAddress}`}
                  className="flex flex-row bg-base-200 p-2 rounded-[1rem] mb-2 hover:shadow-center hover:shadow-accent duration-300"
                >
                  <div
                    className={`z-20 relative overflow-hidden w-16 h-16 aspect-square rounded-lg  group-hover:shadow-center`}
                  >
                    <Image
                      className="aspect-square w-full object-cover"
                      src={`https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/${getTokenImage(
                        serverTokenList,
                        token.tokenAddress,
                      )}`}
                      alt={`${token.tokenName}`}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col ml-2">
                    <span>
                      {token.tokenSymbol} ({token.tokenName})
                    </span>
                    <span className="text-base-300">
                      Balance:{" "}
                      <span className="text-accent">
                        {formatNumber(roundNumber(Number(formatEther(BigInt(token.tokenQuantity) || BigInt(0))), 0))}
                      </span>
                    </span>
                    <span className="md:block hidden text-base-300">{token.tokenAddress}</span>
                    <span className="md:hidden block text-base-300">
                      {token.tokenAddress.substring(0, 6) +
                        "..." +
                        token.tokenAddress.substring(token.tokenAddress.length - 6, token.tokenAddress.length)}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-neutral">This user doesn&apos;t hold any tokens on BERA Chain</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
