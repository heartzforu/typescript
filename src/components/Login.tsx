import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginData {
  username: string;
  password: string;
}

interface LoginError {
  username: string;
  password: string;
}

function Login() {
  const [data, setData] = useState<LoginData>({ username: "", password: "" });
  const [error, setError] = useState<LoginError>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  // Function to get values from input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Function to check data from the local storage
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedData: LoginData[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    const user = storedData?.find(
      (element) =>
        element.username === data.username && element.password === data.password
    );

    if (user) {
      navigate("/dashboard");
    } else {
      setError({ username: "Invalid username or password", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left">
          Login
        </h1>
        {/* Login form section */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              placeholder="username"
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error.username && (
              <p className="text-red-500 text-sm mt-1">{error.username}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              placeholder="password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:from-green-500 hover:to-blue-600 transition"
          >
            Login
          </button>
          {/* Navigation to Add new user */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
