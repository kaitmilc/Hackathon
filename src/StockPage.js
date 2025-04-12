import React, { useState, useEffect } from 'react';
import './StockPage.css';

export default function StockPage() {
  const [stocks, setStocks] = useState([]);
  const [log, setLog] = useState([]);

  const symbol = 'HACK';
  const user_id = '4';
  const password = 'milcymilcmilc';

  const logAction = (msg) => {
    console.log(msg);
    setLog((prev) => [...prev.slice(-19), msg]);
  };

  const runStrategy = async (symbol, userId, password) => {
    try {
      const res = await fetch('http://82.29.197.23:8000/stocks');
      const data = await res.json();
      setStocks(data);
      return '✅ Data updated';
    } catch (err) {
      console.error('Error in runStrategy:', err);
      return 'Failed to fetch';
    }
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      while (isMounted) {
        logAction(`🔁 Fetching fresh data for ${symbol}...`);

        const action = await runStrategy(symbol, user_id, password);

        logAction(`🔧 Action: ${action}`);

        await new Promise((res) => setTimeout(res, 10000));
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="stock-container">
      <h1>Stock Tracker</h1>
      <div className="stock-grid">
        {stocks.map((stock, idx) => (
          <div
            key={idx}
            className={`stock-card ${stock.symbol === 'HACK' ? 'hack' : ''}`}
          >
            <h2>{stock.symbol}</h2>
            <p>Price: ${stock.price.toFixed(2)}</p>
            <p>Volume: {stock.volume}</p>
            <p>Volatility: {stock.volatility}</p>
            <p>Liquidity: {stock.liquidity}</p>
            <p style={{ fontSize: '0.8rem', color: 'gray' }}>
              Timestamp: {new Date(stock.timestamp * 1000).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="logs">
        <h3>Logs</h3>
        <ul style={{ fontSize: '0.9rem', listStyle: 'none', paddingLeft: 0 }}>
          {log.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
