import React, { useState, useMemo } from 'react'
import TeamMemberEditor from '../../components/cms/TeamMemberEditor'

const TeamsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [sortOption, setSortOption] = useState('newest')
  const [isEditing, setIsEditing] = useState(false)
  const [selectedTeamMember, setSelectedTeamMember] = useState(null)
  
  // Sample team members data: Todo: Replace with actual data from API
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Emma Chen',
      email: 'emma.chen@example.com',
      phone: '(555) 123-4567',
      role: 'super_admin',
      joinDate: '2024-10-15'
    },
    {
      id: 2,
      name: 'Miguel Rodriguez',
      email: 'miguel.r@example.com',
      phone: '(555) 234-5678',
      role: 'admin',
      joinDate: '2024-08-22'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(555) 345-6789',
      role: 'super_admin',
      joinDate: '2024-07-10'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@example.com',
      phone: '(555) 456-7890',
      role: 'admin',
      joinDate: '2024-10-01'
    },
    {
      id: 5,
      name: 'Lisa Patel',
      email: 'lisa.p@example.com',
      phone: '(555) 567-8901',
      role: 'admin',
      joinDate: '2024-09-15'
    }
  ])

  // Color scheme for different roles
  const roleColors = {
    super_admin: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      badge: 'bg-red-100 text-red-800'
    },
    admin: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      badge: 'bg-blue-100 text-blue-800'
    }
  }

  // Memoized filtering and sorting
  const filteredAndSortedTeamMembers = useMemo(() => {
    // First, filter team members
    const filtered = teamMembers.filter(teamMember => {
      const matchesSearch = searchQuery === '' || 
        teamMember.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teamMember.email.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesRole = filterRole === 'all' || teamMember.role === filterRole
      
      return matchesSearch && matchesRole
    });

    // Then, sort team members
    return filtered.sort((a, b) => {
      const dateA = new Date(a.joinDate);
      const dateB = new Date(b.joinDate);
      
      return sortOption === 'newest' 
        ? dateB.getTime() - dateA.getTime() 
        : dateA.getTime() - dateB.getTime();
    });
  }, [teamMembers, searchQuery, filterRole, sortOption]);

  const handleEditClick = (teamMember) => {
    setSelectedTeamMember(teamMember);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setSelectedTeamMember(null);
    setIsEditing(true);
  };

  const handleSave = (teamMemberData) => {
    if (teamMemberData.id) {
      // Update existing team member
      setTeamMembers(teamMembers.map(u => 
        u.id === teamMemberData.id ? teamMemberData : u
      ));
    } else {
      // Add new team member
      const newTeamMember = {
        ...teamMemberData,
        id: teamMembers.length > 0 ? Math.max(...teamMembers.map(u => u.id)) + 1 : 1
      };
      setTeamMembers([...teamMembers, newTeamMember]);
    }
    setIsEditing(false);
    setSelectedTeamMember(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setTeamMembers(teamMembers.filter(teamMember => teamMember.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedTeamMember(null);
  };

  // Show editor when adding/editing
  if (isEditing) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedTeamMember ? 'Edit Team Member' : 'Add New Team Member'}
          </h1>
          <p className="text-gray-600">
            {selectedTeamMember ? 'Update team member information' : 'Create a new team member record'}
          </p>
        </div>
        
        <TeamMemberEditor 
          teamMember={selectedTeamMember} 
          onSave={handleSave} 
          onCancel={handleCancel} 
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
        <p className="text-gray-600">Manage team member information</p>
      </div>

      {/* Actions */}
      <div className="mb-6">
        <button 
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={handleAddNew}
        >
          Add New Team Member
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search team members..."
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
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
            </select>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team Member
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedTeamMembers.length > 0 ? (
              filteredAndSortedTeamMembers.map((teamMember) => (
                <tr key={teamMember.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full ${roleColors[teamMember.role].bg} flex items-center justify-center`}>
                        <span className={`${roleColors[teamMember.role].text} font-medium`}>{teamMember.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{teamMember.name}</div>
                        <div className="text-sm text-gray-500">{teamMember.email}</div>
                        <div className="text-sm text-gray-500">{teamMember.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${roleColors[teamMember.role].badge} capitalize`}>
                      {teamMember.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">
                      {new Date(teamMember.joinDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => handleEditClick(teamMember)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(teamMember.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No team members found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeamsPage