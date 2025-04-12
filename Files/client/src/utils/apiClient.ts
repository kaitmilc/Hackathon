const fetch = require('node-fetch'); // safer if not using esModuleInterop

const BASE_URL = 'http://82.29.197.23:8000';

export const fetchData = async (
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: any,
  token?: string
): Promise<any> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
};
