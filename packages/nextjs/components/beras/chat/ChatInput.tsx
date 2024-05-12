import { useState } from "react";
import Image from "next/image";
import { Emojis } from "./Emojis";

export const ChatInput = ({ isDisabled, sendMessage }: { isDisabled: boolean; sendMessage: (msg: string) => void }) => {
  const [message, setMessage] = useState<string>("");
  const [isEmojisVisible, setEmojisVisible] = useState<boolean>(false);

  const onSelectEmoji = (emoji: string) => {
    setMessage(message + ":" + emoji + ":");
    setEmojisVisible(false);
  };

  return (
    <>
      {isEmojisVisible ? (
        <div className="absolute bottom-12 rounded-md p-2 h-24 w-[376px] bg-base-100 border border-secondary">
          <Emojis onSelect={onSelectEmoji} />
        </div>
      ) : (
        <></>
      )}

      <div className="md:absolute fixed bg-base-100 h-12 bottom-0 left-2 right-2 flex flex-row items-center rounded-md overflow-hidden">
        <div className="relative">
          <Image
            src="/emojis/kek.png"
            height={30}
            width={50}
            alt="berojis"
            onClick={() => {
              setEmojisVisible(!isEmojisVisible);
            }}
            className={`${isEmojisVisible ? "animate-spin" : ""}`}
          />
        </div>
        <input
          type="text"
          placeholder={isDisabled ? "Log in to chat" : "Type here"}
          disabled={isDisabled}
          className="input input-bordered border rounded-r-md border-base-200 focus:border-l-base-300 focus:border-t-base-300 focus:border-b-base-300 w-full text-neutral"
          maxLength={200}
          value={message}
          onChange={e => {
            setMessage(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === "Enter") {
              sendMessage(message);
              setMessage(""); // Clear input after sending
            }
          }}
        />
      </div>
    </>
  );
};
