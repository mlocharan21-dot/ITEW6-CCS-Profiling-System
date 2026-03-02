import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import { DataTable, Modal, FormInput } from '../../../components';

const FacultyList = () => {
  const navigate = useNavigate();
  const { faculty, addFaculty, updateFaculty, deleteFaculty } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    specialization: '',
    office: '',
    status: 'active',
    birthday: ''
  });
  const [errors, setErrors] = useState({});

  const filteredFaculty = useMemo(() => {
    return faculty.filter(member => {
      const matchesSearch = 
        member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = !filterDepartment || member.department === filterDepartment;
      const matchesPosition = !filterPosition || member.position === filterPosition;
      const matchesStatus = !filterStatus || member.status === filterStatus;
      
      return matchesSearch && matchesDepartment && matchesPosition && matchesStatus;
    });
  }, [faculty, searchTerm, filterDepartment, filterPosition, filterStatus]);

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { 
      key: 'name', 
      header: 'Name', 
      sortable: true,
      render: (_, row) => `${row.firstName} ${row.lastName}`
    },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'position', header: 'Position', sortable: true },
    { 
      key: 'status', 
      header: 'Status', 
      sortable: true,
      render: (status) => (
        <span className={`badge ${status === 'active' ? 'badge-success' : 'badge-error'}`}>
          {status}
        </span>
      )
    }
  ];

  const handleAdd = () => {
    setSelectedFaculty(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      specialization: '',
      office: '',
      status: 'active',
      birthday: ''
    });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (member) => {
    setSelectedFaculty(member);
    setFormData({
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      phone: member.phone,
      department: member.department,
      position: member.position,
      specialization: member.specialization,
      office: member.office,
      status: member.status,
      birthday: member.birthday
    });
    setErrors({});
    setShowModal(true);
  };

  const handleView = (member) => {
    navigate(`/faculty/${member.id}`);
  };

  const handleDelete = (member) => {
    setSelectedFaculty(member);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedFaculty) {
      deleteFaculty(selectedFaculty.id);
      setShowDeleteConfirm(false);
      setSelectedFaculty(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.position) newErrors.position = 'Position is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (selectedFaculty) {
      updateFaculty(selectedFaculty.id, formData);
    } else {
      addFaculty(formData);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const departments = [...new Set(faculty.map(f => f.department))];
  const positions = [...new Set(faculty.map(f => f.position))];

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-header-title">Faculty</h1>
          <p className="page-header-subtitle">Manage faculty records</p>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          ➕ Add Faculty
        </button>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="table-filters" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '250px' }}
          />
          <select 
            className="filter-select" 
            value={filterDepartment} 
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select 
            className="filter-select" 
            value={filterPosition} 
            onChange={(e) => setFilterPosition(e.target.value)}
          >
            <option value="">All Positions</option>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
          <select 
            className="filter-select" 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredFaculty}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No faculty found"
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedFaculty ? 'Edit Faculty' : 'Add Faculty'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {selectedFaculty ? 'Update' : 'Add'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <FormInput
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
            />
            <FormInput
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <FormInput
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Department"
              name="department"
              type="select"
              value={formData.department}
              onChange={handleChange}
              error={errors.department}
              required
              options={[
                { value: 'Computer Science', label: 'Computer Science' },
                { value: 'Information Technology', label: 'Information Technology' }
              ]}
            />
            <FormInput
              label="Position"
              name="position"
              type="select"
              value={formData.position}
              onChange={handleChange}
              error={errors.position}
              required
              options={[
                { value: 'Professor', label: 'Professor' },
                { value: 'Associate Professor', label: 'Associate Professor' },
                { value: 'Assistant Professor', label: 'Assistant Professor' },
                { value: 'Lecturer', label: 'Lecturer' }
              ]}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
            />
            <FormInput
              label="Office"
              name="office"
              value={formData.office}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <FormInput
              label="Status"
              name="status"
              type="select"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ]}
            />
            <FormInput
              label="Birthday"
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Confirm Delete"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={confirmDelete}>
              Delete
            </button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>{selectedFaculty?.firstName} {selectedFaculty?.lastName}</strong>? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default FacultyList;
