import Image from "next/image";

const emojis = ["berahead", "feelsokayman", "kek", "kekwait", "pepeclown", "midcurvio"];

export const Emojis = ({ onSelect }: { onSelect: (msg: string) => void }) => {
  return (
    <div className="">
      <div className="flex flex-row flex-wrap w-full gap-2">
        {emojis.map((emoji, i) => {
          return (
            <>
              <Image
                src={"/emojis/" + emoji + ".png"}
                height={36}
                width={36}
                onClick={() => {
                  onSelect(emoji);
                }}
                key={i}
                alt={emoji}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};
