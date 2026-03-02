import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Modal, FormInput } from '../../../components';

const FacultyAssignment = () => {
  const { facultyAssignments, faculty, courses, sections } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [formData, setFormData] = useState({
    facultyId: '',
    courseId: '',
    sectionId: '',
    academicYear: '',
    semester: ''
  });

  const getFacultyName = (id) => {
    const f = faculty.find(fac => fac.id === id);
    return f ? `${f.firstName} ${f.lastName}` : id;
  };

  const getCourseName = (id) => {
    const c = courses.find(crs => crs.id === id);
    return c ? c.name : id;
  };

  const getSectionName = (id) => {
    const s = sections.find(sec => sec.id === id);
    return s ? s.name : id;
  };

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { 
      key: 'facultyId', 
      header: 'Faculty',
      render: (id) => getFacultyName(id)
    },
    { 
      key: 'courseId', 
      header: 'Course',
      render: (id) => getCourseName(id)
    },
    { 
      key: 'sectionId', 
      header: 'Section',
      render: (id) => getSectionName(id)
    },
    { key: 'semester', header: 'Semester', sortable: true },
    { key: 'academicYear', header: 'Academic Year', sortable: true }
  ];

  const handleAdd = () => {
    setSelectedAssignment(null);
    setFormData({ facultyId: '', courseId: '', sectionId: '', academicYear: '', semester: '' });
    setShowModal(true);
  };

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setFormData({ ...assignment });
    setShowModal(true);
  };

  const handleDelete = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // In a real app, this would delete from state
    setShowDeleteConfirm(false);
    setSelectedAssignment(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <h3>Faculty Assignment</h3>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          ➕ Assign Faculty
        </button>
      </div>

      <DataTable
        columns={columns}
        data={facultyAssignments}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No assignments found"
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedAssignment ? 'Edit Assignment' : 'Assign Faculty'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {selectedAssignment ? 'Update' : 'Assign'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Faculty"
            name="facultyId"
            type="select"
            value={formData.facultyId}
            onChange={handleChange}
            options={faculty.map(f => ({ value: f.id, label: `${f.firstName} ${f.lastName}` }))}
            required
          />
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
              label="Section"
              name="sectionId"
              type="select"
              value={formData.sectionId}
              onChange={handleChange}
              options={sections.map(s => ({ value: s.id, label: s.name }))}
              required
            />
          </div>
          <div className="form-row">
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
            <FormInput
              label="Academic Year"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              placeholder="e.g., 2023-2024"
              required
            />
          </div>
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
        <p>Are you sure you want to remove this faculty assignment?</p>
      </Modal>
    </div>
  );
};

export default FacultyAssignment;
