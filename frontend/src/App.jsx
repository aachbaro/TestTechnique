import { React, useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UsersList from "./components/UsersList";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UsersList token={token} setToken={setToken} />} />
          <Route path="*" element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
