import { NextResponse } from "next/server";
import Token from "~~/models/Token";
import { connectToDB } from "~~/utils/db/connectToDB";

type TokenData = {
  _id: string;
  name: string;
  symbol: string;
  icon: string;
};

export async function GET(req: any) {
  await connectToDB();
  try {
    const searchQuery = {};

    // @ts-ignore
    const { searchParams } = new URL(req.url);
    const nameQuery = searchParams.get("token");

    if (nameQuery && nameQuery !== "null") {
      // @ts-ignore
      searchQuery.$or = [
        { _id: { $regex: nameQuery } },
        { name: { $regex: nameQuery } },
        { symbol: { $regex: nameQuery } },
      ];
    }

    const tokens: TokenData[] | null = await Token.find(searchQuery).select("_id name symbol icon").limit(6);

    const response: object = {};
    // @ts-ignore
    response.tokens = tokens;

    // console.log(response)

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
