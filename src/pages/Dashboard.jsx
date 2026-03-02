import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { activities } from '../data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const { getStats } = useApp();
  const stats = getStats();

  const statCards = [
    { label: 'Total Students', value: stats.totalStudents, icon: '👥', color: 'blue', change: '+5 this week' },
    { label: 'Active Students', value: stats.activeStudents, icon: '✅', color: 'green', change: `${((stats.activeStudents / stats.totalStudents) * 100).toFixed(0)}% active` },
    { label: 'Total Faculty', value: stats.totalFaculty, icon: '👨‍🏫', color: 'purple', change: '+2 this semester' },
    { label: 'Total Courses', value: stats.totalCourses, icon: '📚', color: 'yellow', change: '15 this year' },
    { label: 'Curricular Events', value: stats.curricularEvents, icon: '🎓', color: 'orange', change: 'this semester' },
    { label: 'Extra Activities', value: stats.extraCurricularEvents, icon: '🎉', color: 'red', change: 'this semester' }
  ];

  const quickActions = [
    { icon: '➕', label: 'Add Student', path: '/students', action: () => navigate('/students') },
    { icon: '👨‍🏫', label: 'Add Faculty', path: '/faculty', action: () => navigate('/faculty') },
    { icon: '📅', label: 'Add Event', path: '/events', action: () => navigate('/events') },
    { icon: '📊', label: 'View Reports', path: '/instruction', action: () => navigate('/instruction') }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'student': return { icon: '👤', bg: '#dbeafe', color: '#1e40af' };
      case 'faculty': return { icon: '👨‍🏫', bg: '#d1fae5', color: '#065f46' };
      case 'event': return { icon: '📅', bg: '#fef3c7', color: '#92400e' };
      case 'schedule': return { icon: '⏰', bg: '#f3e8ff', color: '#7c3aed' };
      default: return { icon: '📌', bg: '#e5e7eb', color: '#6b7280' };
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-header-title">Dashboard</h1>
          <p className="page-header-subtitle">Welcome to CCS Comprehensive Profiling System</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <div 
                key={index} 
                className="quick-action"
                onClick={action.action}
              >
                <div className="quick-action-icon">{action.icon}</div>
                <span className="quick-action-label">{action.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Activities</h3>
          </div>
          <div className="activity-list">
            {activities.map((activity) => {
              const { icon, bg, color } = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="activity-item">
                  <div 
                    className="activity-icon" 
                    style={{ background: bg, color }}
                  >
                    {icon}
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
