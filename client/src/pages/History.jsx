import React from 'react';
import { useNavigate } from 'react-router-dom';
import TestHistory from '../components/TestHistory';

const HistoryPage = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate('/')}>
        ← Back to Dashboard
      </button>
      <h2 className="mb-3">📚 My Test History</h2>
      <TestHistory user={user} />
    </div>
  );
};

export default HistoryPage;
