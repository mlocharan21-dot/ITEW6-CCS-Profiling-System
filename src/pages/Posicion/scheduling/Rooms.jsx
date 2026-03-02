import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Modal, FormInput } from '../../../components';

const Rooms = () => {
  const { rooms, addRoom, updateRoom, deleteRoom } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    capacity: '',
    building: ''
  });

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Room Name', sortable: true },
    { key: 'type', header: 'Type', sortable: true },
    { key: 'capacity', header: 'Capacity', sortable: true },
    { key: 'building', header: 'Building', sortable: true }
  ];

  const handleAdd = () => {
    setSelectedRoom(null);
    setFormData({ name: '', type: '', capacity: '', building: '' });
    setShowModal(true);
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setFormData({ ...room });
    setShowModal(true);
  };

  const handleDelete = (room) => {
    setSelectedRoom(room);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedRoom) {
      deleteRoom(selectedRoom.id);
      setShowDeleteConfirm(false);
      setSelectedRoom(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRoom) {
      updateRoom(selectedRoom.id, formData);
    } else {
      addRoom(formData);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h3>Rooms Management</h3>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          ➕ Add Room
        </button>
      </div>

      <DataTable
        columns={columns}
        data={rooms}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No rooms found"
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedRoom ? 'Edit Room' : 'Add Room'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {selectedRoom ? 'Update' : 'Add'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <FormInput label="Room Name" name="name" value={formData.name} onChange={handleChange} required />
          <div className="form-row">
            <FormInput
              label="Type"
              name="type"
              type="select"
              value={formData.type}
              onChange={handleChange}
              options={[
                { value: 'Classroom', label: 'Classroom' },
                { value: 'Lecture Hall', label: 'Lecture Hall' },
                { value: 'Seminar Room', label: 'Seminar Room' },
                { value: 'Conference Room', label: 'Conference Room' }
              ]}
              required
            />
            <FormInput label="Capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />
          </div>
          <FormInput label="Building" name="building" value={formData.building} onChange={handleChange} required />
        </form>
      </Modal>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Confirm Delete"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{selectedRoom?.name}</strong>?</p>
      </Modal>
    </div>
  );
};

export default Rooms;
