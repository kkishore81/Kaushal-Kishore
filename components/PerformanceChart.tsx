

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartDataPoint } from '../types';

interface PerformanceChartProps {
  data: ChartDataPoint[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  const isPositive = data[data.length - 1].value >= data[0].value;
  const strokeColor = isPositive ? '#34D399' : '#F87171'; // Emerald-400 or Red-400

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4}/>
            <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip 
            contentStyle={{ 
                backgroundColor: '#374151', // gray-700
                border: '1px solid #4B5563', // gray-600
                borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#D1D5DB' }} // gray-300
            itemStyle={{ color: strokeColor }}
        />
        <Line type="monotone" dataKey="value" stroke={strokeColor} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;