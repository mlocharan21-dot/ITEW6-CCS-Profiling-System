import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components';

// Pages
import Dashboard from './pages/Dashboard';
import StudentList from './pages/students/StudentList';
import StudentProfile from './pages/students/StudentProfile';
import FacultyList from './pages/faculty/FacultyList';
import FacultyProfile from './pages/faculty/FacultyProfile';
import Instruction from './pages/instruction/Instruction';
import Syllabus from './pages/instruction/Syllabus';
import Lessons from './pages/instruction/Lessons';
import Curriculum from './pages/instruction/Curriculum';
import Scheduling from './pages/instruction/scheduling/Scheduling';
import Courses from './pages/instruction/scheduling/Courses';
import Sections from './pages/instruction/scheduling/Sections';
import Rooms from './pages/instruction/scheduling/Rooms';
import Laboratories from './pages/instruction/scheduling/Laboratories';
import FacultyAssignment from './pages/instruction/scheduling/FacultyAssignment';
import Events from './pages/events/Events';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            
            {/* Students */}
            <Route path="students" element={<StudentList />} />
            <Route path="students/:id" element={<StudentProfile />} />
            
            {/* Faculty */}
            <Route path="faculty" element={<FacultyList />} />
            <Route path="faculty/:id" element={<FacultyProfile />} />
            
            {/* Instruction */}
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
                <Route path="faculty-assignment" element={<FacultyAssignment />} />
              </Route>
            </Route>
            
            {/* Events */}
            <Route path="events" element={<Events />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
