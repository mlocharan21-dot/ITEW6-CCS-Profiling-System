import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useApp();

  const navItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/students', icon: '👥', label: 'Students' },
    { path: '/faculty', icon: '👨‍🏫', label: 'Faculty' },
    { 
      path: '/instruction', 
      icon: '📚', 
      label: 'Instruction',
      subItems: [
        { path: '/instruction/syllabus', label: 'Syllabus' },
        { path: '/instruction/lessons', label: 'Lessons' },
        { path: '/instruction/curriculum', label: 'Curriculum' },
        { path: '/instruction/scheduling', label: 'Scheduling' }
      ]
    },
    { path: '/events', icon: '📅', label: 'Events' }
  ];

  return (
    <>
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} 
        onClick={() => setSidebarOpen(false)}
      />
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">CCS</div>
            <div>
              <div className="sidebar-logo-text">Profiling</div>
              <div className="sidebar-logo-subtitle">System</div>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Main Menu</div>
            {navItems.slice(0, 3).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="nav-item-icon">{item.icon}</span>
                <span className="nav-item-text">{item.label}</span>
              </NavLink>
            ))}
          </div>
          
          <div className="nav-section">
            <div className="nav-section-title">Academic</div>
            {navItems.slice(3).map((item) => (
              item.subItems ? (
                <div key={item.path}>
                  <div className="nav-item" style={{ opacity: 0.6, cursor: 'default' }}>
                    <span className="nav-item-icon">{item.icon}</span>
                    <span className="nav-item-text">{item.label}</span>
                  </div>
                  {item.subItems.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                      style={{ paddingLeft: '44px' }}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="nav-item-text">{subItem.label}</span>
                    </NavLink>
                  ))}
                </div>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="nav-item-icon">{item.icon}</span>
                  <span className="nav-item-text">{item.label}</span>
                </NavLink>
              )
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
