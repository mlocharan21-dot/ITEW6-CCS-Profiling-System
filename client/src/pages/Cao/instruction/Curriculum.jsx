import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Modal, FormInput, PlusIcon } from '../../../components';

const Curriculum = () => {
  const { curriculum, courses, fetchCurriculum, fetchCourses, addCurriculum, updateCurriculum, deleteCurriculum } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCurriculum(), fetchCourses()]).finally(() => setLoading(false));
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [formData, setFormData] = useState({
    year: '',
    semester: '',
    courses: '',
    totalUnits: ''
  });

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'year', header: 'Year', sortable: true },
    { key: 'semester', header: 'Semester', sortable: true },
    { 
      key: 'courses', 
      header: 'Courses',
      render: (courses) => courses?.length || 0
    },
    { key: 'totalUnits', header: 'Total Units', sortable: true }
  ];

  const handleAdd = () => {
    setSelectedCurriculum(null);
    setFormData({
      year: '',
      semester: '',
      courses: '',
      totalUnits: ''
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setSelectedCurriculum(item);
    setFormData({
      year: item.year,
      semester: item.semester,
      courses: item.courses?.join(', ') || '',
      totalUnits: item.totalUnits
    });
    setShowModal(true);
  };

  const handleDelete = (item) => {
    setSelectedCurriculum(item);
    setShowDeleteConfirm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCurriculum) {
      await updateCurriculum(selectedCurriculum.id, formData);
    } else {
      await addCurriculum(formData);
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
          <h2 className="card-title">Curriculum</h2>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <PlusIcon size={15} /> Add Curriculum
        </button>
      </div>

      <DataTable
        columns={columns}
        data={curriculum}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No curriculum found"
        loading={loading}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedCurriculum ? 'Edit Curriculum' : 'Add Curriculum'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {selectedCurriculum ? 'Update' : 'Add'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
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
          <FormInput
            label="Courses (comma-separated course IDs)"
            name="courses"
            type="textarea"
            value={formData.courses}
            onChange={handleChange}
            placeholder="e.g., CS101, IT101, ENG101"
          />
          <FormInput
            label="Total Units"
            name="totalUnits"
            type="number"
            value={formData.totalUnits}
            onChange={handleChange}
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
            <button className="btn btn-danger" onClick={async () => {
              if (selectedCurriculum) await deleteCurriculum(selectedCurriculum.id);
              setShowDeleteConfirm(false);
              setSelectedCurriculum(null);
            }}>
              Delete
            </button>
          </>
        }
      >
        <p>Are you sure you want to delete this curriculum?</p>
      </Modal>
    </div>
  );
};

export default Curriculum;
