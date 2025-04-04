// CoinGecko API Response Types
export type CoinGeckoCoin = {
  id: string;
  symbol: string;
  name: string;
};

export type CoinGeckoPrice = {
  usd: number;
  btc: number;
};

// Application Types
export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  priceUsd: number;
  priceBtc: number;
}
