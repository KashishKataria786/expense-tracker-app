import React, { useState } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from '../../components/Spinner.jsx'
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [role, setRole] = useState("USER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !cpassword) {
      toast.error("All fields are required!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (password !== cpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      toast.success("Registration successful! 🎉");
      setName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setRole("USER");
      Navigate('/login');
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-sm shadow-xl border border-gray-200">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <RiMoneyDollarCircleFill className="text-red-600 text-5xl" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-3">
          Create Your Account
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Sign up to start managing your finances
        </p>

        {/* Register Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-sm text-sm transition"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-sm text-sm transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-sm text-sm transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 shadow-sm text-sm transition"
            />
          </div>

          {/* Role Toggle */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-xs font-medium text-gray-700">Role:</span>
            <div className="flex items-center space-x-2">
              {["USER", "ADMIN", "READ_ONLY"].map((r) => (
                <label
                  key={r}
                  className={`cursor-pointer px-3 py-1.5 rounded-sm border text-xs font-medium ${
                    role === r
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  } transition`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={role === r}
                    onChange={() => setRole(r)}
                    className="hidden"
                  />
                  {r}
                </label>
              ))}
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 px-4 text-white text-sm font-medium rounded-sm shadow transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-5 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="hover:text-red-600 font-medium">
            {loading ? <Spinner/>:"Login"}
          </a>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default RegisterPage;
