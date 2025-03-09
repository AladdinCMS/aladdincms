import React, { useState, useEffect } from 'react'

const VolunteerEditor = ({ volunteer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'pending',
    joinDate: new Date().toISOString().split('T')[0],
    skills: []
  });

  const [skillInput, setSkillInput] = useState('');

  // Initialize form with volunteer data if editing
  useEffect(() => {
    if (volunteer) {
      setFormData({
        id: volunteer.id,
        name: volunteer.name || '',
        email: volunteer.email || '',
        phone: volunteer.phone || '',
        status: volunteer.status || 'pending',
        joinDate: volunteer.joinDate || new Date().toISOString().split('T')[0],
        skills: [...volunteer.skills] || []
      });
    }
  }, [volunteer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() !== '' && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">{volunteer ? 'Edit' : 'Create'} Volunteer</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 mb-1">
              Join Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="joinDate"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>
          <div className="flex">
            <input
              type="text"
              id="skills"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mt-1 block w-full border border-gray-300 rounded-l-md shadow-sm p-2"
              placeholder="Add a skill"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="mt-1 inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-800 focus:outline-none"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            {volunteer ? 'Save Changes' : 'Create Volunteer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerEditor;