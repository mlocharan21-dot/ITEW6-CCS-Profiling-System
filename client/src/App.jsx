import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Layout } from './components';
import Toast from './components/common/Toast';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/San Jose/students/StudentList';
import StudentProfile from './pages/San Jose/students/StudentProfile';
import FacultyList from './pages/Ocasla/faculty/FacultyList';
import FacultyProfile from './pages/Ocasla/faculty/FacultyProfile';
import Instruction from './pages/Cao/instruction/Instruction';
import Syllabus from './pages/Cao/instruction/Syllabus';
import Lessons from './pages/Cao/instruction/Lessons';
import Curriculum from './pages/Cao/instruction/Curriculum';
import Scheduling from './pages/Posicion/scheduling/Scheduling';
import Courses from './pages/Posicion/scheduling/Courses';
import Sections from './pages/Posicion/scheduling/Sections';
import Rooms from './pages/Posicion/scheduling/Rooms';
import Laboratories from './pages/Posicion/scheduling/Laboratories';
import FacultyAssignment from './pages/Posicion/scheduling/FacultyAssignment';
import Schedules from './pages/Posicion/scheduling/Schedules';
import Events from './pages/Ocharan/events/Events';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppProvider>
              <Layout />
            </AppProvider>
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="students" element={<StudentList />} />
        <Route path="students/:id" element={<StudentProfile />} />
        <Route path="faculty" element={<FacultyList />} />
        <Route path="faculty/:id" element={<FacultyProfile />} />
        <Route path="instruction" element={<Instruction />}>
          <Route index element={<Navigate to="/instruction/syllabus" replace />} />
          <Route path="syllabus" element={<Syllabus />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="scheduling" element={<Scheduling />}>
            <Route index element={<Navigate to="/instruction/scheduling/courses" replace />} />
            <Route path="courses" element={<Courses />} />
            <Route path="sections" element={<Sections />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="laboratories" element={<Laboratories />} />
            <Route path="schedules" element={<Schedules />} />
            <Route path="faculty-assignment" element={<FacultyAssignment />} />
          </Route>
        </Route>
        <Route path="events" element={<Events />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toast />
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
