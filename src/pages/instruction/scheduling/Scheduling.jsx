import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Scheduling = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSubTab, setActiveSubTab] = useState('courses');

  const subTabs = [
    { id: 'courses', label: 'Courses', path: '/instruction/scheduling/courses' },
    { id: 'sections', label: 'Sections', path: '/instruction/scheduling/sections' },
    { id: 'rooms', label: 'Rooms', path: '/instruction/scheduling/rooms' },
    { id: 'labs', label: 'Laboratories', path: '/instruction/scheduling/laboratories' },
    { id: 'assignment', label: 'Faculty Assignment', path: '/instruction/scheduling/faculty-assignment' }
  ];

  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/instruction/scheduling') {
      navigate('/instruction/scheduling/courses');
    } else if (path.includes('courses')) {
      setActiveSubTab('courses');
    } else if (path.includes('sections')) {
      setActiveSubTab('sections');
    } else if (path.includes('rooms')) {
      setActiveSubTab('rooms');
    } else if (path.includes('laboratories')) {
      setActiveSubTab('labs');
    } else if (path.includes('faculty-assignment')) {
      setActiveSubTab('assignment');
    }
  }, [location.pathname, navigate]);

  const handleTabClick = (tab) => {
    setActiveSubTab(tab.id);
    navigate(tab.path);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2 className="card-title">Scheduling Management</h2>
        </div>
      </div>

      <div className="tabs">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeSubTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default Scheduling;
