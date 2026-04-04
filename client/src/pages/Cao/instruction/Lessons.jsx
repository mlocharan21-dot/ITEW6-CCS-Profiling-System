import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Modal, FormInput, PlusIcon } from '../../../components';

const Lessons = () => {
  const { lessons, courses, fetchLessons, fetchCourses, addLesson, updateLesson, deleteLesson } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchLessons(), fetchCourses()]).finally(() => setLoading(false));
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [formData, setFormData] = useState({
    courseId: '',
    week: '',
    title: '',
    objectives: '',
    activities: '',
    duration: ''
  });

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
    { key: 'week', header: 'Week', sortable: true },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'duration', header: 'Duration', sortable: true }
  ];

  const handleAdd = () => {
    setSelectedLesson(null);
    setFormData({
      courseId: '',
      week: '',
      title: '',
      objectives: '',
      activities: '',
      duration: ''
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setSelectedLesson(item);
    setFormData({
      courseId: item.courseId,
      week: item.week,
      title: item.title,
      objectives: item.objectives?.join(', ') || '',
      activities: item.activities?.join(', ') || '',
      duration: item.duration
    });
    setShowModal(true);
  };

  const handleDelete = (item) => {
    setSelectedLesson(item);
    setShowDeleteConfirm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedLesson) {
      await updateLesson(selectedLesson.id, formData);
    } else {
      await addLesson(formData);
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
          <h2 className="card-title">Lesson Plans</h2>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <PlusIcon size={15} /> Add Lesson
        </button>
      </div>

      <DataTable
        columns={columns}
        data={lessons}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No lessons found"
        loading={loading}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedLesson ? 'Edit Lesson' : 'Add Lesson'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {selectedLesson ? 'Update' : 'Add'}
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
              label="Week"
              name="week"
              type="number"
              value={formData.week}
              onChange={handleChange}
              required
            />
          </div>
          <FormInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Objectives (comma-separated)"
            name="objectives"
            type="textarea"
            value={formData.objectives}
            onChange={handleChange}
          />
          <FormInput
            label="Activities (comma-separated)"
            name="activities"
            type="textarea"
            value={formData.activities}
            onChange={handleChange}
          />
          <FormInput
            label="Duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 2 hours"
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
              if (selectedLesson) await deleteLesson(selectedLesson.id);
              setShowDeleteConfirm(false);
              setSelectedLesson(null);
            }}>
              Delete
            </button>
          </>
        }
      >
        <p>Are you sure you want to delete this lesson?</p>
      </Modal>
    </div>
  );
};

export default Lessons;
