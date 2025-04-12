const fetch = require('node-fetch');

const BASE_URL = 'http://82.29.197.23:8000';

export const fetchData = async (
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: any,
  cookie?: string
): Promise<any> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(cookie && { Cookie: cookie })
    },
    ...(body && { body: JSON.stringify(body) })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ API error:', errorText);
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
};
