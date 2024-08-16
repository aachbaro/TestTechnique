import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './components.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post("http://localhost:8000/register", {
        email,
        password,
      });

      if (response && response.data) {
        console.log(response.data);
        navigate("/login");
      } else {
        console.error("No data found in the response");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          setError(`Cet adresse mail est déjà associée à un compte`);
        } else {
          setError(`Erreur: ${error.response.status}`);
        }
      } else {
        setError(`Erreur de réseau ou autre: ${error.message}`);
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Inscription</h2>
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
        <button type="submit">S'inscrire</button>
      </form>
      <p className="signup-text">
        Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
};

export default Register;
