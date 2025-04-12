//import express from 'express';
//import cors from 'cors';
//import bodyParser from 'body-parser';
//import { runStrategy } from './trader';
//
//const app = express();
//const PORT = 3001;
//
//app.use(cors());
//app.use(bodyParser.json());
//
//// ✅ This is the correct way to call runStrategy in a route
//app.post('/trade/:symbol', async (req, res) => {
//  const symbol = req.params.symbol;
//  const { user_id, password } = req.body;
//
//  if (!user_id || !password) {
//    return res.status(400).json({ error: 'Missing user_id or password' });
//  }
//
//  try {
//    const action = await runStrategy(symbol, user_id, password);
//    return res.json({ action });
//  } catch (err: any) {
//    console.error('❌ Error in runStrategy:', err.message);
//    return res.status(500).json({ error: 'Strategy failed' });
//  }
//});
//
//app.listen(PORT, () => {
//  console.log(`✅ Server listening at http://localhost:${PORT}`);
//});
