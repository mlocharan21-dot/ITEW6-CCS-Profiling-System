import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { DataTable, Modal, FormInput, PlusIcon } from '../../../components';

const Schedules = () => {
  const { schedules, courses, sections, faculty, rooms, laboratories, fetchSchedules, fetchCourses, fetchSections, fetchFaculty, fetchRooms, fetchLaboratories, addSchedule, updateSchedule, deleteSchedule } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchSchedules(), fetchCourses(), fetchSections(), fetchFaculty(), fetchRooms(), fetchLaboratories()])
      .finally(() => setLoading(false));
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [formData, setFormData] = useState({
    courseId: '', sectionId: '', facultyId: '', roomId: '', day: '', startTime: '', endTime: '',
  });

  const getCourseName = (id) => courses.find((c) => c.id === id)?.name || id;
  const getSectionName = (id) => sections.find((s) => s.id === id)?.name || id;
  const getFacultyName = (id) => {
    const f = faculty.find((f) => f.id === id);
    return f ? `${f.firstName} ${f.lastName}` : id;
  };

  const roomOptions = [
    ...rooms.map((r) => ({ value: r.id, label: r.name })),
    ...laboratories.map((l) => ({ value: l.id, label: l.name })),
  ];

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'courseId', header: 'Course', render: (id) => getCourseName(id) },
    { key: 'sectionId', header: 'Section', render: (id) => getSectionName(id) },
    { key: 'facultyId', header: 'Faculty', render: (id) => getFacultyName(id) },
    { key: 'day', header: 'Day', sortable: true },
    { key: 'startTime', header: 'Start', sortable: true },
    { key: 'endTime', header: 'End', sortable: true },
  ];

  const handleAdd = () => {
    setSelectedSchedule(null);
    setFormData({ courseId: '', sectionId: '', facultyId: '', roomId: '', day: '', startTime: '', endTime: '' });
    setShowModal(true);
  };

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);
    setFormData({ ...schedule });
    setShowModal(true);
  };

  const handleDelete = (schedule) => {
    setSelectedSchedule(schedule);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedSchedule) {
      await deleteSchedule(selectedSchedule.id);
      setShowDeleteConfirm(false);
      setSelectedSchedule(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSchedule) {
      await updateSchedule(selectedSchedule.id, formData);
    } else {
      await addSchedule(formData);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left"><h3>Schedules Management</h3></div>
        <button className="btn btn-primary" onClick={handleAdd}><PlusIcon size={15} /> Add Schedule</button>
      </div>

      <DataTable columns={columns} data={schedules} onEdit={handleEdit} onDelete={handleDelete} emptyMessage="No schedules found" loading={loading} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={selectedSchedule ? 'Edit Schedule' : 'Add Schedule'}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>{selectedSchedule ? 'Update' : 'Add'}</button>
        </>}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <FormInput label="Course" name="courseId" type="select" value={formData.courseId} onChange={handleChange}
              options={courses.map((c) => ({ value: c.id, label: `${c.id} - ${c.name}` }))} required />
            <FormInput label="Section" name="sectionId" type="select" value={formData.sectionId} onChange={handleChange}
              options={sections.map((s) => ({ value: s.id, label: s.name }))} required />
          </div>
          <div className="form-row">
            <FormInput label="Faculty" name="facultyId" type="select" value={formData.facultyId} onChange={handleChange}
              options={faculty.map((f) => ({ value: f.id, label: `${f.firstName} ${f.lastName}` }))} required />
            <FormInput label="Room / Lab" name="roomId" type="select" value={formData.roomId} onChange={handleChange}
              options={roomOptions} required />
          </div>
          <FormInput label="Day" name="day" type="select" value={formData.day} onChange={handleChange}
            options={['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map((d) => ({ value: d, label: d }))} required />
          <div className="form-row">
            <FormInput label="Start Time" name="startTime" type="time" value={formData.startTime} onChange={handleChange} required />
            <FormInput label="End Time" name="endTime" type="time" value={formData.endTime} onChange={handleChange} required />
          </div>
        </form>
      </Modal>

      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Confirm Delete"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
          <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
        </>}
      >
        <p>Are you sure you want to delete this schedule?</p>
      </Modal>
    </div>
  );
};

export default Schedules;
