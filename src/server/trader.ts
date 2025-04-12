import axios from 'axios';
import { evaluateTrade } from './strategy';
import { StockData } from './types';
import fs from 'fs';

const BASE_URL = 'http://82.29.197.23:8000';

// Create a Basic Auth header value for a given user id and password
const getAuthHeader = (user_id: string, password: string): string => {
  return 'Basic ' + Buffer.from(`${user_id}:${password}`).toString('base64');
};

const login = async (user_id: string, password: string): Promise<boolean> => {
  try {
    // Send the login request including the Basic Auth header.
    const res = await axios.post(
      `${BASE_URL}/accounts/authenticate`,
      { user_id, password },
      { headers: { 'Authorization': getAuthHeader(user_id, password) } }
    );
    console.log('✅ Login successful');
    return true;
  } catch (err: any) {
    console.error('❌ Login failed:', err.response?.data || err.message);
    return false;
  }
};

export const runStrategy = async (symbol: string, user_id: string, password: string): Promise<string> => {
  // Log in (will include credentials for basic auth)
  const loggedIn = await login(user_id, password);
  if (!loggedIn) return 'LOGIN_FAILED';

  // Fetch historical data (for moving average calculation)
  const historyRes = await axios.get(`${BASE_URL}/stocks/${symbol}/history`, {
    params: { timeframe: '1m', limit: 5 },
    headers: { 'Authorization': getAuthHeader(user_id, password) }
  });
  const history = historyRes.data;
  const prices = history.map((entry: StockData) => entry.price);
  const latest: StockData = history[history.length - 1];

  console.log('🔍 Evaluating trade...');
  const decision = evaluateTrade(prices, latest, history);
  const side = decision.toLowerCase();

  // If a BUY or SELL decision is made, attempt to place the order
  if (side === 'buy' || side === 'sell') {
    const orderPayload = {
      user_id,
      symbol,
      side,
      quantity: 1,
      order_type: 'market',
      limit_price: 0
    };

    try {
      const orderRes = await axios.post(`${BASE_URL}/orders/`, orderPayload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthHeader(user_id, password)
        }
      });
      console.log(`✅ ${side.toUpperCase()} Order placed:`, orderRes.data);
    } catch (orderErr: any) {
      console.error(`❌ ${side.toUpperCase()} Order failed:`, orderErr.response?.data || orderErr.message);
    }
  } else {
    console.log(`🟡 Patience my child `);
  }

  return decision;
};

const logAction = (action: string) => {
  const log = `[${new Date().toISOString()}] ${action}\n`;
  fs.appendFileSync('trades.log', log);
};

(async () => {
  const symbol = 'HACK';
  const user_id = '4';
  const password = 'milcymilcmilc'; // Replace with your actual password

  while (true) {
    console.log(`Fetching fresh data for ${symbol}...`);
    const action = await runStrategy(symbol, user_id, password);
    logAction(`Action: ${action}`);
    await new Promise((res) => setTimeout(res, 1000));
  }
})();
