import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Modal, FormInput, PlusIcon } from '../../../components';

const Courses = () => {
  const { courses, fetchCourses, addCourse, updateCourse, deleteCourse } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses().finally(() => setLoading(false));
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    units: '',
    description: '',
    department: ''
  });

  const columns = [
    { key: 'id', header: 'Course ID', sortable: true },
    { key: 'name', header: 'Course Name', sortable: true },
    { key: 'units', header: 'Units', sortable: true },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'description', header: 'Description' }
  ];

  const handleAdd = () => {
    setSelectedCourse(null);
    setFormData({ id: '', name: '', units: '', description: '', department: '' });
    setShowModal(true);
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setFormData({ ...course });
    setShowModal(true);
  };

  const handleDelete = (course) => {
    setSelectedCourse(course);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedCourse) {
      deleteCourse(selectedCourse.id);
      setShowDeleteConfirm(false);
      setSelectedCourse(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCourse) {
      updateCourse(selectedCourse.id, formData);
    } else {
      addCourse(formData);
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
          <h3>Courses Management</h3>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <PlusIcon size={15} /> Add Course
        </button>
      </div>

      <DataTable
        columns={columns}
        data={courses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No courses found"
        loading={loading}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedCourse ? 'Edit Course' : 'Add Course'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {selectedCourse ? 'Update' : 'Add'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <FormInput label="Course ID" name="id" value={formData.id} onChange={handleChange} required />
            <FormInput label="Course Name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <FormInput label="Units" name="units" type="number" value={formData.units} onChange={handleChange} required />
            <FormInput
              label="Department"
              name="department"
              type="select"
              value={formData.department}
              onChange={handleChange}
              options={[
                { value: 'Computer Science', label: 'Computer Science' },
                { value: 'Information Technology', label: 'Information Technology' }
              ]}
              required
            />
          </div>
          <FormInput label="Description" name="description" type="textarea" value={formData.description} onChange={handleChange} />
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
        <p>Are you sure you want to delete <strong>{selectedCourse?.name}</strong>?</p>
      </Modal>
    </div>
  );
};

export default Courses;
