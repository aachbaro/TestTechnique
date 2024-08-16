import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UsersList = ({ token, setToken }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError("Vous devez être connecté pour accéder à cette page.");
        return;
      }
      
      try {
        const res = await axios.get("http://localhost:8000/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
            setError("Token invalide ou expiré. Veuillez vous reconnecter.");
            setToken(null);
            navigate("/login");
          } else {
            setError(`Erreur: ${error.response.status}`);
          }
        } else {
          setError(`Erreur de réseau ou autre: ${error.message}`);
        }
      }
    };

    fetchUsers();
  }, [token, navigate, setToken]);

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  if (!token) {
    return (
      <div>
        <h2>Accès interdit</h2>
        <p>{error}</p>
        <button onClick={handleLogin}>Se connecter</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.email}</li>
        ))}
      </ul>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default UsersList;
