import { NextResponse } from "next/server";
import Candle from "~~/models/Candle";
import { connectToDB } from "~~/utils/db/connectToDB";

function getTimeframeDetails(timeframe: string): { value: number; unit: string } {
  const timeframeMap: { [key: string]: { value: number; unit: string } } = {
    "5m": { value: 5, unit: "minute" },
    "15m": { value: 15, unit: "minute" },
    "30m": { value: 30, unit: "minute" },
    "1h": { value: 1, unit: "hour" },
    "4h": { value: 4, unit: "hour" },
    "12h": { value: 12, unit: "hour" },
    "1d": { value: 1, unit: "day" },
    "3d": { value: 3, unit: "day" },
  };

  if (timeframe in timeframeMap) {
    return timeframeMap[timeframe];
  }

  return timeframeMap["5m"];
}

export async function GET(req: any) {
  await connectToDB();
  try {
    const searchQuery = {};
    let timeframeValue = 5;
    let timeframeUnit = "minute";

    // @ts-ignore
    const { pathname } = new URL(req.url);

    const tokenAddress = pathname.split("/").at(-1);

    if (tokenAddress && tokenAddress !== undefined) {
      // @ts-ignore
      searchQuery.tokenAddress = tokenAddress;
    }

    // @ts-ignore
    const { searchParams } = new URL(req.url);
    const timeframeQuery = searchParams.get("timeframe");

    if (timeframeQuery && timeframeQuery !== "null") {
      // @ts-ignore
      const { value, unit } = getTimeframeDetails(timeframeQuery);
      timeframeValue = value;
      timeframeUnit = unit;
    }

    const candles = await Candle.aggregate([
      {
        $match: {
          tokenAddress: tokenAddress,
        },
      },
      {
        $group: {
          _id: {
            ticker: "$ticker",
            time: {
              $dateTrunc: {
                date: "$time",
                unit: timeframeUnit,
                binSize: timeframeValue,
              },
            },
          },
          high: { $max: "$price" },
          low: { $min: "$price" },
          open: { $first: "$price" },
          close: { $last: "$price" },
        },
      },
      {
        $sort: {
          "_id.time": 1,
        },
      },
      {
        $addFields: {
          high: { $toDouble: "$high" },
          low: { $toDouble: "$low" },
          open: { $toDouble: "$open" },
          close: { $toDouble: "$close" },
          time: { $toLong: "$_id.time" },
        },
      },
      {
        $addFields: {
          time: { $divide: ["$time", 1000] },
        },
      },
      {
        $project: {
          _id: 0,
          // ticker: "$_id.ticker",
          time: 1,
          high: 1,
          low: 1,
          open: 1,
          close: 1,
        },
      },
    ]);

    const response: object = {};
    // @ts-ignore
    response.candles = candles;

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
