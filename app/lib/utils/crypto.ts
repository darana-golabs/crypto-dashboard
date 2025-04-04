import { CoinGeckoCoin, CryptoCurrency } from "~/types/crypto";

const TARGET_SYMBOLS = ["BTC", "ETH", "BNB", "SOL", "XRP", "ADA", "AVAX", "DOGE", "DOT", "MATIC"];

export function filterTargetCoins(coins: CoinGeckoCoin[]): CoinGeckoCoin[] {
  return coins.filter((coin) => TARGET_SYMBOLS.includes(coin.symbol.toUpperCase()));
}

export function combineCoinData(
  coins: CoinGeckoCoin[],
  prices: Record<string, { usd: number; btc: number }>
): CryptoCurrency[] {
  return coins.map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    priceUsd: prices[coin.id]?.usd || 0,
    priceBtc: prices[coin.id]?.btc || 0,
  }));
} 