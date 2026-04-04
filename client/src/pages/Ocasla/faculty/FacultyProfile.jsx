import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import { MailIcon, PhoneIcon, BuildingIcon, SearchIcon } from '../../../components/common/Icons';

const FacultyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { faculty, fetchFaculty, courses, sections } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.resolve(faculty.length === 0 ? fetchFaculty() : undefined)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="fade-in">
        <div className="page-header">
          <div className="page-header-left">
            <div className="skeleton-cell" style={{ width: '140px', height: '36px', borderRadius: '8px' }} />
          </div>
        </div>
        <div className="profile-header">
          <div className="profile-header-content">
            <div className="skeleton-cell" style={{ width: '72px', height: '72px', borderRadius: '50%' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="skeleton-cell" style={{ width: '200px', height: '24px' }} />
              <div className="skeleton-cell" style={{ width: '100px', height: '16px' }} />
              <div className="skeleton-cell" style={{ width: '300px', height: '16px' }} />
            </div>
          </div>
        </div>
        <div className="profile-body">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="profile-detail">
              <div className="skeleton-cell" style={{ width: '120px', height: '14px' }} />
              <div className="skeleton-cell" style={{ width: '200px', height: '14px' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const member = faculty.find(f => f.id === id);

  if (!member) {
    return (
      <div className="fade-in">
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon"><SearchIcon size={40} stroke="#94a3b8" /></div>
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
                <MailIcon size={14} /> {member.email}
              </span>
              <span className="profile-meta-item">
                <PhoneIcon size={14} /> {member.phone}
              </span>
              <span className="profile-meta-item">
                <BuildingIcon size={14} /> {member.office}
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
