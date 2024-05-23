"use client";

import React, { useEffect, useRef, useState } from "react";
import { ColorType, CrosshairMode, IChartApi, ISeriesApi, LineStyle, Time, createChart } from "lightweight-charts";
import tailwindConfig from "~~/tailwind.config";

type Candlestick = {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
};

export const ChartLWC = ({ tokenAddress }: { tokenAddress: string }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi>();
  const candleSeries = useRef<ISeriesApi<"Candlestick">>();

  const [candlesHistory, setCandlesHistory] = useState<Candlestick[]>([]);
  const [theme, setTheme] = useState<string | null>("light");

  console.log(theme);

  useEffect(() => {
    const getTheme = typeof window !== "undefined" ? document.documentElement.getAttribute("data-theme") : "light";
    setTheme(getTheme);
  }, []);

  const chartBgColor = tailwindConfig.daisyui.themes[0][theme || "light"]?.["base-200"];
  const chartTextColor = tailwindConfig.daisyui.themes[0][theme || "light"]?.["neutral"];
  const chartUpColor = tailwindConfig.daisyui.themes[0][theme || "light"]?.["accent"];
  const chartDownColor = tailwindConfig.daisyui.themes[0][theme || "light"]?.["red-500"];
  const chartPriceBorder = tailwindConfig.daisyui.themes[0][theme || "light"]?.["base-300"];

  useEffect(() => {
    /*const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };*/
    if (chartContainerRef.current) {
      chart.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        // height: 600,
        layout: {
          background: { type: ColorType.Solid, color: chartBgColor },
          textColor: chartTextColor,
        },
        grid: {
          vertLines: { color: "#444" },
          horzLines: { color: "#444" },
        },
        timeScale: {
          borderColor: "rgba(197, 203, 206, 0.8)",
          timeVisible: true,
          barSpacing: 10,
        },
        crosshair: {
          mode: CrosshairMode.Normal,

          // Vertical crosshair line (showing Date in Label)
          vertLine: {
            color: "#C3BCDB44",
            style: LineStyle.Solid,
            labelBackgroundColor: chartUpColor,
          },

          // Horizontal crosshair line (showing Price in Label)
          horzLine: {
            color: chartTextColor,
            labelBackgroundColor: chartUpColor,
          },
        },
      });

      chart.current.addLineSeries({
        priceFormat: {
          type: "price",
          precision: 8,
          minMove: 0.00000001,
        },
      });

      //chart.current.timeScale().fitContent();
      candleSeries.current = chart.current.addCandlestickSeries();
      const fetchCandles = async () => {
        try {
          const response = await fetch(
            `https://api.lasberas.com/berachain_testnet/tokens/${tokenAddress.toLocaleLowerCase()}.json`,
          );
          const data = await response.json();
          const { candles } = data;
          if (candles) {
            const parsedTrades: Candlestick[] = candles.map((candle: any) => ({
              open: Number(candle.open),
              close: Number(candle.close),
              high: Number(candle.high),
              low: Number(candle.low),
              time: candle.time / 1000,
            }));
            console.log(parsedTrades);
            setCandlesHistory(parsedTrades);
          } else {
            setCandlesHistory([]);
          }
        } catch (error) {
          setCandlesHistory([]);
          console.error("Error fetching trade history:", error);
        }
      };
      fetchCandles();
    }

    return () => {
      chart.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (candleSeries.current) {
      // console.log(candlesHistory);

      candleSeries.current.setData(candlesHistory);

      candleSeries.current.applyOptions({
        wickUpColor: chartUpColor,
        upColor: chartUpColor,
        wickDownColor: chartDownColor,
        downColor: chartDownColor,
        borderVisible: false,
      });

      candleSeries.current.priceScale().applyOptions({
        borderColor: chartPriceBorder,
      });

      candleSeries.current.priceScale().applyOptions({
        autoScale: true,
        scaleMargins: {
          top: 0.1, // highest point of the series will be 70% away from the top
          bottom: 0.1,
        },
      });
    }
  }, [candlesHistory]);

  return <div className="rounded-[1rem] overflow-hidden h-[400px] md:mt-0 mt-2" ref={chartContainerRef} />;
};
