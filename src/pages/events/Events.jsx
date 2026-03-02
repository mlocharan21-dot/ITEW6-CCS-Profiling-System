import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { DataTable, Modal, FormInput } from '../../components';

const Events = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'curricular',
    organizer: ''
  });
  const [errors, setErrors] = useState({});

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesCategory = !filterCategory || event.category === filterCategory;
      return matchesCategory;
    });
  }, [events, filterCategory]);

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'title', header: 'Event Title', sortable: true },
    { key: 'date', header: 'Date', sortable: true },
    { key: 'time', header: 'Time', sortable: true },
    { key: 'location', header: 'Location', sortable: true },
    { 
      key: 'category', 
      header: 'Category', 
      sortable: true,
      render: (category) => (
        <span className={`badge ${category === 'curricular' ? 'badge-info' : 'badge-success'}`}>
          {category === 'curricular' ? 'Curricular' : 'Extra-curricular'}
        </span>
      )
    }
  ];

  const handleAdd = () => {
    setSelectedEvent(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'curricular',
      organizer: ''
    });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({ ...event });
    setErrors({});
    setShowModal(true);
  };

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setShowDeleteConfirm(false);
      setSelectedEvent(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (selectedEvent) {
      updateEvent(selectedEvent.id, formData);
    } else {
      addEvent(formData);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-header-title">Events</h1>
          <p className="page-header-subtitle">Manage curricular and extra-curricular events</p>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          ➕ Add Event
        </button>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="table-filters">
          <select 
            className="filter-select" 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="curricular">Curricular</option>
            <option value="extra-curricular">Extra-curricular</option>
          </select>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <button 
              className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
            <button 
              className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <DataTable
          columns={columns}
          data={filteredEvents}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No events found"
        />
      ) : (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-card-header">
                <span className={`event-card-category ${event.category}`}>
                  {event.category === 'curricular' ? 'Curricular' : 'Extra-curricular'}
                </span>
                <div className="table-actions-cell">
                  <button className="btn btn-ghost btn-sm btn-icon" onClick={() => handleEdit(event)}>
                    ✏️
                  </button>
                  <button className="btn btn-ghost btn-sm btn-icon" onClick={() => handleDelete(event)}>
                    🗑️
                  </button>
                </div>
              </div>
              <div className="event-card-body">
                <h3 className="event-card-title">{event.title}</h3>
                <div className="event-card-details">
                  <div className="event-card-detail">
                    <span>📅</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="event-card-detail">
                    <span>⏰</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="event-card-detail">
                    <span>📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="event-card-detail">
                    <span>👤</span>
                    <span>{event.organizer}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredEvents.length === 0 && (
            <div className="card">
              <div className="empty-state">
                <div className="empty-state-icon">📅</div>
                <h3 className="empty-state-title">No events found</h3>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedEvent ? 'Edit Event' : 'Add Event'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {selectedEvent ? 'Update' : 'Add'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Event Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            required
          />
          <FormInput
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="form-row">
            <FormInput
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              required
            />
            <FormInput
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              error={errors.time}
              required
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              required
            />
            <FormInput
              label="Category"
              name="category"
              type="select"
              value={formData.category}
              onChange={handleChange}
              options={[
                { value: 'curricular', label: 'Curricular' },
                { value: 'extra-curricular', label: 'Extra-curricular' }
              ]}
            />
          </div>
          <FormInput
            label="Organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
          />
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Confirm Delete"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={confirmDelete}>
              Delete
            </button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{selectedEvent?.title}</strong>? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default Events;
