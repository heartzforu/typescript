import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

// Define types for form data and errors
interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Yup form validation schema
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    username: yup.string().required("Please select a username"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Set data to the localStorage
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});

      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      localStorage.setItem("users", JSON.stringify([...existingUsers, data]));

      navigate("/");
    } catch (err: any) {
      const newErrors: ValidationErrors = {};
      err.inner.forEach((error: yup.ValidationError) => {
        if (error.path) newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-100">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-lg w-full backdrop-blur-md ">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create a New Account
        </h2>
        {/* Register form section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg text-gray-700">
              Name
            </label>
            <input
            placeholder="Name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className={`w-full p-3 border-2 rounded-lg mt-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="username" className="block text-lg text-gray-700">
              Username
            </label>
            <input
            placeholder="username"
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              className={`w-full p-3 border-2 rounded-lg mt-2 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-2">{errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-lg text-gray-700">
              Email
            </label>
            <input
            placeholder="email"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className={`w-full p-3 border-2 rounded-lg mt-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-lg text-gray-700">
              Password
            </label>
            <input
            placeholder="password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className={`w-full p-3 border-2 rounded-lg mt-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg hover:bg-gradient-to-r hover:from-teal-600 hover:to-blue-600"
          >
            Sign Up
          </button>
        </form>
        {/* Navigation to registered users */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
