import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './components.css';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/login', { email, password });
      setToken(res.data.token);
      navigate('/users');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setError(`Cette adresse mail n'est associée à aucun compte`);
        } else if (error.response.status === 400) {
          setError(`Mot de passe incorrect`);
        } else {
          setError(`Erreur: ${error.response.status}`);
        }
      } else {
        setError(`Erreur de réseau ou autre: ${error.message}`);
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>

      <p className="signup-text">
        Pas de compte ? <a href="/register">S'inscrire</a>
      </p>
    </div>
  );
};

export default Login;
