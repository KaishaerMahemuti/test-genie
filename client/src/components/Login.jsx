import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => onLogin(userCredential.user))
      .catch((err) => alert(err.message));
  };

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => onLogin(userCredential.user))
      .catch((err) => alert(err.message));
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => onLogin(result.user))
      .catch((err) => alert(err.message));
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <h1 className="mb-4 fw-bold">🧪 Test Genie</h1>  {/* Moved outside the card */}
  
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <p className="text-muted text-center mb-4">Login or Register to Generate Smart Tests</p>
  
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
  
        <div className="d-grid gap-2 mb-2">
          <button className="btn btn-primary" onClick={loginWithEmail}>Login</button>
          <button className="btn btn-secondary" onClick={register}>Register</button>
        </div>
  
        <hr />
        <button className="btn btn-danger w-100" onClick={loginWithGoogle}>Login with Google</button>
      </div>
    </div>
  );
  
};

export default Login;
