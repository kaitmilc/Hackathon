import React, { useState } from 'react';
import './App.css';
import { triggerTrade } from '../src/services/api';

function App() {
  const [symbol, setSymbol] = useState('AAPL');
  const [token, setToken] = useState('');
  const [result, setResult] = useState('');

  const handleTrade = async () => {
    try {
      const response = await triggerTrade(symbol, token);
     // setResult(`Action: ${response.action}`);
    } catch (err) {
      setResult('Error: Could not complete trade.');
    }
  };

  return (
    <div className="App">
      <h1>Trading Bot</h1>
      <div>
        <input
          type="text"
          placeholder="Stock symbol (e.g. AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <button onClick={handleTrade}>Run Strategy</button>
      <p>{result}</p>
    </div>
  );
}

export default App;
