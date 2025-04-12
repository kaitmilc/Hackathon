// TradeChart.tsx
import React from 'react';
import { TradeDataPoint } from '../../server/types';

interface TradeChartProps {
  data: TradeDataPoint[];
}

const TradeChart: React.FC<TradeChartProps> = ({ data }) => {
  return (
    <div>
      <h2>Trade Chart</h2>
      {data.length === 0 && <p>No trade data available</p>}
      {data.map((point, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <strong>{point.time}</strong>: Current Price: {point.currentPrice}, MA: {point.movingAverage}, Action: {point.action}
        </div>
      ))}
    </div>
  );
};

export default TradeChart;
