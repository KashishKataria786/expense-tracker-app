import React from 'react'
import DashboardLayout from '../components/Layout/DashboardLayout.jsx'
import TransactionList from '../components/transaction/TransactionList.jsx'

const TransactionsPage = () => {
  return (
    <DashboardLayout>
      <h1 className='text-3xl mb-5 font-semibold '>Transactions</h1>
      <TransactionList/>
    </DashboardLayout>
  )
}

export default TransactionsPage
