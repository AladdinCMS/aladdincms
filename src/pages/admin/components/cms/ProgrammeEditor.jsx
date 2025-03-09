import React, { useState } from 'react'

const ProgrammeEditor = ({ programme, onSave, onCancel }) => {
  const [formData, setFormData] = useState(programme || {
    name: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    ageRange: '',
    details: '',
    tickets: []
  });

  const [newTicket, setNewTicket] = useState({
    name: '',
    price: '',
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTicketInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTicket = () => {
    // Check if ticket has at least a name
    if (newTicket.name.trim() === '') return;

    setFormData(prev => ({
      ...prev,
      tickets: [...prev.tickets, { ...newTicket }]
    }));

    // Reset the new ticket form
    setNewTicket({
      name: '',
      price: '',
      details: ''
    });
  };

  const handleEditTicket = (index, field, value) => {
    const updatedTickets = [...formData.tickets];
    updatedTickets[index] = {
      ...updatedTickets[index],
      [field]: value
    };

    setFormData(prev => ({
      ...prev,
      tickets: updatedTickets
    }));
  };

  const handleRemoveTicket = (index) => {
    setFormData(prev => ({
      ...prev,
      tickets: prev.tickets.filter((_, i) => i !== index)
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
          
          {/* Existing Tickets */}
          {formData.tickets.length > 0 && (
            <div className="mb-4 space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Current Tickets</h4>
              
              {formData.tickets.map((ticket, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="text-md font-medium">{ticket.name}</h5>
                    <button
                      type="button"
                      onClick={() => handleRemoveTicket(index)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Remove ticket"
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-500">Ticket Name</label>
                      <input
                        type="text"
                        value={ticket.name}
                        onChange={(e) => handleEditTicket(index, 'name', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500">Price</label>
                      <input
                        type="text"
                        value={ticket.price}
                        onChange={(e) => handleEditTicket(index, 'price', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-500">Details</label>
                      <textarea
                        rows={2}
                        value={ticket.details}
                        onChange={(e) => handleEditTicket(index, 'details', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Add New Ticket */}
          <div className="border border-gray-200 rounded-md p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Ticket</h4>
            
            <div className="mb-4">
              <label htmlFor="ticketName" className="block text-sm font-medium text-gray-700">
                Ticket Name
              </label>
              <input
                type="text"
                id="ticketName"
                name="name"
                value={newTicket.name}
                onChange={handleTicketInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g. Standard Ticket, VIP Access"
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
                value={newTicket.price}
                onChange={handleTicketInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g. £10.00, Free"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="ticketDetails" className="block text-sm font-medium text-gray-700">
                Ticket Details
              </label>
              <textarea
                id="ticketDetails"
                name="details"
                value={newTicket.details}
                onChange={handleTicketInputChange}
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Description of what's included with this ticket"
              />
            </div>
            
            <div>
              <button
                type="button"
                onClick={handleAddTicket}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Add Ticket
              </button>
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