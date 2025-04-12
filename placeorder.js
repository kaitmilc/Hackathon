import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

export default function PlaceOrderPage() {
  const navigate = useNavigate();
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState('buy');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://82.29.197.23:8000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol,
          quantity: parseFloat(quantity),
          type: orderType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      setSuccess(true);
      setSymbol('');
      setQuantity('');
      setOrderType('buy');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoBack = () => {
    navigate('/'); // Go back to the home page or other relevant page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Place Order</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="symbol">Stock Symbol</Label>
              <Input
                id="symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Order Type</Label>
              <select
                id="type"
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </div>
            <Button type="submit" className="w-full">
              Submit Order
            </Button>
          </form>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">
              ✅ Order placed successfully!
            </p>
          )}
          <Button onClick={handleGoBack} className="w-full mt-4">
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}