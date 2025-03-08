import React, { useState } from 'react'

const DonationsPage = () => {
  const [dateRange, setDateRange] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  // Sample donations data
  const donations = [
    {
      id: 1,
      donor: 'John Smith',
      email: 'john.smith@example.com',
      amount: 250.00,
      date: '2024-10-12',
      paymentMethod: 'Credit Card',
      type: 'one-time',
      campaign: 'Earth Day 2025',
      status: 'completed'
    },
    {
      id: 2,
      donor: 'Maria Garcia',
      email: 'maria.g@example.com',
      amount: 50.00,
      date: '2024-10-10',
      paymentMethod: 'PayPal',
      type: 'monthly',
      campaign: 'General Fund',
      status: 'completed'
    },
    {
      id: 3,
      donor: 'Robert Johnson',
      email: 'robert.j@example.com',
      amount: 1000.00,
      date: '2024-10-05',
      paymentMethod: 'Bank Transfer',
      type: 'one-time',
      campaign: 'Community Garden Project',
      status: 'completed'
    },
    {
      id: 4,
      donor: 'Corporate Partner Inc.',
      email: 'sponsorship@corppartner.com',
      amount: 5000.00,
      date: '2024-09-28',
      paymentMethod: 'Check',
      type: 'sponsored',
      campaign: 'Youth Program Sponsorship',
      status: 'completed'
    },
    {
      id: 5,
      donor: 'Emily Wilson',
      email: 'emily.w@example.com',
      amount: 75.00,
      date: '2024-09-15',
      paymentMethod: 'Credit Card',
      type: 'monthly',
      campaign: 'General Fund',
      status: 'completed'
    }
  ]

  // Filter donations based on date range and type
  const filteredDonations = donations.filter(donation => {
    // Date filtering logic would go here
    // For demo purposes, we'll just return true for 'all'
    const dateMatch = dateRange === 'all' ? true : true
    
    // Filter by donation type
    const typeMatch = typeFilter === 'all' || donation.type === typeFilter
    
    return dateMatch && typeMatch
  })

  // Calculate total amount
  const totalAmount = filteredDonations.reduce((sum, donation) => sum + donation.amount, 0)
  
  // Get donation type badge
  const getDonationTypeBadge = (type) => {
    switch(type) {
      case 'one-time':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">One-time</span>
      case 'monthly':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Monthly</span>
      case 'sponsored':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Sponsored</span>
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{type}</span>
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
        <p className="text-gray-600">Track and manage incoming donations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">Total Donations</p>
              <p className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">Total Donors</p>
              <p className="text-2xl font-bold text-gray-900">{filteredDonations.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">Avg. Donation</p>
              <p className="text-2xl font-bold text-gray-900">
                ${(totalAmount / filteredDonations.length).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">Date Range</label>
              <select 
                id="dateRange"
                className="mt-1 border border-gray-300 rounded-md p-2"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="this_month">This Month</option>
                <option value="last_month">Last Month</option>
                <option value="this_year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700">Donation Type</label>
              <select 
                id="typeFilter"
                className="mt-1 border border-gray-300 rounded-md p-2"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="one-time">One-time</option>
                <option value="monthly">Monthly</option>
                <option value="sponsored">Sponsored</option>
              </select>
            </div>
          </div>
          
          <div>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Donor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDonations.map((donation) => (
              <tr key={donation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{donation.donor}</div>
                  <div className="text-sm text-gray-500">{donation.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">${donation.amount.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">{donation.paymentMethod}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(donation.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getDonationTypeBadge(donation.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donation.campaign}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Thank</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DonationsPage