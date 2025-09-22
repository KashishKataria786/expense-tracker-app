import React , {useContext}from 'react'
import DashboardLayout from '../components/Layout/DashboardLayout'
import {AuthContext} from '../context/AuthContext.jsx'

const DashboardPage = () => {

    const {user, loggedIn}= useContext(AuthContext);

  return (
    <DashboardLayout>
      Dashbaord
      {JSON.stringify(user,null,2)}
    </DashboardLayout>
  )
}

export default DashboardPage
