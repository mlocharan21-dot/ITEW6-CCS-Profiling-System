import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { DataTable, Modal, FormInput, PlusIcon } from "../../../components";

const StudentList = () => {
  const navigate = useNavigate();
  const { students, fetchStudents, addStudent, updateStudent, deleteStudent } =
    useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents().finally(() => setLoading(false));
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterSection, setFilterSection] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    year: "",
    section: "",
    status: "active",
    address: "",
    birthday: "",
  });
  const [errors, setErrors] = useState({});

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(student.id).toLowerCase().includes(searchTerm.toLowerCase());

      const matchesYear = !filterYear || student.year === parseInt(filterYear);
      const matchesSection =
        !filterSection || student.section === filterSection;
      const matchesStatus = !filterStatus || student.status === filterStatus;

      return matchesSearch && matchesYear && matchesSection && matchesStatus;
    });
  }, [students, searchTerm, filterYear, filterSection, filterStatus]);

  const columns = [
    { key: "id", header: "ID", sortable: true },
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    { key: "email", header: "Email", sortable: true },
    { key: "year", header: "Year", sortable: true },
    { key: "section", header: "Section", sortable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (status) => (
        <span
          className={`badge ${status === "active" ? "badge-success" : "badge-error"}`}
        >
          {status === "active" ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setSelectedStudent(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      year: "",
      section: "",
      status: "active",
      address: "",
      birthday: "",
    });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      year: student.year,
      section: student.section,
      status: student.status,
      address: student.address,
      birthday: student.birthday,
    });
    setErrors({});
    setShowModal(true);
  };

  const handleView = (student) => {
    navigate(`/students/${student.id}`);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      deleteStudent(selectedStudent.id);
      setShowDeleteConfirm(false);
      setSelectedStudent(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.section) newErrors.section = "Section is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (selectedStudent) {
      updateStudent(selectedStudent.id, formData);
    } else {
      addStudent(formData);
    }
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-header-title">Students</h1>
          <p className="page-header-subtitle">Manage student records</p>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <PlusIcon size={15} /> Add Student
        </button>
      </div>

      <div className="card" style={{ marginBottom: "24px" }}>
        <div
          className="table-filters"
          style={{ flexWrap: "wrap", gap: "12px" }}
        >
          <input
            type="text"
            className="form-input"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "250px" }}
          />
          <select
            className="filter-select"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>
          <select
            className="filter-select"
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
          >
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
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
        data={filteredStudents}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        emptyMessage="No students found"
        loading={loading}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedStudent ? "Edit Student" : "Add Student"}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {selectedStudent ? "Update" : "Add"}
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
              label="Year"
              name="year"
              type="select"
              value={formData.year}
              onChange={handleChange}
              error={errors.year}
              required
              options={[
                { value: "1", label: "Year 1" },
                { value: "2", label: "Year 2" },
                { value: "3", label: "Year 3" },
                { value: "4", label: "Year 4" },
              ]}
            />
            <FormInput
              label="Section"
              name="section"
              type="select"
              value={formData.section}
              onChange={handleChange}
              error={errors.section}
              required
              options={[
                { value: "A", label: "Section A" },
                { value: "B", label: "Section B" },
                { value: "C", label: "Section C" },
              ]}
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
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
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
          <FormInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Confirm Delete"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={confirmDelete}>
              Delete
            </button>
          </>
        }
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>
            {selectedStudent?.firstName} {selectedStudent?.lastName}
          </strong>
          ? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default StudentList;
