import { NextResponse } from "next/server";
import { ObjectId } from "mongoose";
import Trade from "~~/models/Trade";
import { connectToDB } from "~~/utils/db/connectToDB";

type TradeData = {
  _id: ObjectId;
  type: string | null;
  amount: string | null;
  value: string | null;
  date: number | null;
  tokenAddress: string | null;
  user: string | null;
  txHash: string | null;
};

export async function GET(req: Request) {
  await connectToDB();
  try {
    const searchQuery = {};

    let limit = 12;

    const { searchParams } = new URL(req.url);
    const limitQuery = searchParams.get("limit");

    if (limitQuery && limitQuery !== "null") {
      limit = Number(limitQuery);
    }

    const trades: TradeData[] = await Trade.find(searchQuery).sort({ date: -1 }).limit(limit).populate("tokenAddress");

    const response = {
      trades,
    };

    console.log(trades);

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
