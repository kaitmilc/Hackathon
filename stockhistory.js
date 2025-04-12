import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from 'recharts';
import './StockPage.css';

const StockHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [log, setLog] = useState([]);

  const logAction = (msg) => {
    console.log(msg);
    setLog((prev) => [...prev.slice(-19), msg]);
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://82.29.197.23:8000/stocks/HACK/history');
      const data = await res.json();
      setHistory(data);
      logAction('✅ History fetched');
    } catch (err) {
      console.error('❌ Error in fetchHistory:', err);
      logAction('❌ Failed to fetch history');
    }
  };

  useEffect(() => {
    fetchHistory(); // Initial fetch
    const intervalId = setInterval(fetchHistory, 10000); // Fetch every 10s
    return () => clearInterval(intervalId);
  }, []);

  // Sort data from oldest to newest
  const chartData = history
    .slice()
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((stock) => ({
      timestamp: new Date(stock.timestamp * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      price: stock.price,
    }));

  return (
    <div className="stock-container">
      <h1>
        <span role="img" aria-label="chart">📉</span> Stock History
      </h1>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="logs">
        <h3>📜 Logs</h3>
        <ul style={{ fontSize: '0.9rem', listStyle: 'none', paddingLeft: 0 }}>
          {log.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StockHistoryPage;