import React from 'react';
import TestGenForm from '../components/TestGenForm';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>🧪 Test Genie</h1>
        <div>
          <span className="me-3">Welcome, {user.email}</span>
          <button onClick={onLogout} className="btn btn-sm btn-outline-danger">Logout</button>
        </div>
      </div>

      <button className="btn btn-outline-primary mb-3" onClick={() => navigate('/history')}>
        📚 View My Test History
      </button>

      <TestGenForm user={user} />
    </div>
  );
};

export default Dashboard;
