import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/Layout/DashboardLayout.jsx'
import CategoryWiseExpenseBreakDown from '../components/Analytics/CategoryWiseExpenseBreakDown.jsx'
import ExpenseVsIncome from '../components/Analytics/ExpenseVsIncome.jsx';

const AnalyticsPage = () => {
  const token= localStorage.getItem('token');
  const [transactions,setTransactions]=useState([]);
  const [loading,setLoading]= useState(false);

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

  useEffect(()=>{
    fetchTransactions();
  },[])

  return (
    <DashboardLayout>
      <h1 className='text-3xl font-semibold '>Analytics</h1>
      <div className='grid grid-cols-5 my-5 gap-2 '>
        <div className='col-span-3'>
<CategoryWiseExpenseBreakDown data={transactions} loading={loading}/>
        </div>
        <div className='col-span-2'>
          <ExpenseVsIncome data={transactions} loading={loading}/>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AnalyticsPage
