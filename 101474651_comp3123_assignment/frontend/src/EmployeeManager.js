import React, { useEffect, useState } from 'react';

// Use relative API paths so CRA proxy sends them to http://localhost:5000
const API_BASE = '/api/employees';
const SEARCH_API = '/api/employees/search';

function EmployeeManager({ onBack }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: '',
  });

  // Load all employees on mount
  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch employees');
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Search handler
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      // Empty search → show all
      loadEmployees();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${SEARCH_API}?q=${encodeURIComponent(value)}`);
      if (!res.ok) throw new Error('Failed to search employees');
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to search employees');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      salary: '',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const payload = {
        ...form,
        salary: Number(form.salary),
      };

      let res;
      if (isEditing && editingId) {
        // UPDATE
        res = await fetch(`${API_BASE}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        // CREATE
        res = await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const msg = errBody.error || 'Request failed';
        throw new Error(msg);
      }

      await loadEmployees();
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save employee');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (emp) => {
    setForm({
      first_name: emp.first_name || '',
      last_name: emp.last_name || '',
      email: emp.email || '',
      gender: emp.gender || '',
      salary: emp.salary != null ? String(emp.salary) : '',
    });
    setIsEditing(true);
    setEditingId(emp._id);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('Are you sure you want to delete this employee?');
    if (!ok) return;

    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete employee');
      await loadEmployees();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to delete employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <button className="back-btn secondary" onClick={onBack} style={{ marginBottom: 16 }}>
        ← Back to Home
      </button>

      <h1>Employee Management UI (React)</h1>
      <p>
        This screen is powered by the backend API at <code>/api/employees</code>.
      </p>

      {/* Search panel */}
      <div className="panel" style={{ marginTop: 20 }}>
        <h2>Search Employees</h2>
        <p style={{ marginBottom: 10 }}>Filter by first name, last name, or email.</p>
        <div className="search-box">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Type to search..."
          />
        </div>
      </div>

      {/* Error / loading */}
      {error && <div className="error">{error}</div>}
      {loading && <p>Loading...</p>}

      {/* Create / Update form */}
      <div className="panel">
        <h2>{isEditing ? 'Update Employee' : 'Create Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label>
              First Name
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Last Name
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Gender
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Salary
              <input
                type="number"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button type="submit">
              {isEditing ? 'Update Employee' : 'Create Employee'}
            </button>
            {isEditing && (
              <button
                type="button"
                className="secondary"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Employee table */}
      <div className="panel">
        <h2>Employee List</h2>
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th style={{ textAlign: 'right' }}>Salary</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.first_name}</td>
                  <td>{emp.last_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.gender}</td>
                  <td style={{ textAlign: 'right' }}>{emp.salary}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      style={{ marginRight: 8 }}
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      className="secondary"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EmployeeManager;
