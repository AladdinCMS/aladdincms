import React, { useState } from 'react'
import ContentCard from '../../../components/cms/ContentCard'
import ProgrammeEditor from '../../../components/cms/ProgrammeEditor'

const ProgrammesPage = () => {
  const [showEditor, setShowEditor] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [locationFilter, setLocationFilter] = useState('All Locations')
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [programmeToDelete, setProgrammeToDelete] = useState(null)
  
  // Sample programmes data with multiple tickets
  const [programmes, setProgrammes] = useState([
    { 
      id: 2, 
      title: 'Summer Workshop Series', 
      type: 'programme', 
      date: '2025-03-01',
      lastModified: 'Mar 1, 2025',
      name: 'Summer Workshop Series',
      location: 'Community Center',
      ageRange: '8-14',
      details: 'Join us for a series of workshops focused on environmental education and sustainable crafts. Children will learn about recycling, composting, and renewable energy through fun, hands-on activities.',
      tickets: [
        {
          name: 'Standard Ticket',
          price: '£25.00',
          details: 'Includes all materials and a take-home project kit'
        },
        {
          name: 'Low Income Household Ticket',
          price: '£8.00',
          details: 'Subsidized rate for families from low-income households'
        },
        {
          name: 'Family Pass',
          price: '£60.00',
          details: 'Admits up to 3 children from the same family'
        }
      ]
    },
    { 
      id: 4, 
      title: 'Recycling Competition', 
      type: 'programme', 
      date: '2025-02-25',
      lastModified: 'Feb 25, 2025',
      name: 'Recycling Competition',
      location: 'City Park',
      ageRange: 'All ages',
      details: 'Participate in our community recycling competition with prizes for the most creative upcycled items and the largest amount of recycling collected.',
      tickets: [
        {
          name: 'Competition Entry',
          price: 'Free',
          details: 'Registration required by February 20th'
        },
        {
          name: 'Team Entry',
          price: '£5.00',
          details: 'For groups of up to 5 people competing together'
        }
      ]
    },
    { 
      id: 6, 
      title: 'Garden Volunteer Day', 
      type: 'programme', 
      date: '2025-02-15',
      lastModified: 'Feb 15, 2025',
      name: 'Garden Volunteer Day',
      location: 'Community Garden',
      ageRange: '16+',
      details: 'Help us maintain our community garden and learn about sustainable gardening practices. Tools and refreshments will be provided.',
      tickets: [
        {
          name: 'Standard Ticket',
          price: '£16.00',
          details: 'Place for one participant on a Green Volunteers day'
        },
        {
          name: 'Low Income Household Ticket',
          price: '£4.00',
          details: 'Subsidized ticket for participants from low-income households'
        }
      ]
    }
  ]);

  // Get unique locations for filter dropdown
  const locations = ['All Locations', ...new Set(programmes.map(p => p.location))];

  // Filter programmes based on location
  const filteredProgrammes = locationFilter === 'All Locations' 
    ? programmes 
    : programmes.filter(programme => programme.location === locationFilter);

  const handleEditClick = (programme) => {
    setEditingItem(programme)
    setShowEditor(true)
  }

  const handleDeleteClick = (programme) => {
    setProgrammeToDelete(programme)
    setShowDeleteConfirmation(true)
  }

  const confirmDelete = () => {
    if (programmeToDelete) {
      setProgrammes(prev => prev.filter(programme => programme.id !== programmeToDelete.id))
      setShowDeleteConfirmation(false)
      setProgrammeToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirmation(false)
    setProgrammeToDelete(null)
  }

  const handleSave = (data) => {
    // Check if we're updating an existing programme
    if (data.id) {
      setProgrammes(prev => 
        prev.map(prog => prog.id === data.id ? { ...data, title: data.name } : prog)
      );
    } else {
      // Adding a new programme
      const newProgramme = {
        ...data,
        id: Math.max(...programmes.map(p => p.id)) + 1,
        title: data.name,
        type: 'programme',
        lastModified: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      };
      setProgrammes(prev => [...prev, newProgramme]);
    }
    setShowEditor(false);
    setEditingItem(null);
  }

  const handleCancel = () => {
    setShowEditor(false)
    setEditingItem(null)
  }

  const handleLocationFilterChange = (e) => {
    setLocationFilter(e.target.value)
  }

  // Function to format tickets for display in content card
  const formatTicketsForDisplay = (tickets) => {
    if (!tickets || tickets.length === 0) return '';
    
    if (tickets.length === 1) {
      return `${tickets[0].name}: ${tickets[0].price}`;
    }
    
    return `${tickets.length} ticket options available`;
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Programmes</h1>
        <p className="text-gray-600">Manage events and activities</p>
      </div>

      {/* Action Buttons */}
      <div className="mb-6">
        <button
          onClick={() => {
            setEditingItem(null)
            setShowEditor(true)
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Create New Programme
        </button>
      </div>

      {/* Editor */}
      {showEditor && (
        <div className="mb-6">
          <ProgrammeEditor 
            programme={editingItem} 
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Search and Filter */}
      {!showEditor && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search programmes..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
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
                value={locationFilter}
                onChange={handleLocationFilterChange}
              >
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2">
                <option>Upcoming</option>
                <option>Past Events</option>
                <option>A-Z</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Content Grid */}
      {!showEditor && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProgrammes.length > 0 ? (
            filteredProgrammes.map((item) => (
              <div key={item.id}>
                <ContentCard
                  title={item.name}
                  type={item.type}
                  lastModified={item.lastModified}
                  details={`${item.location} • ${item.ageRange} • ${formatTicketsForDisplay(item.tickets)} • ${item.details.substring(0, 60)}...`}
                  onEdit={() => handleEditClick(item)}
                  onDelete={() => handleDeleteClick(item)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              No programmes found at this location.
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Programme</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete "{programmeToDelete?.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgrammesPage