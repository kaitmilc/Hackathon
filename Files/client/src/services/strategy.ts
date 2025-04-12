import { StockData } from '../utils/types';

const calculateMovingAverage = (prices: number[], period: number): number => {
  if (prices.length < period) return NaN;
  const relevant = prices.slice(-period); // Last N prices
  const sum = relevant.reduce((acc, price) => acc + price, 0);
  return sum / period;
};

export const evaluateTrade = (prices: number[], latestData: StockData): string => {
  const movingAverage = calculateMovingAverage(prices, 5); // 5-period average
  const currentPrice = latestData.price;
  const { volume, volatility, liquidity } = latestData;

  const minVolume = 1000;
  const maxVolatility = 0.05;
  const minLiquidity = 100;

  if (
    currentPrice < movingAverage * 0.98 &&
    volume > minVolume &&
    volatility < maxVolatility &&
    liquidity > minLiquidity
  ) {
    return 'BUY';
  }

  if (
    currentPrice > movingAverage * 1.03 &&
    volume > minVolume &&
    volatility < maxVolatility &&
    liquidity > minLiquidity
  ) {
    return 'SELL';
  }

  return 'HOLD';
};
