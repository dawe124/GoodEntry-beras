"use client";

import type { NextPage } from "next";
import { TokenPage } from "~~/components/beras/TokenPage";

// @ts-ignore
const Token: NextPage = ({ params: { tokenAddress } }) => {
  return (
    <div className="w-full gap-5">
      <TokenPage tokenAddress={tokenAddress} />
    </div>
  );
};

export default Token;
