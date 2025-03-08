import React, { useState } from 'react'
import DonationCharts from '../../components/cms/DonationCharts'

const DonationsPage = () => {
  const [dateRange, setDateRange] = useState('all')
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  
  // Sample donations data with simplified structure
  const donations = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      amount: 250.00,
      date: '2024-10-12',
      message: 'Happy to support your cause!'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.g@example.com',
      amount: 50.00,
      date: '2024-10-10',
      message: 'Keep up the good work'
    },
    {
      id: 3,
      name: 'Anonymous',
      email: 'anonymous',
      amount: 1000.00,
      date: '2024-10-05',
      message: 'For the Community Garden Project'
    },
    {
      id: 4,
      name: 'Corporate Partner Inc.',
      email: 'sponsorship@corppartner.com',
      amount: 5000.00,
      date: '2024-09-28',
      message: 'Supporting the Youth Program'
    },
    {
      id: 5,
      name: 'Anonymous',
      email: 'anonymous',
      amount: 75.00,
      date: '2024-09-15',
      message: ''
    }
  ]

  // Filter donations based on date range
  const filteredDonations = donations.filter(donation => {
    // Date filtering logic would go here
    // For demo purposes, we'll just return true for 'all'
    return dateRange === 'all' ? true : true
  })

  // Handle viewing a donation
  const handleViewDonation = (donation) => {
    setSelectedDonation(donation)
    setIsViewModalOpen(true)
  }

  // Close the view modal
  const closeViewModal = () => {
    setIsViewModalOpen(false)
    setSelectedDonation(null)
  }

  // Calculate total amount
  const totalAmount = filteredDonations.reduce((sum, donation) => sum + donation.amount, 0)

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

      {/* Donation Charts */}
      <DonationCharts />

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
                Message
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
                  <div className="text-sm font-medium text-gray-900">{donation.name}</div>
                  <div className="text-sm text-gray-500">
                    {donation.email !== 'anonymous' ? donation.email : 'Anonymous'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">${donation.amount.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(donation.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {donation.message || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    onClick={() => handleViewDonation(donation)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Donation View Modal */}
      {isViewModalOpen && selectedDonation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Donation Details</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={closeViewModal}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-2">
              <div className="border-b pb-2 mb-2">
                <div className="text-sm text-gray-500">Donor</div>
                <div className="font-medium">{selectedDonation.name}</div>
              </div>
              
              <div className="border-b pb-2 mb-2">
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">
                  {selectedDonation.email !== 'anonymous' ? selectedDonation.email : 'Anonymous'}
                </div>
              </div>
              
              <div className="border-b pb-2 mb-2">
                <div className="text-sm text-gray-500">Amount</div>
                <div className="font-medium text-green-600">${selectedDonation.amount.toFixed(2)}</div>
              </div>
              
              <div className="border-b pb-2 mb-2">
                <div className="text-sm text-gray-500">Date</div>
                <div className="font-medium">{new Date(selectedDonation.date).toLocaleDateString()}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Message</div>
                <div className="font-medium whitespace-pre-wrap">
                  {selectedDonation.message || 'No message provided'}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={closeViewModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DonationsPage