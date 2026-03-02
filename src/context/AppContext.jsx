import React, { createContext, useContext, useState } from 'react';
import { students as initialStudents, faculty as initialFaculty, courses as initialCourses, sections as initialSections, rooms as initialRooms, laboratories as initialLaboratories, events as initialEvents } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState(initialStudents);
  const [faculty, setFaculty] = useState(initialFaculty);
  const [courses, setCourses] = useState(initialCourses);
  const [sections, setSections] = useState(initialSections);
  const [rooms, setRooms] = useState(initialRooms);
  const [laboratories, setLaboratories] = useState(initialLaboratories);
  const [events, setEvents] = useState(initialEvents);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Student operations
  const addStudent = (student) => {
    const newStudent = { ...student, id: `STU-2024-${String(students.length + 1).padStart(3, '0')}` };
    setStudents([...students, newStudent]);
    return newStudent;
  };

  const updateStudent = (id, updatedData) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  // Faculty operations
  const addFaculty = (facultyMember) => {
    const newFaculty = { ...facultyMember, id: `FAC-${String(faculty.length + 1).padStart(3, '0')}` };
    setFaculty([...faculty, newFaculty]);
    return newFaculty;
  };

  const updateFaculty = (id, updatedData) => {
    setFaculty(faculty.map(f => f.id === id ? { ...f, ...updatedData } : f));
  };

  const deleteFaculty = (id) => {
    setFaculty(faculty.filter(f => f.id !== id));
  };

  // Course operations
  const addCourse = (course) => {
    setCourses([...courses, course]);
  };

  const updateCourse = (id, updatedData) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  // Section operations
  const addSection = (section) => {
    setSections([...sections, section]);
  };

  const updateSection = (id, updatedData) => {
    setSections(sections.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
  };

  // Room operations
  const addRoom = (room) => {
    setRooms([...rooms, room]);
  };

  const updateRoom = (id, updatedData) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, ...updatedData } : r));
  };

  const deleteRoom = (id) => {
    setRooms(rooms.filter(r => r.id !== id));
  };

  // Laboratory operations
  const addLaboratory = (lab) => {
    setLaboratories([...laboratories, lab]);
  };

  const updateLaboratory = (id, updatedData) => {
    setLaboratories(laboratories.map(l => l.id === id ? { ...l, ...updatedData } : l));
  };

  const deleteLaboratory = (id) => {
    setLaboratories(laboratories.filter(l => l.id !== id));
  };

  // Event operations
  const addEvent = (event) => {
    const newEvent = { ...event, id: `EVT-${String(events.length + 1).padStart(3, '0')}` };
    setEvents([...events, newEvent]);
    return newEvent;
  };

  const updateEvent = (id, updatedData) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...updatedData } : e));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const value = {
    // Data
    students,
    faculty,
    courses,
    sections,
    rooms,
    laboratories,
    events,
    sidebarOpen,
    setSidebarOpen,
    // Student operations
    addStudent,
    updateStudent,
    deleteStudent,
    // Faculty operations
    addFaculty,
    updateFaculty,
    deleteFaculty,
    // Course operations
    addCourse,
    updateCourse,
    deleteCourse,
    // Section operations
    addSection,
    updateSection,
    deleteSection,
    // Room operations
    addRoom,
    updateRoom,
    deleteRoom,
    // Laboratory operations
    addLaboratory,
    updateLaboratory,
    deleteLaboratory,
    // Event operations
    addEvent,
    updateEvent,
    deleteEvent,
    // Stats
    getStats: () => ({
      totalStudents: students.length,
      activeStudents: students.filter(s => s.status === 'active').length,
      totalFaculty: faculty.length,
      activeFaculty: faculty.filter(f => f.status === 'active').length,
      totalCourses: courses.length,
      totalEvents: events.length,
      curricularEvents: events.filter(e => e.category === 'curricular').length,
      extraCurricularEvents: events.filter(e => e.category === 'extra-curricular').length
    })
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
