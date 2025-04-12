import { StockData } from './types';

const calculateMovingAverage = (prices: number[], period: number): number => {
  if (prices.length < period) return NaN;
  const relevant = prices.slice(-period);
  const sum = relevant.reduce((acc, price) => acc + price, 0);
  return sum / period;
};

const calculateEMA = (prices: number[], period: number): number => {
  const k = 2 / (period + 1);
  return prices.reduce((ema, price, index) => {
    if (index === 0) return price;
    return price * k + ema * (1 - k);
  }, prices[0]);
};

export const evaluateTrade = (prices: number[], latest: StockData, history: StockData[]): string => {
  // Calculate the simple moving average over the last 5 data points
  const movingAverage = calculateMovingAverage(prices, 5);
  const currentPrice = latest.price;

  // Compute averages from history for more adaptive thresholds:
  const volumeValues = history.map(h => h.volume).filter(v => v !== null && v !== undefined);
  const volatilityValues = history.map(h => h.volatility).filter(v => v !== null && v !== undefined);

  const averageVolume = volumeValues.reduce((sum, v) => sum + v, 0) / volumeValues.length;
  const averageVolatility = volatilityValues.reduce((sum, v) => sum + v, 0) / volatilityValues.length;

  console.log('currentPrice:', currentPrice);
  console.log('movingAverage:', movingAverage);

  // Define your trading thresholds based on averages:
  // For instance, you might want to buy if the current price is at least 2% below the moving average,
  // and the current volume is greater than the average volume (to confirm strength),
  // and volatility is sufficiently low compared to its average.
  if (
    currentPrice < movingAverage * 0.98 &&
    latest.volume > averageVolume &&
    latest.volatility < averageVolatility
  ) {
    return 'BUY';
  }

  // Similarly, sell if the current price is at least 3% above the moving average,
  // with high volume and low volatility relative to their averages.
  if (
    currentPrice > movingAverage * 1.03 &&
    latest.volume > averageVolume &&
    latest.volatility < averageVolatility
  ) {
    return 'SELL';
  }

  // Otherwise, hold
  return 'HOLD';
};
