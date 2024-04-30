"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TokenList } from "~~/components/beras/TokenList";
import { Chat } from "~~/components/beras/chat/Chat";
import { CreateToken } from "~~/components/beras/createToken/CreateToken";

const Home: NextPage = () => {
  const [nav, setNav] = useState<string>("home");
  const home = nav == "home" || nav == "create" ? "block" : "hidden";

  return (
    <div className="overflow-y-hidden h-[calc(100vh-80px)]">
      <div className="flex flex-row pt-5">
        <div
          className={`${home} md:block md:h-[calc(100vh-100px)] sm:h-[calc(100vh-300px)] border-red-200 overflow-y-auto md:w-9/12`}
        >
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Las Beras</span>
          </h1>
          {nav == "home" ? (
            <div className="px-5">
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
            <div className="px-5">
              <button
                onClick={() => {
                  setNav("home");
                }}
              >
                Back to token list
              </button>
              <CreateToken setNav={setNav} />
            </div>
          )}
        </div>
        <div className={`${nav == "chat" ? "block" : "hidden"} md:block sm:w-full md:w-3/12`}>
          <Chat />
        </div>
      </div>

      <div className="py-5 px-1 mb-11 mb-0 md:invisible">
        <div className="fixed flex justify-between items-center w-full z-10 px-4 bottom-0 left-0 pointer-events-none bg-base-100">
          <div className="flex flex-row md:flex-row gap-2 pointer-events-auto">
            <div
              onClick={() => {
                setNav("home");
              }}
            >
              <MagnifyingGlassIcon className="h-1/2" />
              Home
            </div>
            <div
              onClick={() => {
                setNav("chat");
              }}
            >
              <BugAntIcon className="h-1/2" />
              Chat
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
