import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import Navbar from './Navbar';
import StockPage from './StockPage';
import StockHistoryPage from './StockHistory';
import LeaderboardPage from './LeaderboardPage';
import PlaceOrderPage from './PlaceOrder';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes> {/* Replace Switch with Routes */}
        <Route path="/" element={<StockPage />} />
        <Route path="/Stock" element={<StockPage />} />
        <Route path="/History" element={<StockHistoryPage />} /> {/* Use element instead of component */}
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/PlaceOrder" element={<PlaceOrderPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;