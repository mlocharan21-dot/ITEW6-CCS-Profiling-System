import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, courses } = useApp();
  
  const student = students.find(s => s.id === id);

  if (!student) {
    return (
      <div className="fade-in">
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">Student not found</h3>
            <p className="empty-state-description">The student you're looking for doesn't exist.</p>
            <button className="btn btn-primary" onClick={() => navigate('/students')}>
              Back to Students
            </button>
          </div>
        </div>
      </div>
    );
  }

  const enrolledCourses = courses.slice(0, 5); // Mock enrolled courses

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="page-header-left">
          <button className="btn btn-ghost" onClick={() => navigate('/students')}>
            ← Back to Students
          </button>
        </div>
      </div>

      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">
            {student.firstName[0]}{student.lastName[0]}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{student.firstName} {student.lastName}</h1>
            <div className="profile-id">{student.id}</div>
            <div className="profile-meta">
              <span className="profile-meta-item">
                📧 {student.email}
              </span>
              <span className="profile-meta-item">
                📱 {student.phone}
              </span>
              <span className="profile-meta-item">
                🎓 Year {student.year} - Section {student.section}
              </span>
            </div>
          </div>
          <span className={`badge ${student.status === 'active' ? 'badge-success' : 'badge-error'}`} style={{ fontSize: '14px', padding: '8px 16px' }}>
            {student.status}
          </span>
        </div>
      </div>

      <div className="profile-body">
        <div className="profile-section">
          <h3 className="profile-section-title">Personal Information</h3>
          <div className="profile-detail">
            <span className="profile-detail-label">Full Name</span>
            <span className="profile-detail-value">{student.firstName} {student.lastName}</span>
          </div>
          <div className="profile-detail">
            <span className="profile-detail-label">Email</span>
            <span className="profile-detail-value">{student.email}</span>
          </div>
          <div className="profile-detail">
            <span className="profile-detail-label">Phone</span>
            <span className="profile-detail-value">{student.phone || 'Not provided'}</span>
          </div>
          <div className="profile-detail">
            <span className="profile-detail-label">Address</span>
            <span className="profile-detail-value">{student.address || 'Not provided'}</span>
          </div>
          <div className="profile-detail">
            <span className="profile-detail-label">Birthday</span>
            <span className="profile-detail-value">{student.birthday || 'Not provided'}</span>
          </div>
        </div>

        <div>
          <div className="profile-section" style={{ marginBottom: '24px' }}>
            <h3 className="profile-section-title">Academic Information</h3>
            <div className="profile-detail">
              <span className="profile-detail-label">Student ID</span>
              <span className="profile-detail-value">{student.id}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-detail-label">Year</span>
              <span className="profile-detail-value">{student.year}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-detail-label">Section</span>
              <span className="profile-detail-value">{student.section}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-detail-label">Status</span>
              <span className="profile-detail-value">
                <span className={`badge ${student.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                  {student.status}
                </span>
              </span>
            </div>
            <div className="profile-detail">
              <span className="profile-detail-label">Enrolled Date</span>
              <span className="profile-detail-value">{student.enrolledDate}</span>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="profile-section-title">Enrolled Courses</h3>
            {enrolledCourses.map((course) => (
              <div key={course.id} className="profile-detail">
                <span className="profile-detail-label">{course.id}</span>
                <span className="profile-detail-value">{course.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
