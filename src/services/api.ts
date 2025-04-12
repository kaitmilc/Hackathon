export const triggerTrade = async (symbol: string, user_id: number) => {
  const res = await fetch(`http://localhost:3001/trade/${symbol}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, symbol }),
  });

  if (!res.ok) throw new Error('Trade failed');
  return await res.json();
};
