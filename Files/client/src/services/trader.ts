import { fetchData } from '../utils/apiClient';
import { evaluateTrade } from './strategy';

export const runStrategy = async (symbol: string, token: string) => {
  const history = await fetchData(`/stocks/${symbol}/history`, 'GET', null, token);

  const prices = history.map((entry: any) => entry.price);
  const latest = history[history.length - 1]; // Most recent stock data

  const decision = evaluateTrade(prices, latest);

  if (decision === 'BUY') {
    await fetchData('/orders/', 'POST', { symbol, side: 'buy', price: latest.price }, token);
  } else if (decision === 'SELL') {
    await fetchData('/orders/', 'POST', { symbol, side: 'sell', price: latest.price }, token);
  }

  return decision;
};
