
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface StockChartProps {
  data: ChartDataPoint[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-dark-text-secondary">Sem dados para exibir.</div>;
  }

  const chartData = data.map(d => ({
    ...d,
    price: Number(d.price.toFixed(2))
  }));

  const firstPrice = chartData[0].price;
  const lastPrice = chartData[chartData.length - 1].price;
  const strokeColor = lastPrice >= firstPrice ? '#10B981' : '#EF4444';

  const formatYAxis = (tick: number) => `$${tick.toFixed(2)}`;
  const formatXAxis = (tick: string) => {
    const date = new Date(tick);
    return date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-card p-4 border border-dark-border rounded-lg shadow-lg">
          <p className="label font-bold text-dark-text">{`${formatXAxis(label)}`}</p>
          <p className="intro text-dark-text-secondary">{`Preço: `}<span style={{ color: strokeColor }}>{`$${payload[0].value.toFixed(2)}`}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="date" 
          stroke="#9CA3AF" 
          tickFormatter={formatXAxis} 
          tick={{ fontSize: 12 }} 
        />
        <YAxis 
          stroke="#9CA3AF" 
          domain={['dataMin - 5', 'dataMax + 5']}
          tickFormatter={formatYAxis} 
          tick={{ fontSize: 12 }} 
          width={70}
        />
        <Tooltip content={<CustomTooltip />} />
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Line 
            type="monotone" 
            dataKey="price" 
            stroke={strokeColor} 
            strokeWidth={2} 
            dot={false}
            name="Preço"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
