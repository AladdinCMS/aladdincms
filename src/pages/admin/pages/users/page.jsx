import React, { useState, useMemo, useEffect } from "react";
import UserEditor from "../../components/cms/UserEditor";
import axios from "axios";
import AddUserModal from "../../components/cms/add-users";
import EditUserModal from "../../components/cms/edit-user";
import DeleteUserModal from "../../components/cms/delete-user";

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);

  function openAddUserModal() {
    setIsOpen(true);
  }

  function closeAddUserModal() {
    setIsOpen(false);
  }

  function openEditUserModal(user) {
    setSelectedUser(user);
    setIsEditing(true);
  }

  function closeEditUserModal() {
    setIsEditing(false);
  }

  function openDeleteUserModal(user) {
    setSelectedUser(user);
    setIsDeleting(true);
  }

  function closeDeleteUserModal() {
    setIsDeleting(false);
  }

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/get-all-users`
      );

      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const refreshUserList = async () => {
    await getUsers();
  };

  // Color scheme for different roles
  const roleColors = {
    volunteer: {
      bg: "bg-green-100",
      text: "text-green-800",
      badge: "bg-green-100 text-green-800",
    },
    participant: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      badge: "bg-blue-100 text-blue-800",
    },
  };

  // Memoized filtering and sorting
  const filteredAndSortedUsers = useMemo(() => {
    // First, filter users
    const filtered = users.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = filterRole === "all" || user.role === filterRole;

      return matchesSearch && matchesRole;
    });

    // Then, sort users
    return filtered.sort((a, b) => {
      const dateA = new Date(a.joinDate);
      const dateB = new Date(b.joinDate);

      return sortOption === "newest"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
  }, [users, searchQuery, filterRole, sortOption]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div>
      <AddUserModal
        open={openAddUserModal}
        close={closeAddUserModal}
        isOpen={isOpen}
      />
      <EditUserModal
        open={openEditUserModal}
        close={closeEditUserModal}
        isOpen={isEditing}
        user={selectedUser}
        refreshUserList={refreshUserList}
      />
      <DeleteUserModal
        open={openDeleteUserModal}
        close={closeDeleteUserModal}
        isOpen={isDeleting}
        user={selectedUser}
        refreshUserList={refreshUserList}
      />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600">Manage user information</p>
      </div>

      {/* Actions */}
      <div className="mb-6">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={openAddUserModal}
        >
          Add New User
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-2.5">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
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
              <option value="volunteer">Volunteer</option>
              <option value="participant">Participant</option>
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

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Join Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedUsers.length > 0 ? (
              filteredAndSortedUsers.map((user) => (
                <tr key={user?._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-10 w-10 rounded-full ${
                          roleColors[user?.role].bg
                        } flex items-center justify-center`}
                      >
                        <span
                          className={`${
                            roleColors[user?.role].text
                          } font-medium`}
                        >
                          {user?.firstName?.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user?.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user?.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        roleColors[user?.role].badge
                      } capitalize`}
                    >
                      {user?.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => openEditUserModal(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => openDeleteUserModal(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No users found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
