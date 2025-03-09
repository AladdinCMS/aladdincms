import React, { useState, useEffect, useMemo } from 'react'
import DonationCharts from '../../components/cms/DonationCharts'
import axios from 'axios' // Make sure to install axios

const DonationsPage = () => {
  const [dateRange, setDateRange] = useState('all')
  const [sortOption, setSortOption] = useState('newest')
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [donations, setDonations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    totalAmount: 0,
    totalDonations: 0,
    avgDonation: 0
  })
  
  // Fetch donations and stats on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Fetch donations
        const donationsResponse = await axios.get('http://localhost:3000/api/v1/donations')
        setDonations(donationsResponse.data)
        
        // Fetch donation stats
        const statsResponse = await axios.get('http://localhost:3000/api/v1/donations/stats')
        setStats(statsResponse.data)
        
        setError(null)
      } catch (err) {
        console.error('Error fetching donation data:', err)
        setError('Failed to load donation data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Memoized filtered and sorted donations
  const filteredAndSortedDonations = useMemo(() => {
    const now = new Date()
    
    // First, filter donations based on date range
    const filtered = donations.filter(donation => {
      const donationDate = new Date(donation.date)
      
      if (dateRange === 'all') return true
      
      if (dateRange === 'this_month') {
        return donationDate.getMonth() === now.getMonth() && 
               donationDate.getFullYear() === now.getFullYear()
      }
      
      if (dateRange === 'last_month') {
        const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1
        const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
        return donationDate.getMonth() === lastMonth && 
               donationDate.getFullYear() === lastMonthYear
      }
      
      if (dateRange === 'this_year') {
        return donationDate.getFullYear() === now.getFullYear()
      }
      
      return true
    })

    // Then, sort donations
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      
      return sortOption === 'newest' 
        ? dateB.getTime() - dateA.getTime() 
        : dateA.getTime() - dateB.getTime()
    })
  }, [donations, dateRange, sortOption])

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

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-500">Loading donation data...</p>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    )
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
              <p className="text-2xl font-bold text-gray-900">£{stats.totalAmount.toFixed(2)}</p>
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
              <p className="text-2xl font-bold text-gray-900">{stats.totalDonations}</p>
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
              £{stats.avgDonation.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Charts */}
      <DonationCharts donationsData={donations} />

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
              <label htmlFor="sortOption" className="block text-sm font-medium text-gray-700">Sort By</label>
              <select
                id="sortOption"
                className="mt-1 border border-gray-300 rounded-md p-2"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
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
            {filteredAndSortedDonations.length > 0 ? (
              filteredAndSortedDonations.map((donation) => (
                <tr key={donation._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{donation.name}</div>
                    <div className="text-sm text-gray-500">
                      {donation.email !== 'anonymous' ? donation.email : 'Anonymous'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">£{donation.amount.toFixed(2)}</div>
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No donations found for the selected time period.
                </td>
              </tr>
            )}
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
                <div className="font-medium text-green-600">£{selectedDonation.amount.toFixed(2)}</div>
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