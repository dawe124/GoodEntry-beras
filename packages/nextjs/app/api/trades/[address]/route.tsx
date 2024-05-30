import { NextResponse } from "next/server";
import { ObjectId } from "mongoose";
import Trade from "~~/models/Trade";
import { connectToDB } from "~~/utils/db/connectToDB";

type TradeData = {
  _id: ObjectId;
  type: string;
  amount: string;
  value: string;
  date: number;
  tokenAddress: string;
  user: string;
  txHash: string;
};

export async function GET(req: any) {
  await connectToDB();
  try {
    const searchQuery = {};

    // @ts-ignore
    const { pathname } = new URL(req.url);

    const tokenAddress = pathname.split("/").at(-1);

    if (tokenAddress && tokenAddress !== undefined) {
      // @ts-ignore
      searchQuery.tokenAddress = tokenAddress;
    }

    const trades: TradeData[] | null = await Trade.find(searchQuery).sort({ date: -1 });

    const response: object = {};
    // @ts-ignore
    response.trades = trades;

    return NextResponse.json(response, {
      status: 200, // Set appropriate status code
      statusText: "OK",
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error });
    // res.status(500).send('Error fetching image');
  }
}
