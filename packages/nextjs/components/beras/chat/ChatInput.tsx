import { useState } from "react";
import Image from "next/image";
import { EmojisPopup } from "./EmojisPopup";

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
        <div className="absolute bottom-14 left-2 right-4 rounded-md p-2 h-48 bg-base-300 border border-base-100 shadow-center shadow-accent">
          <EmojisPopup onSelect={onSelectEmoji} />
        </div>
      ) : (
        <></>
      )}

      <div className="md:absolute fixed bg-base-100 h-12 bottom-2 md:right-5 left-2 right-2 flex flex-row items-center rounded-md">
        <div className="relative hover:animate-custom-bounce">
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
          className="input input-bordered border rounded-r-md  w-full text-neutral rounded-md shadow-md border-base-300 focus:outline-none focus:ring-2 focus:ring-accent"
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
