import React, { useState } from 'react'
import VolunteerEditor from '../../components/cms/VolunteerEditor'

const VolunteersPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isEditing, setIsEditing] = useState(false)
  const [selectedVolunteer, setSelectedVolunteer] = useState(null)
  
  // Sample volunteers data - now in state so it can be updated (without hours)
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: 'Emma Chen',
      email: 'emma.chen@example.com',
      phone: '(555) 123-4567',
      status: 'active',
      joinDate: '2024-10-15',
      skills: ['Teaching', 'Gardening', 'Social Media']
    },
    {
      id: 2,
      name: 'Miguel Rodriguez',
      email: 'miguel.r@example.com',
      phone: '(555) 234-5678',
      status: 'active',
      joinDate: '2024-08-22',
      skills: ['Event Planning', 'Photography']
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(555) 345-6789',
      status: 'inactive',
      joinDate: '2024-07-10',
      skills: ['Fundraising', 'Writing', 'Graphic Design']
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@example.com',
      phone: '(555) 456-7890',
      status: 'pending',
      joinDate: '2024-10-01',
      skills: ['Web Development', 'Video Editing']
    },
    {
      id: 5,
      name: 'Lisa Patel',
      email: 'lisa.p@example.com',
      phone: '(555) 567-8901',
      status: 'active',
      joinDate: '2024-09-15',
      skills: ['Marketing', 'Public Speaking']
    }
  ])

  // Get all unique skills for filter dropdown
  const allSkills = [...new Set(volunteers.flatMap(volunteer => volunteer.skills))].sort();

  // Filter volunteers based on search and status
  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = searchQuery === '' || 
      volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      volunteer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = filterStatus === 'all' || volunteer.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
      case 'inactive':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Inactive</span>
      case 'pending':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>
    }
  }

  const handleEditClick = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setSelectedVolunteer(null);
    setIsEditing(true);
  };

  const handleSave = (volunteerData) => {
    if (volunteerData.id) {
      // Update existing volunteer
      setVolunteers(volunteers.map(v => 
        v.id === volunteerData.id ? volunteerData : v
      ));
    } else {
      // Add new volunteer
      const newVolunteer = {
        ...volunteerData,
        id: volunteers.length > 0 ? Math.max(...volunteers.map(v => v.id)) + 1 : 1
      };
      setVolunteers([...volunteers, newVolunteer]);
    }
    setIsEditing(false);
    setSelectedVolunteer(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this volunteer?')) {
      setVolunteers(volunteers.filter(volunteer => volunteer.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedVolunteer(null);
  };

  // Show editor when adding/editing
  if (isEditing) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedVolunteer ? 'Edit Volunteer' : 'Add New Volunteer'}
          </h1>
          <p className="text-gray-600">
            {selectedVolunteer ? 'Update volunteer information' : 'Create a new volunteer record'}
          </p>
        </div>
        
        <VolunteerEditor 
          volunteer={selectedVolunteer} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Volunteers</h1>
        <p className="text-gray-600">Manage volunteer information and assignments</p>
      </div>

      {/* Actions */}
      <div className="mb-6">
        <button 
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={handleAddNew}
        >
          Add New Volunteer
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search volunteers..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-2.5">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2">
              <option>All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Volunteers Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volunteer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVolunteers.length > 0 ? (
              filteredVolunteers.map((volunteer) => (
                <tr key={volunteer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-800 font-medium">{volunteer.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                        <div className="text-sm text-gray-500">{volunteer.email}</div>
                        <div className="text-sm text-gray-500">{volunteer.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {volunteer.skills.map(skill => (
                        <span key={skill} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusBadge(volunteer.status)}
                      <span className="ml-2 text-sm text-gray-500">
                        Since {new Date(volunteer.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => handleEditClick(volunteer)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(volunteer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No volunteers found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VolunteersPage