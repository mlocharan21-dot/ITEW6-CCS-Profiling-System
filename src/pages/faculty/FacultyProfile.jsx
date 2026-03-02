import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const FacultyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { faculty, courses, sections } = useApp();
  
  const member = faculty.find(f => f.id === id);

  if (!member) {
    return (
      <div className="fade-in">
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">Faculty not found</h3>
            <p className="empty-state-description">The faculty member you're looking for doesn't exist.</p>
            <button className="btn btn-primary" onClick={() => navigate('/faculty')}>
              Back to Faculty
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mock assigned courses
  const assignedCourses = courses.slice(0, 4);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="page-header-left">
          <button className="btn btn-ghost" onClick={() => navigate('/faculty')}>
            ← Back to Faculty
          </button>
        </div>
      </div>

      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">
            {member.firstName[0]}{member.lastName[0]}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{member.firstName} {member.lastName}</h1>
            <div className="profile-id">{member.id}</div>
            <div className="profile-meta">
              <span className="profile-meta-item">
                📧 {member.email}
              </span>
              <span className="profile-meta-item">
                📱 {member.phone}
              </span>
              <span className="profile-meta-item">
                🏢 {member.office}
              </span>
            </div>
          </div>
          <span className={`badge ${member.status === 'active' ? 'badge-success' : 'badge-error'}`} style={{ fontSize: '14px', padding: '8px 16px' }}>
            {member.status}
          </span>
        </div>
      </div>

      <div className="profile-body">
        <div className="profile-section">
          <h3 className="profile-section-title">Personal Information</h3>
          <div className="profile-detail">
            <span className="profile-detail-label">Full Name</span>
            <span className="profile-detail-value">{member.firstName} {member.lastName}</span>
          </div>
          <div className="profile-detail">
            <span className="profile-detail-label">Email</span>
            <span className="profile-detail-value">{member.email}</span>
          </div>
          <div className="profile-detail">
            <span className="profile-detail-label">Phone</span>
            <span className="profile-detail-value">{member.phone || 'Not provided'}</span>
          </div>
          <div className="profile-detail">
            <span className="profile-detail-label">Office</span>
            <span className="profile-detail-value">{member.office || 'Not assigned'}</span>
          </div>
          <div className="profile-detail">
            <span className="profile-detail-label">Birthday</span>
            <span className="profile-detail-value">{member.birthday || 'Not provided'}</span>
          </div>
        </div>

        <div>
          <div className="profile-section" style={{ marginBottom: '24px' }}>
            <h3 className="profile-section-title">Professional Information</h3>
            <div className="profile-detail">
              <span className="profile-detail-label">Faculty ID</span>
              <span className="profile-detail-value">{member.id}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-detail-label">Department</span>
              <span className="profile-detail-value">{member.department}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-detail-label">Position</span>
              <span className="profile-detail-value">{member.position}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-detail-label">Specialization</span>
              <span className="profile-detail-value">{member.specialization || 'Not specified'}</span>
            </div>
            <div className="profile-detail">
              <span className="profile-detail-label">Status</span>
              <span className="profile-detail-value">
                <span className={`badge ${member.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                  {member.status}
                </span>
              </span>
            </div>
            <div className="profile-detail">
              <span className="profile-detail-label">Hired Date</span>
              <span className="profile-detail-value">{member.hiredDate}</span>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="profile-section-title">Assigned Courses</h3>
            {assignedCourses.map((course) => (
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

export default FacultyProfile;
