import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/History';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return (
    <Router>
      {!user ? (
        <div className="container mt-5">
          <h1 className="text-center mb-4 fw-bold">🧪 Test Genie</h1>
          <Login onLogin={setUser} />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard user={user} onLogout={() => signOut(auth)} />} />
          <Route path="/history" element={<HistoryPage user={user} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
