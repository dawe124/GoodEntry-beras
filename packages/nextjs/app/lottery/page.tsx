"use client";

import { redirect } from "next/navigation";
import type { NextPage } from "next";
import { LotteryPage } from "~~/components/beras/LotteryPage";

// @ts-ignore
const Lottery: NextPage = ({}) => {
  redirect("/");

  return (
    <div className="w-full gap-5">
      <LotteryPage />
    </div>
  );
};

export default Lottery;
