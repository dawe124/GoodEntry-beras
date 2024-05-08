import { Card } from "~~/components/Card";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// weird behaviour where if w-60, then adding w-full does work but with w-64 not...
export const TokenCard = ({ tokenAddress, width }: { tokenAddress: string; width?: string }) => {
  const { data: name } = useScaffoldReadContract({
    contractName: "Token",
    address: tokenAddress,
    functionName: "name",
  });

  const { data: symbol } = useScaffoldReadContract({
    contractName: "Token",
    address: tokenAddress,
    functionName: "symbol",
  });

  const { data: desc } = useScaffoldReadContract({
    contractName: "Token",
    address: tokenAddress,
    functionName: "desc",
  });

  let descJson;
  try {
    descJson = JSON.parse(desc || "{}");
  } catch (e) {
    descJson = { img: "", desc: desc || "" };
  }
  const imageLink = "https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/" + descJson?.img;

  return (
    <Card image=<img src={imageLink} alt="Token Image" /> title={name + " (" + symbol + ")"} className={width}>
      <div className="flex flex-col justify-center gap-4">
        <div className="font-bold"></div>
        <p>{descJson.desc}</p>
      </div>
    </Card>
  );
};
