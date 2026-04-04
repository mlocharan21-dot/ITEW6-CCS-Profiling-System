import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import {
  UsersIcon, CheckIcon, TeacherIcon, BookIcon,
  GraduationIcon, StarIcon, PlusIcon, CalendarIcon,
  BarChartIcon, UserIcon, ClockIcon, ActivityIcon,
} from '../components/common/Icons';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0, activeStudents: 0, totalFaculty: 0, activeFaculty: 0,
    totalCourses: 0, totalEvents: 0, curricularEvents: 0, extraCurricularEvents: 0,
  });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.get('/dashboard/stats').then(setStats).catch(() => {});
    api.get('/activities').then(setActivities).catch(() => {});
  }, []);

  const statCards = [
    { label: 'Total Students',    value: stats.totalStudents,         icon: <UsersIcon size={22} />,      color: 'blue',   change: '+5 this week' },
    { label: 'Active Students',   value: stats.activeStudents,        icon: <CheckIcon size={22} />,      color: 'green',  change: `${stats.totalStudents ? ((stats.activeStudents / stats.totalStudents) * 100).toFixed(0) : 0}% active` },
    { label: 'Total Faculty',     value: stats.totalFaculty,          icon: <TeacherIcon size={22} />,    color: 'purple', change: '+2 this semester' },
    { label: 'Total Courses',     value: stats.totalCourses,          icon: <BookIcon size={22} />,       color: 'yellow', change: 'this year' },
    { label: 'Curricular Events', value: stats.curricularEvents,      icon: <GraduationIcon size={22} />, color: 'orange', change: 'this semester' },
    { label: 'Extra Activities',  value: stats.extraCurricularEvents, icon: <StarIcon size={22} />,       color: 'red',    change: 'this semester' },
  ];

  const quickActions = [
    { icon: <PlusIcon size={22} />,      label: 'Add Student',  action: () => navigate('/students') },
    { icon: <TeacherIcon size={22} />,   label: 'Add Faculty',  action: () => navigate('/faculty') },
    { icon: <CalendarIcon size={22} />,  label: 'Add Event',    action: () => navigate('/events') },
    { icon: <BarChartIcon size={22} />,  label: 'View Reports', action: () => navigate('/instruction') },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'student':  return { icon: <UserIcon size={18} />,     bg: '#dbeafe', color: '#1e40af' };
      case 'faculty':  return { icon: <TeacherIcon size={18} />,  bg: '#d1fae5', color: '#065f46' };
      case 'event':    return { icon: <CalendarIcon size={18} />, bg: '#fef3c7', color: '#92400e' };
      case 'schedule': return { icon: <ClockIcon size={18} />,    bg: '#f3e8ff', color: '#7c3aed' };
      default:         return { icon: <ActivityIcon size={18} />, bg: '#e5e7eb', color: '#6b7280' };
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
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <div key={index} className="quick-action" onClick={action.action}>
                <div className="quick-action-icon">{action.icon}</div>
                <span className="quick-action-label">{action.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Activities</h3>
          </div>
          <div className="activity-list">
            {activities.length === 0 && (
              <p style={{ color: '#94a3b8', padding: '16px', textAlign: 'center' }}>No recent activity</p>
            )}
            {activities.map((activity) => {
              const { icon, bg, color } = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon" style={{ background: bg, color }}>{icon}</div>
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
