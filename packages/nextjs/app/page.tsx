"use client";

import type { NextPage } from "next";
import { TokenList } from "~~/components/beras/TokenList";

const Home: NextPage = () => {
  return (
    <div className="overflow-y-hidden h-[calc(100vh-80px)]">
      <div className="flex flex-row md:pt-5 min-h-full">
        <div
          className={`w-full h-[calc(100vh-140px)] md:block md:h-[calc(100vh-100px)] border-red-200 overflow-y-auto md:w-9/12`}
        >
          <TokenList />
        </div>
      </div>
    </div>
  );
};

export default Home;
