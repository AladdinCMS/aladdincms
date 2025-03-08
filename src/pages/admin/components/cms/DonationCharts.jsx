import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DonationCharts = () => {
  // Sample data for donations over time
  const monthlyData = [
    { name: 'Jan', amount: 4200 },
    { name: 'Feb', amount: 3800 },
    { name: 'Mar', amount: 5100 },
    { name: 'Apr', amount: 4700 },
    { name: 'May', amount: 6200 },
    { name: 'Jun', amount: 5800 },
    { name: 'Jul', amount: 5400 },
    { name: 'Aug', amount: 6100 },
    { name: 'Sep', amount: 7300 },
    { name: 'Oct', amount: 6375 },
  ];

  // Sample data for donation amounts distribution
  const donationSizeData = [
    { name: 'Under $50', count: 45 },
    { name: '$50-$100', count: 32 },
    { name: '$101-$500', count: 18 },
    { name: 'Over $500', count: 5 },
  ];

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Donations over time chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Donations Over Time</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`$${value}`, 'Amount']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                name="Monthly Donations"
                stroke="#22c55e"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donation size distribution */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Donation Size Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donationSizeData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="name"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {donationSizeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} donations`]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DonationCharts;