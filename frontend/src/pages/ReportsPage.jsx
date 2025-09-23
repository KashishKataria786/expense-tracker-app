import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/Layout/DashboardLayout.jsx'
import DownloadPDFReport from '../components/reports/DownloadPDFReport.jsx';

const ReportsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token') || null;
  
    const fetchTransactions = async () => {
      setLoading(true);
      if((!token))return;
      try {
        const res = await fetch(
          `https://expense-tracker-app-one-gules.vercel.app/api/transaction`,
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

    useEffect(()=>{fetchTransactions()},[]);
  
  return (
    <DashboardLayout>
      <h1 className='text-3xl mb-5 font-semibold '>Reports</h1>
      <DownloadPDFReport data={transactions}/>
    </DashboardLayout>
  )
}

export default ReportsPage
