"use client";

// import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { JackpotCard } from "~~/components/beras/JackpotCard";
import { LastTradesList } from "~~/components/beras/LastTradesList";
import { MemeOfTheHillCard } from "~~/components/beras/MemeOfTheHillCard";
import { TokenList } from "~~/components/beras/TokenList";
import useClientWidth from "~~/utils/useClientWidth";

const Home: NextPage = () => {
  const width = useClientWidth();

  return (
    <div className="w-full">
      <div className="w-full flex md:flex-col flex-col-reverse">
        <div className="w-full flex md:flex-row flex-col-reverse md:gap-2">
          {width !== null && width <= 1024 ? (
            <Link className="md:hidden block" href={"/create"}>
              <div className="w-full rounded-[4px] bg-gradient-to-tr from-[#1E2229] via-accent to-[#1E2229] hover:shadow-center hover:shadow-accent duration-300 p-[1px] md:mb-0 mb-2">
                <div className="relative flex flex-row h-full w-full rounded-[4px] items-center bg-base-100 justify-between md:p-5 py-2">
                  <img
                    src="/placeholders/levitate.png"
                    className="absolute opacity-70 z-[20] left-0 -bottom-[10px] h-[125px]"
                  />
                  <div className="w-full z-30 flex flex-col justify-center items-center">
                    <p className="md:text-6xl text-3xl font-bold hero-title mb-2 pb-0 mx-auto banner-neon tracking-wider">
                      PEPETUALS
                    </p>
                    <div className="bg-black bg-opacity-5">
                      <p className="md:text-4xl text-xl text-accent font-bold tracking-wider mb-2  p-0 m-0">
                        A GoodEntry Saga
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="w-2/3 z-10 md:block hidden rounded-[4px] bg-gradient-to-tr from-[#1E2229] via-accent to-[#1E2229] hover:shadow-center hover:shadow-accent duration-300 p-[1px] md:mb-0 mb-2">
              <div className="relative flex flex-row h-full w-full rounded-[4px] items-center bg-base-100 justify-between md:p-2 py-2 back">
                <img
                  src="/placeholders/levitate.png"
                  className="absolute banner-image-levitate z-[20] -left-3 -bottom-[20px] h-[250px] pointer-events-none"
                />
                {/* <img
                  src="/placeholders/banner3.svg"
                  className="absolute banner-image-shadow z-[19] left-0 -bottom-[20px] h-[250px] pointer-events-none"
                /> */}
                <div className="w-full z-30 flex flex-col justify-center items-center">
                  <p className="md:text-6xl text-3xl font-bold hero-title mb-2 pb-0 mx-auto banner-neon tracking-wider pointer-events-none">
                    PEPETUALS
                  </p>
                  <p className="md:text-4xl text-xl text-accent font-bold tracking-wider mb-6 pb-0 mx-auto pointer-events-none">
                    A GoodEntry Saga
                  </p>
                  <div className="relative md:inline-flex hidden group w-[300px]">
                    <div className="absolute transitiona-all duration-1000 opacity-70  w-[300px] -inset-px bg-gradient-to-b from-accent via-accent to-accent rounded-[4px] blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                    <a
                      href="/create"
                      title="Create your tokenn"
                      className="relative w-[300px] inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white tracking-wider transition-all duration-200 bg-accent font-pj rounded-[4px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      role="button"
                    >
                      CREATE A TOKEN
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="md:w-1/3 w-full flex md:flex-col flex-row md:mb-0 mb-2 md:gap-2 gap-1">
            <MemeOfTheHillCard width={width} />
            <JackpotCard width={width} />
          </div>
        </div>
        <div className={`w-full md:mb-0 mb-2`}>
          <LastTradesList />
        </div>
      </div>
      <div className={`max-w-1/2`}>
        <TokenList />
      </div>
    </div>
  );
};

export default Home;
