import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ThreatChart = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Threat Activity Trend
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Security threats over the last 7 days
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
            <XAxis
              dataKey="date"
              className="text-gray-600 dark:text-gray-400"
              fontSize={12}
            />
            <YAxis
              className="text-gray-600 dark:text-gray-400"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgb(31 41 55)',
                border: '1px solid rgb(75 85 99)',
                borderRadius: '0.5rem',
                color: 'white'
              }}
            />
            <Line
              type="monotone"
              dataKey="threats"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Total threats this week</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {data.reduce((sum, item) => sum + item.threats, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThreatChart;
