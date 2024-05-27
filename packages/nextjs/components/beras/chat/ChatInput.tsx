import { useState } from "react";
import Image from "next/image";
import { EmojisPopup } from "./EmojisPopup";

export const ChatInput = ({ isDisabled, sendMessage }: { isDisabled: boolean; sendMessage: (msg: string) => void }) => {
  const [message, setMessage] = useState<string>("");
  const [msgTooLongAlert, setMsgTooLongAlert] = useState<boolean>(false);
  const [isEmojisVisible, setEmojisVisible] = useState<boolean>(false);

  const inputLimit = 160;

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
        {msgTooLongAlert && (
          <div className="absolute -top-24">
            <div role="alert" className="alert alert-error flex flex-row rounded-[1rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setMsgTooLongAlert(false)}
                className="text-neutral cursor-pointer stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-neutral">An average bera can&apos;t comprehend this much text.</span>
            </div>
          </div>
        )}
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
        <div className="relative w-full">
          <input
            type="text"
            placeholder={isDisabled ? "Log in to chat" : "Type here"}
            disabled={isDisabled}
            className="input input-bordered border rounded-r-md  w-full text-neutral rounded-md shadow-md border-base-300 focus:outline-none focus:ring-2 focus:ring-accent"
            maxLength={inputLimit}
            value={message}
            onChange={e => {
              const prevMessage = message;
              if (e.target.value.length < inputLimit) {
                setMessage(e.target.value);
              } else {
                setMsgTooLongAlert(true);
                setMessage(prevMessage);
              }
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                sendMessage(message);
                setMessage(""); // Clear input after sending
              }
            }}
          />
          <div className="absolute right-2 top-0 bottom-0 flex items-center justify-center">
            <button
              className="bg-accent w-[30px] rounded-[1rem]"
              title="Click for commands"
              onClick={() => {
                sendMessage("/help");
              }}
            >
              ?
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
