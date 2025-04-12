import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [log, setLog] = useState([]);

  const logAction = (msg) => {
    console.log(msg);
    setLog((prev) => [...prev.slice(-19), msg]);
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('http://82.29.197.23:8000/leaderboard');
      const data = await res.json();
      setLeaderboard(data);
      logAction('✅ Leaderboard data fetched');
    } catch (err) {
      console.error('❌ Error fetching leaderboard data:', err);
      logAction('❌ Failed to fetch leaderboard');
    }
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      while (isMounted) {
        logAction('🔁 Fetching fresh leaderboard data...');
        await fetchLeaderboard();
        await new Promise((res) => setTimeout(res, 10000));
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="leaderboard-container">
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Net Worth</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry) => (
                <tr key={entry.user_id}>
                  <td>{entry.user_id}</td>
                  <td>${entry.networth.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer log section */}
      <footer className="footer-log">
        <div className="logs">
          <h3>Logs</h3>
          <ul style={{ fontSize: '0.9rem', listStyle: 'none', paddingLeft: 0 }}>
            {log.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}