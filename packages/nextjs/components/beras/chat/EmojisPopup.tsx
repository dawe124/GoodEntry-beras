import Image from "next/image";
import { emojis } from "./emojis";

export const EmojisPopup = ({ onSelect }: { onSelect: (msg: string) => void }) => {
  return (
    <div className="">
      <div className="flex flex-row flex-wrap w-full gap-2">
        {emojis.list.map((emoji, i) => {
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
