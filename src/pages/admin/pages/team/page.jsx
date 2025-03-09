import React, { useState, useMemo, useEffect } from 'react';
import TeamMemberEditor from '../../components/cms/TeamMemberEditor';
import axios from 'axios';
import AddTeamMemberModal from '../../components/cms/add-team-member';
import EditTeamMemberModal from '../../components/cms/edit-team-member';
import DeleteTeamMemberModal from '../../components/cms/delete-team-member';
import Cookies from 'js-cookie';

const TeamsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  
  const [teamMembers, setTeamMembers] = useState([]);

  function openAddTeamMemberModal() {
    setIsOpen(true);
  }

  function closeAddTeamMemberModal() {
    setIsOpen(false);
  }

  function openEditTeamMemberModal(teamMember) {
    setSelectedTeamMember(teamMember);
    setIsEditing(true);
  }

  function closeEditTeamMemberModal() {
    setIsEditing(false);
  }

  function openDeleteTeamMemberModal(teamMember) {
    setSelectedTeamMember(teamMember);
    setIsDeleting(true);
  }

  function closeDeleteTeamMemberModal() {
    setIsDeleting(false);
  }

  const getTeamMembers = async () => {
    try {
      // Get the token from cookies based on role
      const superAdminToken = Cookies.get('super admin');
      const adminToken = Cookies.get('admin');
      const token = superAdminToken || adminToken;
      
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/admin/get-all-admins`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(data);
      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    getTeamMembers();
  }, []);

  const refreshTeamMemberList = async () => {
    await getTeamMembers();
  };

  // Color scheme for different roles
  const roleColors = {
    admin: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      badge: 'bg-blue-100 text-blue-800'
    },
    'super admin': {
      bg: 'bg-red-100',
      text: 'text-red-800',
      badge: 'bg-red-100 text-red-800'
    }
  };

  // Memoized filtering and sorting
  const filteredAndSortedTeamMembers = useMemo(() => {
    // First, filter team members
    const filtered = teamMembers.filter(teamMember => {
      const matchesSearch = searchQuery === '' || 
        (teamMember.firstName && teamMember.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (teamMember.lastName && teamMember.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (teamMember.email && teamMember.email.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesRole = filterRole === 'all' || teamMember.role === filterRole;
      
      return matchesSearch && matchesRole;
    });

    // Then, sort team members
    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
      return sortOption === 'newest' 
        ? dateB.getTime() - dateA.getTime() 
        : dateA.getTime() - dateB.getTime();
    });
  }, [teamMembers, searchQuery, filterRole, sortOption]);

  return (
    <div>
      <AddTeamMemberModal
        open={openAddTeamMemberModal}
        close={closeAddTeamMemberModal}
        isOpen={isOpen}
        refreshTeamMemberList={refreshTeamMemberList}
      />
      <EditTeamMemberModal
        open={openEditTeamMemberModal}
        close={closeEditTeamMemberModal}
        isOpen={isEditing}
        teamMember={selectedTeamMember}
        refreshTeamMemberList={refreshTeamMemberList}
      />
      <DeleteTeamMemberModal
        open={openDeleteTeamMemberModal}
        close={closeDeleteTeamMemberModal}
        isOpen={isDeleting}
        teamMember={selectedTeamMember}
        refreshTeamMemberList={refreshTeamMemberList}
      />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
        <p className="text-gray-600">Manage team member information</p>
      </div>

      {/* Actions */}
      <div className="mb-6">
        <button 
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={openAddTeamMemberModal}
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
              <option value="super admin">Super Admin</option>
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
                <tr key={teamMember?._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full ${
                        roleColors[teamMember?.role]?.bg || 'bg-gray-100'
                      } flex items-center justify-center`}>
                        <span className={`${
                          roleColors[teamMember?.role]?.text || 'text-gray-800'
                        } font-medium`}>
                          {teamMember?.firstName?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {teamMember?.firstName} {teamMember?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {teamMember?.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {teamMember?.phoneNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      roleColors[teamMember?.role]?.badge || 'bg-gray-100 text-gray-800'
                    } capitalize`}>
                      {teamMember?.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">
                      {new Date(teamMember?.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => openEditTeamMemberModal(teamMember)}
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => openDeleteTeamMemberModal(teamMember)}
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
  );
};

export default TeamsPage;