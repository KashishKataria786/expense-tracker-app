"use client";
import React, { useState } from "react";
import { validTypes, validCategories } from "../../config/utils.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";

const AddTransaction = ({ reload }) => {
  const token = localStorage.getItem('token') || null;
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: validTypes[0],
    category: validCategories[0],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://expense-tracker-app-one-gules.vercel.app/api/transaction/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token, 
          },
          body: JSON.stringify({
            title: form.title,
            amount: parseFloat(form.amount),
            type: form.type,
            category: form.category,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to add transaction");

      const data = await res.json();
      toast.success("Transaction added successfully");
      setForm({
        title: "",
        amount: "",
        type: validTypes[0],
        category: validCategories[0],
      });

      if (reload)reload(); 
    } catch (error) {
      console.error("Error adding transaction:", error.message);
      toast.error("Error adding transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white  rounded-sm p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Add Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
          >
            {validTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
          >
            {validCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-sm font-medium hover:bg-red-700 transition"
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
