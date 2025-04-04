import { CoinGeckoCoin, CoinGeckoPrice } from "~/types/crypto";

const apiKey = process.env.COINGECKO_API_KEY;
const apiUrl = process.env.COINGECKO_API_URL;

if (!apiKey || !apiUrl) {
  throw new Error("Missing CoinGecko API configuration");
}

export async function getCoinsList(): Promise<CoinGeckoCoin[]> {
  const response = await fetch(`${apiUrl}/coins/list`, {
    headers: {
      "x-cg-demo-api-key": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch coins list: ${response.statusText}`);
  }

  return response.json();
}

export async function getCoinPrices(coinIds: string[]): Promise<Record<string, CoinGeckoPrice>> {
  const response = await fetch(
    `${apiUrl}/simple/price?ids=${coinIds.join(",")}&vs_currencies=usd,btc&include_24hr_change=true&include_last_updated_at=true`,
    {
      headers: {
        "x-cg-demo-api-key": apiKey,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch prices: ${response.statusText}`);
  }

  return response.json();
} 