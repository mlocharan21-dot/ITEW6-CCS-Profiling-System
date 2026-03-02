import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Modal, FormInput } from '../../../components';

const Syllabus = () => {
  const { syllabus, courses } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [formData, setFormData] = useState({
    courseId: '',
    semester: '',
    academicYear: '',
    topics: '',
    requirements: ''
  });
  const [errors, setErrors] = useState({});

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { 
      key: 'courseId', 
      header: 'Course',
      render: (courseId) => {
        const course = courses.find(c => c.id === courseId);
        return course ? course.name : courseId;
      }
    },
    { key: 'semester', header: 'Semester', sortable: true },
    { key: 'academicYear', header: 'Academic Year', sortable: true },
    { 
      key: 'topics', 
      header: 'Topics',
      render: (topics) => topics?.length || 0
    },
    { 
      key: 'requirements', 
      header: 'Requirements',
      render: (requirements) => requirements?.length || 0
    }
  ];

  const handleAdd = () => {
    setSelectedSyllabus(null);
    setFormData({
      courseId: '',
      semester: '',
      academicYear: '',
      topics: '',
      requirements: ''
    });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setSelectedSyllabus(item);
    setFormData({
      courseId: item.courseId,
      semester: item.semester,
      academicYear: item.academicYear,
      topics: item.topics?.join(', ') || '',
      requirements: item.requirements?.join(', ') || ''
    });
    setErrors({});
    setShowModal(true);
  };

  const handleDelete = (item) => {
    setSelectedSyllabus(item);
    setShowDeleteConfirm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would add/update the syllabus
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
          <h2 className="card-title">Syllabus Management</h2>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          ➕ Add Syllabus
        </button>
      </div>

      <DataTable
        columns={columns}
        data={syllabus}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No syllabi found"
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedSyllabus ? 'Edit Syllabus' : 'Add Syllabus'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {selectedSyllabus ? 'Update' : 'Add'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <FormInput
              label="Course"
              name="courseId"
              type="select"
              value={formData.courseId}
              onChange={handleChange}
              options={courses.map(c => ({ value: c.id, label: `${c.id} - ${c.name}` }))}
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
          <FormInput
            label="Academic Year"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
            placeholder="e.g., 2023-2024"
            required
          />
          <FormInput
            label="Topics (comma-separated)"
            name="topics"
            type="textarea"
            value={formData.topics}
            onChange={handleChange}
            placeholder="Enter topics separated by commas"
          />
          <FormInput
            label="Requirements (comma-separated)"
            name="requirements"
            type="textarea"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Enter requirements separated by commas"
          />
        </form>
      </Modal>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Confirm Delete"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={() => setShowDeleteConfirm(false)}>
              Delete
            </button>
          </>
        }
      >
        <p>Are you sure you want to delete this syllabus?</p>
      </Modal>
    </div>
  );
};

export default Syllabus;
