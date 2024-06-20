"use server";

import { connectToDB } from "./db/connectToDB";
import Token from "~~/models/Token";

interface SaveTokenToDbParams {
  _id: string;
  name: string;
  symbol: string;
  icon: string;
  creator: string;
  description: string;
  creation_date: number;
  last_trade: number;
}

interface SaveTokenToDbResult {
  message: "success" | "fail";
}

export const saveTokenToDb = async ({
  _id,
  name,
  symbol,
  icon,
  creator,
  description,
  creation_date,
  last_trade,
}: SaveTokenToDbParams): Promise<SaveTokenToDbResult> => {
  try {
    await connectToDB();
    await Token.create({
      _id,
      name,
      symbol,
      icon,
      creator,
      description,
      creation_date,
      last_trade,
    });

    return { message: "success" };
  } catch (e) {
    console.log(`Token failed to save to DB: ${e}`);
    return { message: "fail" };
  }
};
