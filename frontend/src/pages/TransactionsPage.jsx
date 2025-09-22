import React from 'react'
import DashboardLayout from '../components/Layout/DashboardLayout.jsx'
import TransactionList from '../components/transaction/TransactionList.jsx'

const TransactionsPage = () => {
  return (
    <DashboardLayout>
      <TransactionList/>
    </DashboardLayout>
  )
}

export default TransactionsPage
