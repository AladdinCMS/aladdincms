import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const DonationCharts = () => {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({ totalDonations: 0, totalAmount: 0, avgDonation: 0 });
  const [monthlyData, setMonthlyData] = useState([]);
  const [donationSizeData, setDonationSizeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        // Fetch all donations
        const donationsResponse = await axios.get('http://localhost:3000/api/v1/donations');
        // Fetch donation stats
        const statsResponse = await axios.get('http://localhost:3000/api/v1/donations/stats');
        
        setDonations(donationsResponse.data);
        setStats(statsResponse.data);
        
        // Process the donations data
        processData(donationsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching donation data:', err);
        setError('Failed to load donation data. Please try again.');
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Process donations data to create charts data
  const processData = (donationsData) => {
    // Process monthly data
    const monthlyMap = new Map();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize months with zero amounts
    months.forEach(month => {
      monthlyMap.set(month, 0);
    });
    
    // Sum up donations by month
    donationsData.forEach(donation => {
      const date = new Date(donation.date);
      const month = months[date.getMonth()];
      monthlyMap.set(month, monthlyMap.get(month) + donation.amount);
    });
    
    // Convert map to array for the chart
    const monthlyDataArray = Array.from(monthlyMap, ([name, amount]) => ({ name, amount }));
    
    // Sort by month order
    monthlyDataArray.sort((a, b) => months.indexOf(a.name) - months.indexOf(b.name));
    
    setMonthlyData(monthlyDataArray);

    // Process donation size distribution
    const sizeDistribution = {
      'Under £50': 0,
      '£50-£100': 0,
      '£101-£500': 0,
      'Over £500': 0
    };

    donationsData.forEach(donation => {
      const amount = donation.amount;
      if (amount < 50) {
        sizeDistribution['Under £50']++;
      } else if (amount >= 50 && amount <= 100) {
        sizeDistribution['£50-£100']++;
      } else if (amount > 100 && amount <= 500) {
        sizeDistribution['£101-£500']++;
      } else {
        sizeDistribution['Over £500']++;
      }
    });

    // Convert to array for the chart
    const sizeDistributionArray = Object.entries(sizeDistribution).map(
      ([name, count]) => ({ name, count })
    );

    setDonationSizeData(sizeDistributionArray);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-500">Loading donation data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Donation Stats Summary */}
      <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 border rounded-lg">
            <h4 className="text-lg font-medium text-gray-600">Total Donations</h4>
            <p className="text-2xl font-bold text-green-600">{stats.totalDonations}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="text-lg font-medium text-gray-600">Total Amount</h4>
            <p className="text-2xl font-bold text-green-600">£{stats.totalAmount.toLocaleString()}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="text-lg font-medium text-gray-600">Average Donation</h4>
            <p className="text-2xl font-bold text-green-600">£{stats.avgDonation.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
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
                formatter={(value) => [`£${value.toLocaleString()}`, 'Amount']}
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
      
      {/* Recent donations */}
      <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Donations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.slice(0, 5).map((donation) => (
                <tr key={donation._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donation.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{donation.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(donation.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{donation.message || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationCharts;