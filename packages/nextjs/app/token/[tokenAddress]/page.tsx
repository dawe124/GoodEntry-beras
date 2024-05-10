"use client";

import type { NextPage } from "next";
import { TokenPage } from "~~/components/beras/TokenPage";

// @ts-ignore
const Token: NextPage = ({ params: { tokenAddress } }) => {
  return (
    <>
      <TokenPage tokenAddress={tokenAddress} />
    </>
  );
};

export default Token;
