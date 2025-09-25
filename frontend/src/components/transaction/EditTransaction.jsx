"use client";
import React, { useState, useEffect } from "react";
import { validTypes, validCategories } from "../../config/utils.js";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";

const EditTransaction = ({ id, reload }) => {
  const token = localStorage.getItem("token") || null;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState(validTypes[0]);
  const [category, setCategory] = useState(validCategories[0]);
  const [loading, setLoading] = useState(false);
  const {user}=useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/transaction/edit/${id}`,
        {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, 
          },
          body: JSON.stringify({
            title,
            amount: parseFloat(amount),
            type,
            category,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update transaction");

      toast.success("Transaction updated successfully");

      if (reload) reload();
    } catch (error) {
      console.error("Error updating transaction:", error.message);
      toast.error("Error updating transaction");
    } finally {
      setLoading(false);
    }
  };

  const fetchTransaction = async () => {
    if (!token || !id) return;
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/transaction/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch transaction");
      let data = await res.json();
      data=data?.singleTransaction
      console.log("Data",data);
      setTitle(data?.title || "");
      setAmount(data?.amount || 0);
      setType(data?.type || validTypes[0]);
      setCategory(data?.category || validCategories[0]);
    } catch (error) {
      console.error("Error fetching transaction:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  return (
    <div className="bg-white rounded-sm p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Edit Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
          >
            {validTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
          >
            {validCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

       
        <button
      disabled={user?.role === "READ_ONLY"}
      className={`w-full text-white py-2 rounded-sm font-medium transition 
    ${
      user?.role === "READ_ONLY"
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-red-600 hover:bg-red-700"
    }`}
    >
      {loading ? "Updating..." : "Update Transaction"}
    </button>
      </form>
    </div>
  );
};

export default EditTransaction;
