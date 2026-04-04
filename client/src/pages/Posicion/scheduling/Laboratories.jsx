import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Modal, FormInput, PlusIcon } from '../../../components';

const Laboratories = () => {
  const { laboratories, fetchLaboratories, addLaboratory, updateLaboratory, deleteLaboratory } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLaboratories().finally(() => setLoading(false));
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    building: '',
    equipment: ''
  });

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Laboratory Name', sortable: true },
    { key: 'capacity', header: 'Capacity', sortable: true },
    { key: 'building', header: 'Building', sortable: true },
    { 
      key: 'equipment', 
      header: 'Equipment',
      render: (equipment) => equipment?.length || 0
    }
  ];

  const handleAdd = () => {
    setSelectedLab(null);
    setFormData({ name: '', capacity: '', building: '', equipment: '' });
    setShowModal(true);
  };

  const handleEdit = (lab) => {
    setSelectedLab(lab);
    setFormData({ ...lab, equipment: lab.equipment?.join(', ') || '' });
    setShowModal(true);
  };

  const handleDelete = (lab) => {
    setSelectedLab(lab);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedLab) {
      deleteLaboratory(selectedLab.id);
      setShowDeleteConfirm(false);
      setSelectedLab(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, equipment: formData.equipment.split(',').map(e => e.trim()).filter(e => e) };
    if (selectedLab) {
      updateLaboratory(selectedLab.id, data);
    } else {
      addLaboratory(data);
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
          <h3>Laboratories Management</h3>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <PlusIcon size={15} /> Add Laboratory
        </button>
      </div>

      <DataTable
        columns={columns}
        data={laboratories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No laboratories found"
        loading={loading}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedLab ? 'Edit Laboratory' : 'Add Laboratory'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {selectedLab ? 'Update' : 'Add'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <FormInput label="Laboratory Name" name="name" value={formData.name} onChange={handleChange} required />
          <div className="form-row">
            <FormInput label="Capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />
            <FormInput label="Building" name="building" value={formData.building} onChange={handleChange} required />
          </div>
          <FormInput label="Equipment (comma-separated)" name="equipment" type="textarea" value={formData.equipment} onChange={handleChange} placeholder="e.g., Computers, Projector, Whiteboard" />
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
        <p>Are you sure you want to delete <strong>{selectedLab?.name}</strong>?</p>
      </Modal>
    </div>
  );
};

export default Laboratories;
