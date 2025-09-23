
import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaTrash, FaEdit } from "react-icons/fa";
import Spinner from '../Spinner.jsx'
import SideModal from "../SideModal.jsx";
import AddTransaction from "./AddTransaction.jsx";
import EditTransaction from "./EditTransaction.jsx";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const[openAddModal,setOpenAddModal]= useState(false);
  const [openEditModal,setOpenEditModal]= useState(false);
  const [selectTransaction,setSelectTransaction]= useState(null);
  const token = localStorage.getItem('token') || null;

  const fetchTransactions = async () => {
    setLoading(true);
    if((!token))return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/transaction`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch transactions");

      const data = await res.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/transaction/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, 
        },
      }
    );

    if (!res.ok) throw new Error("Failed to delete transaction");

    await res.json();
    fetchTransactions(); 
  } catch (error) {
    console.error("Error deleting transaction:", error.message);
  }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
    <div className="bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Transactions</h2>
        <button onClick={()=>setOpenAddModal(true)} className="px-6 font-semibold  text-white py-2 bg-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500">Add</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500"><Spinner/></div>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase tracking-wide text-xs border-b">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3 text-right">Amount</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {tx.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      {tx.type === "INCOME" ? (
                        <FaArrowUp className="text-green-500" />
                      ) : (
                        <FaArrowDown className="text-red-500" />
                      )}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          tx.type === "INCOME"
                            ? "bg-green-50 text-green-600 border-green-200"
                            : "bg-red-50 text-red-600 border-red-200"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold text-right ${
                        tx.type === "INCOME" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ₹{tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(tx.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button
                        onClick={()=>{setSelectTransaction(tx.id) 
                          setOpenEditModal(true)}}
                        className="p-2 rounded-sm bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(tx.id)}
                        className="p-2 rounded-sm bg-red-100 text-red-700 hover:bg-red-200 transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-gray-400 italic"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
    <SideModal isOpen={openAddModal} onClose={()=>setOpenAddModal(false)} >
      <AddTransaction reload={()=>{
        fetchTransactions()
        setOpenAddModal(false);
      }}/>
    </SideModal>
    <SideModal isOpen={openEditModal} onClose={()=>setOpenEditModal(false)} >
      <EditTransaction id={selectTransaction}  reload={()=>{
        fetchTransactions();
        setOpenEditModal(false);
      }}/>
    </SideModal>
    </>
    
  );
};

export default TransactionList;
