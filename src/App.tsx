import React, { useState, useEffect } from 'react';
import './App.css';
import { triggerTrade } from '../src/services/api';

function App() {
  const [userId, setUserId] = useState('1');
  const [symbol, setSymbol] = useState('HACK');
  const [result, setResult] = useState('');
  const [autoMode, setAutoMode] = useState(false);

  const handleTrade = async () => {
    try {
      const response = await triggerTrade(symbol, parseInt(userId));
      setResult(`✅ Action: ${response.action}`);
    } catch (err) {
      setResult('❌ Error: Could not complete trade.');
    }
  };

  useEffect(() => {
    if (!autoMode) return;

    const interval = setInterval(() => {
      handleTrade();
    }, 10000);

    return () => clearInterval(interval);
  }, [autoMode, userId, symbol]);

  return (
    <div className="App">
      <div className="card">
        <h1>📈 Auto Trading Bot</h1>
        <input
          type="text"
          placeholder="User ID (e.g. 1)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Stock symbol (e.g. HACK)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
        <div className="buttons">
          <button className="run" onClick={handleTrade}>Run Once</button>
          <button className={autoMode ? 'stop' : 'auto'} onClick={() => setAutoMode(!autoMode)}>
            {autoMode ? '🛑 Stop Auto' : '🚀 Start Auto'}
          </button>
        </div>
        <p className="result">{result}</p>
      </div>
    </div>
  );
}

export default App;
