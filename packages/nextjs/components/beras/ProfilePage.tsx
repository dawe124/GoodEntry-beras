import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ProfileCard } from "~~/components/beras/profile/ProfileCard";

interface Token {
  address: string;
  name: string;
  symbol: string;
  icon: string;
  description: string | undefined;
  creation_date: number;
  last_trade: number | undefined;
  created_by: string | undefined;
}

function getTokenByCreator(data: { [key: string]: Token }, creatorAddress: string): Token[] {
  return Object.values(data).filter(item => item?.created_by === creatorAddress);
  // return Object.values(data).filter(item => item?.created_by === creatorAddress);
}

export const ProfilePage = ({ address }: { address: string }) => {
  const [createdTokensList, setCreatedTokensList] = useState<Token[]>([]);

  const { data: session } = useSession();

  // @ts-ignore
  const userAddress = session?.address;

  useEffect(() => {
    const fetchUserTokens = async () => {
      try {
        const response = await fetch(`https://api.lasberas.com/berachain_testnet/tokens.json`);
        const data = await response.json();

        const tokenArray = getTokenByCreator(data, address);

        setCreatedTokensList(tokenArray);
      } catch (error) {
        setCreatedTokensList([]);
        console.error("Error fetching token list:", error);
      }
    };
    fetchUserTokens();
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
                  href={`/token/${token.address}`}
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
                    <span className="md:block hidden text-base-300">{token.address}</span>
                    <span className="md:hidden block text-base-300">
                      {token.address.substring(0, 6) +
                        "..." +
                        token.address.substring(token.address.length - 6, token.address.length)}
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
        </div>
      </div>
    </>
  );
};
