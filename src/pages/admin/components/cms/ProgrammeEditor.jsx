import React, { useState } from 'react'

const ProgrammeEditor = ({ programme, onSave, onCancel }) => {
  const [formData, setFormData] = useState(programme || {
    name: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    ageRange: '',
    details: '',
    tickets: {
      name: '',
      price: '',
      details: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTicketChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      tickets: {
        ...prev.tickets,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">{programme ? 'Edit' : 'Create'} Programme</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Programme Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700">
            Age Range
          </label>
          <input
            type="text"
            id="ageRange"
            name="ageRange"
            value={formData.ageRange}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="e.g. 12-18, All ages"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">
            Programme Details
          </label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ticket Information</h3>
          <div className="border border-gray-200 rounded-md p-4">
            <div className="mb-4">
              <label htmlFor="ticketName" className="block text-sm font-medium text-gray-700">
                Ticket Name
              </label>
              <input
                type="text"
                id="ticketName"
                name="name"
                value={formData.tickets.name}
                onChange={handleTicketChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g. General Admission, VIP"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                id="ticketPrice"
                name="price"
                value={formData.tickets.price}
                onChange={handleTicketChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g. $10, Free"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="ticketDetails" className="block text-sm font-medium text-gray-700">
                Ticket Details
              </label>
              <textarea
                id="ticketDetails"
                name="details"
                value={formData.tickets.details}
                onChange={handleTicketChange}
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Any additional information about tickets"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            Save Programme
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProgrammeEditor