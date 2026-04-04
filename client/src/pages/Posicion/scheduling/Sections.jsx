import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Modal, FormInput, PlusIcon } from '../../../components';

const Sections = () => {
  const { sections, fetchSections, addSection, updateSection, deleteSection } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSections().finally(() => setLoading(false));
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    semester: '',
    capacity: ''
  });

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Section Name', sortable: true },
    { key: 'year', header: 'Year', sortable: true },
    { key: 'semester', header: 'Semester', sortable: true },
    { key: 'capacity', header: 'Capacity', sortable: true }
  ];

  const handleAdd = () => {
    setSelectedSection(null);
    setFormData({ name: '', year: '', semester: '', capacity: '' });
    setShowModal(true);
  };

  const handleEdit = (section) => {
    setSelectedSection(section);
    setFormData({ ...section });
    setShowModal(true);
  };

  const handleDelete = (section) => {
    setSelectedSection(section);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedSection) {
      deleteSection(selectedSection.id);
      setShowDeleteConfirm(false);
      setSelectedSection(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSection) {
      updateSection(selectedSection.id, formData);
    } else {
      addSection(formData);
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
          <h3>Sections Management</h3>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <PlusIcon size={15} /> Add Section
        </button>
      </div>

      <DataTable
        columns={columns}
        data={sections}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No sections found"
        loading={loading}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedSection ? 'Edit Section' : 'Add Section'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {selectedSection ? 'Update' : 'Add'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <FormInput label="Section Name" name="name" value={formData.name} onChange={handleChange} required />
          <div className="form-row">
            <FormInput
              label="Year"
              name="year"
              type="select"
              value={formData.year}
              onChange={handleChange}
              options={[
                { value: '1', label: 'Year 1' },
                { value: '2', label: 'Year 2' },
                { value: '3', label: 'Year 3' },
                { value: '4', label: 'Year 4' }
              ]}
              required
            />
            <FormInput
              label="Semester"
              name="semester"
              type="select"
              value={formData.semester}
              onChange={handleChange}
              options={[
                { value: '1st', label: '1st Semester' },
                { value: '2nd', label: '2nd Semester' }
              ]}
              required
            />
          </div>
          <FormInput label="Capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />
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
        <p>Are you sure you want to delete <strong>{selectedSection?.name}</strong>?</p>
      </Modal>
    </div>
  );
};

export default Sections;
