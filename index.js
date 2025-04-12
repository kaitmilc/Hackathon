const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS for requests from frontend (running on port 3000)
app.use(cors());

// Stock data API


// Sample message API
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/leaderboard', (req, res) => {
  const leaderboard = [
    { user_id: 1, networth: 25000 },
    { user_id: 2, networth: 18000 },
    { user_id: 3, networth: 15000 },
  ];
  res.json(leaderboard);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
