const TICKERS_URL = "https://api.lasberas.com/berachain_testnet/tokens.json";

// QUERY AND PARSE EXISTING TICKERS FOR CHAT
export const getTickers = async () => {
  const response = await fetch(TICKERS_URL, {
    cache: "no-store",
    // next: { revalidate: 900 } // 15m
  });

  const results = await response.json();

  const tickersList: any = {};

  for (const key in results) {
    tickersList[`$${results[key].symbol}`] = {
      symbol: `${results[key].symbol}`,
      address: `${results[key].address}`,
    };
  }

  return tickersList;
};
