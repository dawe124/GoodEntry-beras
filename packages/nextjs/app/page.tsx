"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { LastTradesList } from "~~/components/beras/LastTradesList";
import { TokenList } from "~~/components/beras/TokenList";

const Home: NextPage = () => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col">
        <div className="w-full flex md:flex-col flex-col-reverse">
          <div className="w-full md:block hidden rounded-[1rem] bg-gradient-to-tr from-[#0F161D] via-[#C9FFFF] to-[#0F161D] hover:shadow-center hover:shadow-accent duration-300 p-[1px] md:mb-0 mb-2 overflow-y-hidden">
            <div className="flex flex-row h-full w-full rounded-[1rem] items-center bg-[#0F161D] justify-between md:p-5 py-2 back">
              <div className="w-full flex flex-col justify-center items-center">
                <p className="md:text-6xl text-3xl font-bold hero-title mb-2 pb-0 mx-auto banner-neon">
                  VIVA LAS BERAS
                </p>
                <p className="md:text-4xl text-xl text-accent font-bold mb-6 pb-0 mx-auto">CREATE YOUR TOKEN NOW!</p>
                <div className="relative md:inline-flex hidden group w-[300px]">
                  <div className="absolute transitiona-all duration-1000 opacity-70  w-[300px] -inset-px bg-gradient-to-b from-[#FFB702] via-accent to-[#FFB702] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                  <a
                    href="/create"
                    title="APE NOW!"
                    className="relative w-[300px] inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[#FFB702] font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                  >
                    LOREM APE-SUM
                  </a>
                </div>
              </div>
              <div className="md:block hidden h-full">
                <img
                  src="https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/QmX2Mbm1s9DPCgSyDisC1SiWM4ZnXYcKqCviwvPErZRaaX"
                  className=""
                />
              </div>
            </div>
          </div>
          <Link className="md:hidden block" href={"/create"}>
            <div className="w-full rounded-[1rem] bg-gradient-to-tr from-[#0F161D] via-[#C9FFFF] to-[#0F161D] hover:shadow-center hover:shadow-accent duration-300 p-[1px] md:mb-0 mb-2 overflow-y-hidden">
              <div className="flex flex-row h-full w-full rounded-[1rem] items-center bg-[#0F161D] justify-between md:p-5 py-2 back">
                <div className="w-full flex flex-col justify-center items-center">
                  <p className="md:text-6xl text-3xl font-bold hero-title mb-2 pb-0 mx-auto banner-neon">
                    VIVA LAS BERAS
                  </p>
                  <p className="md:text-4xl text-xl text-accent font-bold mb-6 pb-0 mx-auto">CREATE YOUR TOKEN NOW!</p>
                  <div className="relative md:inline-flex hidden group w-[300px]">
                    <div className="absolute transitiona-all duration-1000 opacity-70  w-[300px] -inset-px bg-gradient-to-b from-[#FFB702] via-accent to-[#FFB702] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                    <a
                      href="/create"
                      title="APE NOW!"
                      className="relative w-[300px] inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[#FFB702] font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      role="button"
                    >
                      LOREM APE-SUM
                    </a>
                  </div>
                </div>
                <div className="md:block hidden h-full">
                  <img
                    src="https://blush-genuine-alpaca-303.mypinata.cloud/ipfs/QmX2Mbm1s9DPCgSyDisC1SiWM4ZnXYcKqCviwvPErZRaaX"
                    className=""
                  />
                </div>
              </div>
            </div>
          </Link>
          <div className={`w-full md:mb-0 mb-2`}>
            <LastTradesList />
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
