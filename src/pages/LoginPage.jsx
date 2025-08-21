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
    setError("");
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    
    try {
      // Since fakestoreapi doesn't have real auth, we'll simulate it
      // For demo purposes, accept any non-empty credentials
      const mockToken = "fake-jwt-token-" + Date.now();
      login(mockToken);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-400 to-indigo-500 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md space-y-4 sm:space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">Login</h2>
        <p className="text-center text-gray-500 text-sm sm:text-base">
          Enter your credentials to access your account
        </p>

        <div className="flex flex-col space-y-3 sm:space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-sm sm:text-base"
            placeholder="Enter Username"
          />
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-sm sm:text-base"
            placeholder="Enter Password"
          />
        </div>

        {error && (
          <p className="text-red-500 text-center font-medium text-sm sm:text-base">{error}</p>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 transition-all text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg w-full sm:w-auto text-sm sm:text-base"
          >
            Login
          </button>
          <button
            type="#"
            className="border border-sky-500 text-sky-500 hover:bg-sky-50 transition-all font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg w-full sm:w-auto text-sm sm:text-base"
          >
            Register
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4">
          © 2025 Danish Store. All rights reserved.
        </p>
      </form>
    </div>
  );
}
