"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { ArrowLeftIcon, ChatBubbleBottomCenterIcon, HomeIcon } from "@heroicons/react/24/outline";
import { PasswordProtection } from "~~/components/beras/PasswordProtection";
import { TokenList } from "~~/components/beras/TokenList";
import { TokenPage } from "~~/components/beras/TokenPage";
import { Chat2 } from "~~/components/beras/chat/Chat2";
import { CreateToken } from "~~/components/beras/createToken/CreateToken";

const Home: NextPage = () => {
  const [nav, setNav] = useState<string>("home");
  const chat = nav == "chat" ? "hidden" : "block";

  return (
    <div className="overflow-y-hidden h-[calc(100vh-80px)]">
      <PasswordProtection>
        <div className="flex flex-row md:pt-5 min-h-full">
          <div
            className={`w-full ${chat} h-[calc(100vh-140px)] md:block md:h-[calc(100vh-100px)] border-red-200 overflow-y-auto md:w-9/12`}
          >
            {nav == "home" ? (
              <div className="px-5">
                {" "}
                <h1 className="text-center">
                  <span className="block text-2xl mb-2">Las Beras</span>
                </h1>
                <div>
                  <button
                    className="text-center text-lg"
                    onClick={() => {
                      setNav("create");
                    }}
                  >
                    Create a new coin
                  </button>
                </div>
                <TokenList setNav={setNav} />
              </div>
            ) : (
              <></>
            )}
            {nav == "create" ? (
              <div className="px-5">
                <button
                  onClick={() => {
                    setNav("home");
                  }}
                  className="flex flex-row items-center"
                >
                  <ArrowLeftIcon className="h-4" /> Back
                </button>
                <CreateToken setNav={setNav} />
              </div>
            ) : (
              <></>
            )}
            {nav && nav.indexOf("0x") == 0 ? (
              <div className="px-5">
                <button
                  onClick={() => {
                    setNav("home");
                  }}
                  className="flex flex-row items-center"
                >
                  <ArrowLeftIcon className="h-4" /> Back
                </button>
                <TokenPage tokenAddress={nav} />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={`${nav == "chat" ? "block" : "hidden"} md:block w-full md:w-3/12`}>
            <Chat2 />
          </div>
        </div>

        <div className="py-5 px-1 mb-11 mb-0 md:invisible">
          <div className="fixed flex justify-between items-center w-full z-10 px-4 bottom-0 left-0 pointer-events-none bg-base-100">
            <div className="flex flex-row flex-grow justify-evenly pointer-events-auto h-12">
              <div
                onClick={() => {
                  setNav("home");
                }}
              >
                <HomeIcon className="pt-2 h-3/4" />
              </div>
              <div
                onClick={() => {
                  setNav("chat");
                }}
              >
                <ChatBubbleBottomCenterIcon className="pt-2 h-3/4" />
              </div>
            </div>
          </div>
        </div>
      </PasswordProtection>
    </div>
  );
};

export default Home;
