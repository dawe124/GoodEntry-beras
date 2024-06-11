import { useEffect, useState } from "react";
import { isAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAvatar, useEnsName } from "wagmi";
import { Card } from "~~/components/Card";
import { BlockieAvatar } from "~~/components/scaffold-eth";

const blockieSizeMap = {
  xs: 6,
  sm: 7,
  base: 8,
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
};

export const ProfileCard = ({ address }: { address: string }) => {
  // const [ens, setEns] = useState<string | null>();
  const [ensAvatar, setEnsAvatar] = useState<string | null>();
  const [isValidAddress, setIsValidAddress] = useState<boolean>(true);

  const { data: fetchedEns } = useEnsName({
    address: address,
    chainId: 1,
    query: {
      enabled: isAddress(address ?? ""),
    },
  });

  const { data: fetchedEnsAvatar } = useEnsAvatar({
    name: fetchedEns ? normalize(fetchedEns) : undefined,
    chainId: 1,
    query: {
      enabled: Boolean(fetchedEns),
      gcTime: 30_000,
    },
  });

  useEffect(() => {
    const checkIfAddressValid = isAddress(address);
    checkIfAddressValid === true ? setIsValidAddress(true) : setIsValidAddress(false);
  }, []);

  useEffect(() => {
    setEnsAvatar(fetchedEnsAvatar);
  }, [fetchedEnsAvatar]);

  return (
    <>
      {isValidAddress ? (
        <Card className={`w-full bg-base-300 rounded-[4px] overflow-hidden md:shadow-lg`}>
          <div className="flex flex-row items-center w-full h-ful px-0 pb-0 mb-5">
            <BlockieAvatar
              address={address}
              ensImage={ensAvatar}
              size={(blockieSizeMap["3xl"] * 24) / blockieSizeMap["base"]}
            />
            <div className="flex flex-col h-full justify-start md:px-4 px-2">
              <span className="text-neutral text-xl md:block hidden">{address}</span>
              <span className="text-neutral text-xl md:hidden block">
                {address?.slice(0, 6) + "..." + address?.slice(-6)}
              </span>
              <span className="text-base-300 line-clamp-1">Retard</span>
            </div>
          </div>
        </Card>
      ) : (
        <div className="w-full bg-base-200 rounded-[4px] text-neutral p-5 text-center">
          <h1 className="font-bold">Invalid Address</h1>
          <span>*Confused Pepe Croaks*</span>
        </div>
      )}
    </>
  );
};
