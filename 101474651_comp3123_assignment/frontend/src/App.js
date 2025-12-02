import React, { useState } from 'react';
import EmployeeManager from './EmployeeManager';
import './App.css';

function App() {
  const [showEmployeeUI, setShowEmployeeUI] = useState(false);

  if (showEmployeeUI) {
    return <EmployeeManager onBack={() => setShowEmployeeUI(false)} />;
  }

  const handleLoginClick = () => {
    alert('Login functionality will be implemented next!');
  };

  return (
    <div className="App" style={{ padding: '24px' }}>
      <h1>Employee Management System</h1>
      <h2>COMP 3123 Assignment 2</h2>

      <div
        style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb',
          padding: '12px 16px',
          margin: '16px 0',
          borderRadius: 4,
        }}
      >
        ✅ Employee Management API is working! - Backend is connected!
      </div>

      <h3>Available Endpoints:</h3>
      <ul>
        <li>
          <a href="http://localhost:5000/api" target="_blank" rel="noreferrer">
            /api
          </a>{' '}
          - API Status
        </li>
        <li>
          <a
            href="http://localhost:5000/api/employees"
            target="_blank"
            rel="noreferrer"
          >
            /api/employees
          </a>{' '}
          - Employee List (raw JSON)
        </li>
        <li>
          <a
            href="http://localhost:5000/api/health"
            target="_blank"
            rel="noreferrer"
          >
            /api/health
          </a>{' '}
          - Health Check
        </li>
      </ul>

      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <button onClick={handleLoginClick}>Go to Login</button>

        {/* New button to open the real React CRUD UI */}
        <button
          onClick={() => setShowEmployeeUI(true)}
          style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4 }}
        >
          Open Employee UI
        </button>
      </div>
    </div>
  );
}

export default App;
