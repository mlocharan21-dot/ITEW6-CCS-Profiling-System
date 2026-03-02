import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Header = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { students, faculty, courses, events, setSidebarOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = [];

    // Search students
    const matchedStudents = students.filter(s => 
      s.firstName.toLowerCase().includes(query) || 
      s.lastName.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query) ||
      s.id.toLowerCase().includes(query)
    ).slice(0, 3);
    
    matchedStudents.forEach(student => {
      results.push({
        type: 'student',
        title: `${student.firstName} ${student.lastName}`,
        subtitle: student.id,
        path: `/students/${student.id}`
      });
    });

    // Search faculty
    const matchedFaculty = faculty.filter(f => 
      f.firstName.toLowerCase().includes(query) || 
      f.lastName.toLowerCase().includes(query) ||
      f.email.toLowerCase().includes(query) ||
      f.id.toLowerCase().includes(query)
    ).slice(0, 3);

    matchedFaculty.forEach(member => {
      results.push({
        type: 'faculty',
        title: `${member.firstName} ${member.lastName}`,
        subtitle: member.id,
        path: `/faculty/${member.id}`
      });
    });

    // Search courses
    const matchedCourses = courses.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.id.toLowerCase().includes(query)
    ).slice(0, 3);

    matchedCourses.forEach(course => {
      results.push({
        type: 'course',
        title: course.name,
        subtitle: course.id,
        path: '/instruction/scheduling/courses'
      });
    });

    // Search events
    const matchedEvents = events.filter(e => 
      e.title.toLowerCase().includes(query) ||
      e.category.toLowerCase().includes(query)
    ).slice(0, 3);

    matchedEvents.forEach(event => {
      results.push({
        type: 'event',
        title: event.title,
        subtitle: event.date,
        path: '/events'
      });
    });

    setSearchResults(results);
    setShowResults(results.length > 0);
  }, [searchQuery, students, faculty, courses, events]);

  const handleResultClick = (path) => {
    navigate(path);
    setSearchQuery('');
    setShowResults(false);
  };

  const getPageTitle = () => {
    if (title) return title;
    
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/students')) return 'Students';
    if (path.startsWith('/faculty')) return 'Faculty';
    if (path.startsWith('/instruction')) return 'Instruction';
    if (path.startsWith('/events')) return 'Events';
    return 'CCS Profiling System';
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-toggle"
          onClick={() => setSidebarOpen(!useApp().sidebarOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <h1 className="page-title">{getPageTitle()}</h1>
      </div>

      <div className="header-center" ref={searchRef}>
        <div className="search-container">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search students, faculty, courses, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowResults(true)}
          />
          {showResults && (
            <div className="search-results">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => handleResultClick(result.path)}
                >
                  <div className={`search-result-icon ${result.type}`}>
                    {result.type === 'student' && '👤'}
                    {result.type === 'faculty' && '👨‍🏫'}
                    {result.type === 'course' && '📚'}
                    {result.type === 'event' && '📅'}
                  </div>
                  <div className="search-result-info">
                    <div className="search-result-title">{result.title}</div>
                    <div className="search-result-subtitle">{result.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="header-right">
        <button className="header-icon-btn notification-badge">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        
        <div className="user-profile">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <div className="user-name">Admin</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
