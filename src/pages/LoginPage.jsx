import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        username: username,
        password: password,
      });
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div
      className="w-full h-1/2 flex justify-center align-content-center my-3 "
      style={{ height: 300 }}
    >
      <form onSubmit={handleLogin} className="w-[50%] border-2 p-5 ">
        <h2>Login</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full my-3.5 h-12 px-1.5"
          placeholder="Enter Username "
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-1.5"
          placeholder="Enter Password"
        />
        <button
          type="submit"
          className="bg-sky-500 mt-3.5 px-5 py-2 rounded-[5px]"
        >
          Login
        </button>
        <button
          type="#"
          className="outline-blue-600 border-sky-500 border-2 mt-3.5 px-5 py-2 rounded-[5px] mx-2"
        >
          Register
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
