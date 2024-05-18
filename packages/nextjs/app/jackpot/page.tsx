"use client";

import type { NextPage } from "next";
import { JackpotPage } from "~~/components/beras/JackpotPage";

// @ts-ignore
const Jackpot: NextPage = ({}) => {
  return (
    <div className="w-full gap-5">
      <JackpotPage />
    </div>
  );
};

export default Jackpot;
