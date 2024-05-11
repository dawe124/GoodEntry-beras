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
        <div className="fixed bottom-0 h-24 w-96 bg-blue-200">
          <Emojis onSelect={onSelectEmoji} />
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-row flex-grow fixed w-full">
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
        <input
          type="text"
          placeholder={isDisabled ? "Log in to chat" : "Type here"}
          disabled={isDisabled}
          className="input input-bordered w-full max-w-xs "
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
