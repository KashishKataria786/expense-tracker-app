import React, { useState } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both Emai and Password");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigate('/dashboard')
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl p-10 bg-white rounded-sm shadow-2xl border border-gray-200">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <RiMoneyDollarCircleFill className="text-red-600 text-5xl" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Login to continue to ExpenseTracker
        </p>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="text"
              id="userId"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm text-sm transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm text-sm transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-sm shadow hover:bg-red-700 transition duration-300 flex items-center justify-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <a href="#" className="hover:text-red-600 font-medium">
            Forgot Email?
          </a>{" "}
          |{" "}
          <a href="/register" className="hover:text-red-600 font-medium">
            Create Account
          </a>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
