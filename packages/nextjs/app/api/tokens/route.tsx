import { NextResponse } from "next/server";
import Token from "~~/models/Token";
import { connectToDB } from "~~/utils/db/connectToDB";

type TokenData = {
  _id: string;
  name: string;
  symbol: string;
  creator: string;
  icon: string;
  description: string;
  creation_date: number;
  last_trade: number;
};

export async function GET(req: any) {
  await connectToDB();
  try {
    const searchQuery = {};

    // @ts-ignore
    const { searchParams } = new URL(req.url);
    const addressQuery = searchParams.get("address");

    if (addressQuery && addressQuery !== "null") {
      // @ts-ignore
      searchQuery.address = addressQuery;
    }

    const token: TokenData[] | null = await Token.find(searchQuery);

    const response: object = {};
    // @ts-ignore
    response.token = token;

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
