export interface StockData {
  symbol: string;
  price: number;
  volume: number;
  volatility: number;
  liquidity: number;
  timestamp: number;
}

export interface TradeDataPoint {
  time: string;
  movingAverage: number;
  currentPrice: number;
  action: string;
}
