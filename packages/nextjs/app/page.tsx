"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { TokenList } from "~~/components/beras/TokenList";

const Home: NextPage = () => {
  return (
    <div className="overflow-y-hidden md:w-full">
      <div className="flex flex-col">
        <div className="hero h-1/2 bg-gradient-to-br from-[#040C02] via-[#02140D] to-[#0f161d] md:rounded-md rounded-xl md:mb-0 mb-2 md:shadow-lg">
          <div className="flex flex-row justify-between md:p-5 py-5">
            <div className="md:block hidden">
              <img
                src="https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/QmX2Mbm1s9DPCgSyDisC1SiWM4ZnXYcKqCviwvPErZRaaX"
                className="max-w-sm rounded-lg shadow-2xl"
              />
            </div>
            <div className="relative w-full flex flex-col items-center justify-center">
              <div className="text-center">
                <h1 className="md:text-8xl text-3xl font-bold hero-title mb-0 pb-0 mx-auto">NEXT ROUND STARTS IN:</h1>
              </div>
              <div>
                <div className="grid grid-flow-col md:gap-5 text-center auto-cols-max my-6">
                  <div className="flex flex-col text-success rounded-md border border-success bg-success bg-opacity-10 md:mx-0 mx-1">
                    <span className="countdown font-mono text-6xl md:mx-0 mx-1">
                      <span></span>
                    </span>
                    days
                  </div>
                  <div className="flex flex-col text-success rounded-md border border-success bg-success bg-opacity-10 md:mx-0 mx-1">
                    <span className="countdown font-mono text-6xl md:mx-0 mx-1">
                      <span></span>
                    </span>
                    hours
                  </div>
                  <div className="flex flex-col text-success rounded-md border border-success bg-success bg-opacity-10 md:mx-0 mx-1">
                    <span className="countdown font-mono text-6xl md:mx-0 mx-1">
                      <span></span>
                    </span>
                    min
                  </div>
                </div>
                <Link href={"#"} className="w-full btn btn-secondary text-neutral text-xl">
                  GO BIG!
                </Link>
                <div className="text-center text-base-300 mt-2">
                  <span>
                    or go
                    <Link href="/go-home"> home.</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`max-w-1/2`}>
          <TokenList />
        </div>
      </div>
    </div>
  );
};

export default Home;
