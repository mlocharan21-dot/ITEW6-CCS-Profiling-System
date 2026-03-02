import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Instruction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('syllabus');

  const tabs = [
    { id: 'syllabus', label: 'Syllabus', path: '/instruction/syllabus' },
    { id: 'lessons', label: 'Lessons', path: '/instruction/lessons' },
    { id: 'curriculum', label: 'Curriculum', path: '/instruction/curriculum' },
    { id: 'scheduling', label: 'Scheduling', path: '/instruction/scheduling' }
  ];

  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/instruction') {
      navigate('/instruction/syllabus');
    } else if (path.includes('syllabus')) {
      setActiveTab('syllabus');
    } else if (path.includes('lessons')) {
      setActiveTab('lessons');
    } else if (path.includes('curriculum')) {
      setActiveTab('curriculum');
    } else if (path.includes('scheduling')) {
      setActiveTab('scheduling');
    }
  }, [location.pathname, navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-header-title">Instruction</h1>
          <p className="page-header-subtitle">Manage curriculum, lessons, and scheduling</p>
        </div>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
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

export default Instruction;
