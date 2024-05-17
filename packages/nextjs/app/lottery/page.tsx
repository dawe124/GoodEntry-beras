"use client";

import type { NextPage } from "next";
import { LotteryPage } from "~~/components/beras/LotteryPage";

// @ts-ignore
const Lottery: NextPage = ({}) => {
  return (
    <div className="w-full gap-5">
      <LotteryPage />
    </div>
  );
};

export default Lottery;
