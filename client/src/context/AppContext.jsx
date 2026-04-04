import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';
import { useToast } from './ToastContext';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const { showToast } = useToast();

  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [events, setEvents] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [curriculum, setCurriculum] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [facultyAssignments, setFacultyAssignments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch functions (called per-page on mount)
  const fetchStudents = async () => {
    const data = await api.get('/students');
    setStudents(data);
  };
  const fetchFaculty = async () => {
    const data = await api.get('/faculty');
    setFaculty(data);
  };
  const fetchCourses = async () => {
    const data = await api.get('/courses');
    setCourses(data);
  };
  const fetchSections = async () => {
    const data = await api.get('/sections');
    setSections(data);
  };
  const fetchRooms = async () => {
    const data = await api.get('/rooms');
    setRooms(data);
  };
  const fetchLaboratories = async () => {
    const data = await api.get('/laboratories');
    setLaboratories(data);
  };
  const fetchEvents = async () => {
    const data = await api.get('/events');
    setEvents(data);
  };
  const fetchSyllabus = async () => {
    const data = await api.get('/syllabi');
    setSyllabus(data);
  };
  const fetchLessons = async () => {
    const data = await api.get('/lessons');
    setLessons(data);
  };
  const fetchCurriculum = async () => {
    const data = await api.get('/curricula');
    setCurriculum(data);
  };
  const fetchSchedules = async () => {
    const data = await api.get('/schedules');
    setSchedules(data);
  };
  const fetchFacultyAssignments = async () => {
    const data = await api.get('/faculty-assignments');
    setFacultyAssignments(data);
  };

  // Student operations
  const addStudent = async (data) => {
    try {
      const created = await api.post('/students', data);
      setStudents((prev) => [...prev, created]);
      showToast('Student enrolled successfully', 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const updateStudent = async (id, data) => {
    try {
      const updated = await api.put(`/students/${id}`, data);
      setStudents((prev) => prev.map((s) => (String(s.id) === String(updated.id) ? updated : s)));
      showToast('Student updated successfully', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const deleteStudent = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      setStudents((prev) => prev.filter((s) => String(s.id) !== String(id)));
      showToast('Student removed', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  // Faculty operations
  const addFaculty = async (data) => {
    try {
      const created = await api.post('/faculty', data);
      setFaculty((prev) => [...prev, created]);
      showToast('Faculty member added', 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const updateFaculty = async (id, data) => {
    try {
      const updated = await api.put(`/faculty/${id}`, data);
      setFaculty((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
      showToast('Faculty member updated', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const deleteFaculty = async (id) => {
    try {
      await api.delete(`/faculty/${id}`);
      setFaculty((prev) => prev.filter((f) => f.id !== id));
      showToast('Faculty member removed', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  // Course operations
  const addCourse = async (data) => {
    try {
      const created = await api.post('/courses', data);
      setCourses((prev) => [...prev, created]);
      showToast('Course added', 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const updateCourse = async (id, data) => {
    try {
      const updated = await api.put(`/courses/${id}`, data);
      setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      showToast('Course updated', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const deleteCourse = async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      showToast('Course removed', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  // Section operations
  const addSection = async (data) => {
    try {
      const created = await api.post('/sections', data);
      setSections((prev) => [...prev, created]);
      showToast('Section added', 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const updateSection = async (id, data) => {
    try {
      const updated = await api.put(`/sections/${id}`, data);
      setSections((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      showToast('Section updated', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const deleteSection = async (id) => {
    try {
      await api.delete(`/sections/${id}`);
      setSections((prev) => prev.filter((s) => s.id !== id));
      showToast('Section removed', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  // Room operations
  const addRoom = async (data) => {
    try {
      const created = await api.post('/rooms', data);
      setRooms((prev) => [...prev, created]);
      showToast('Room added', 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const updateRoom = async (id, data) => {
    try {
      const updated = await api.put(`/rooms/${id}`, data);
      setRooms((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      showToast('Room updated', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const deleteRoom = async (id) => {
    try {
      await api.delete(`/rooms/${id}`);
      setRooms((prev) => prev.filter((r) => r.id !== id));
      showToast('Room removed', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  // Laboratory operations
  const addLaboratory = async (data) => {
    try {
      const created = await api.post('/laboratories', data);
      setLaboratories((prev) => [...prev, created]);
      showToast('Laboratory added', 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const updateLaboratory = async (id, data) => {
    try {
      const updated = await api.put(`/laboratories/${id}`, data);
      setLaboratories((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
      showToast('Laboratory updated', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const deleteLaboratory = async (id) => {
    try {
      await api.delete(`/laboratories/${id}`);
      setLaboratories((prev) => prev.filter((l) => l.id !== id));
      showToast('Laboratory removed', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  // Event operations
  const addEvent = async (data) => {
    try {
      const created = await api.post('/events', data);
      setEvents((prev) => [...prev, created]);
      showToast('Event created', 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const updateEvent = async (id, data) => {
    try {
      const updated = await api.put(`/events/${id}`, data);
      setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      showToast('Event updated', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const deleteEvent = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      showToast('Event removed', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  // Syllabus operations
  const addSyllabus = async (data) => {
    const payload = {
      courseId: data.courseId,
      semester: data.semester,
      academicYear: data.academicYear,
      topics: typeof data.topics === 'string'
        ? data.topics.split(',').map((t) => t.trim()).filter(Boolean)
        : data.topics ?? [],
      requirements: typeof data.requirements === 'string'
        ? data.requirements.split(',').map((r) => r.trim()).filter(Boolean)
        : data.requirements ?? [],
    };
    try {
      const created = await api.post('/syllabi', payload);
      setSyllabus((prev) => [...prev, created]);
      showToast('Syllabus added', 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const updateSyllabus = async (id, data) => {
    const payload = {
      courseId: data.courseId,
      semester: data.semester,
      academicYear: data.academicYear,
      topics: typeof data.topics === 'string'
        ? data.topics.split(',').map((t) => t.trim()).filter(Boolean)
        : data.topics ?? [],
      requirements: typeof data.requirements === 'string'
        ? data.requirements.split(',').map((r) => r.trim()).filter(Boolean)
        : data.requirements ?? [],
    };
    try {
      const updated = await api.put(`/syllabi/${id}`, payload);
      setSyllabus((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      showToast('Syllabus updated', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const deleteSyllabus = async (id) => {
    try {
      await api.delete(`/syllabi/${id}`);
      setSyllabus((prev) => prev.filter((s) => s.id !== id));
      showToast('Syllabus removed', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  // Lesson operations
  const addLesson = async (data) => {
    const payload = {
      courseId: data.courseId,
      week: data.week,
      title: data.title,
      objectives: typeof data.objectives === 'string'
        ? data.objectives.split(',').map((o) => o.trim()).filter(Boolean)
        : data.objectives ?? [],
      activities: typeof data.activities === 'string'
        ? data.activities.split(',').map((a) => a.trim()).filter(Boolean)
        : data.activities ?? [],
      duration: data.duration,
    };
    try {
      const created = await api.post('/lessons', payload);
      setLessons((prev) => [...prev, created]);
      showToast('Lesson added', 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const updateLesson = async (id, data) => {
    const payload = {
      courseId: data.courseId,
      week: data.week,
      title: data.title,
      objectives: typeof data.objectives === 'string'
        ? data.objectives.split(',').map((o) => o.trim()).filter(Boolean)
        : data.objectives ?? [],
      activities: typeof data.activities === 'string'
        ? data.activities.split(',').map((a) => a.trim()).filter(Boolean)
        : data.activities ?? [],
      duration: data.duration,
    };
    try {
      const updated = await api.put(`/lessons/${id}`, payload);
      setLessons((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
      showToast('Lesson updated', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const deleteLesson = async (id) => {
    try {
      await api.delete(`/lessons/${id}`);
      setLessons((prev) => prev.filter((l) => l.id !== id));
      showToast('Lesson removed', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  // Curriculum operations
  const addCurriculum = async (data) => {
    const payload = {
      year: data.year,
      semester: data.semester,
      courses: typeof data.courses === 'string'
        ? data.courses.split(',').map((c) => c.trim()).filter(Boolean)
        : data.courses ?? [],
      totalUnits: data.totalUnits,
    };
    try {
      const created = await api.post('/curricula', payload);
      setCurriculum((prev) => [...prev, created]);
      showToast('Curriculum added', 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const updateCurriculum = async (id, data) => {
    const payload = {
      year: data.year,
      semester: data.semester,
      courses: typeof data.courses === 'string'
        ? data.courses.split(',').map((c) => c.trim()).filter(Boolean)
        : data.courses ?? [],
      totalUnits: data.totalUnits,
    };
    try {
      const updated = await api.put(`/curricula/${id}`, payload);
      setCurriculum((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      showToast('Curriculum updated', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const deleteCurriculum = async (id) => {
    try {
      await api.delete(`/curricula/${id}`);
      setCurriculum((prev) => prev.filter((c) => c.id !== id));
      showToast('Curriculum removed', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  // Schedule operations
  const addSchedule = async (data) => {
    try {
      const created = await api.post('/schedules', data);
      setSchedules((prev) => [...prev, created]);
      showToast('Schedule created', 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const updateSchedule = async (id, data) => {
    try {
      const updated = await api.put(`/schedules/${id}`, data);
      setSchedules((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      showToast('Schedule updated', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const deleteSchedule = async (id) => {
    try {
      await api.delete(`/schedules/${id}`);
      setSchedules((prev) => prev.filter((s) => s.id !== id));
      showToast('Schedule removed', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  // Faculty Assignment operations
  const addFacultyAssignment = async (data) => {
    try {
      const created = await api.post('/faculty-assignments', data);
      setFacultyAssignments((prev) => [...prev, created]);
      showToast('Faculty assignment created', 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const updateFacultyAssignment = async (id, data) => {
    try {
      const updated = await api.put(`/faculty-assignments/${id}`, data);
      setFacultyAssignments((prev) => prev.map((fa) => (fa.id === updated.id ? updated : fa)));
      showToast('Faculty assignment updated', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };
  const deleteFacultyAssignment = async (id) => {
    try {
      await api.delete(`/faculty-assignments/${id}`);
      setFacultyAssignments((prev) => prev.filter((fa) => fa.id !== id));
      showToast('Faculty assignment removed', 'success');
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error');
      throw err;
    }
  };

  const value = {
    students, faculty, courses, sections, rooms, laboratories, events,
    syllabus, lessons, curriculum, schedules, facultyAssignments,
    sidebarOpen, setSidebarOpen,
    fetchStudents, fetchFaculty, fetchCourses, fetchSections, fetchRooms,
    fetchLaboratories, fetchEvents, fetchSyllabus, fetchLessons,
    fetchCurriculum, fetchSchedules, fetchFacultyAssignments,
    addStudent, updateStudent, deleteStudent,
    addFaculty, updateFaculty, deleteFaculty,
    addCourse, updateCourse, deleteCourse,
    addSection, updateSection, deleteSection,
    addRoom, updateRoom, deleteRoom,
    addLaboratory, updateLaboratory, deleteLaboratory,
    addEvent, updateEvent, deleteEvent,
    addSyllabus, updateSyllabus, deleteSyllabus,
    addLesson, updateLesson, deleteLesson,
    addCurriculum, updateCurriculum, deleteCurriculum,
    addSchedule, updateSchedule, deleteSchedule,
    addFacultyAssignment, updateFacultyAssignment, deleteFacultyAssignment,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
