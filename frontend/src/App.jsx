
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/auth/login.jsx'
import Register from './pages/auth/Register.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import TransactionsPage from './pages/TransactionsPage.jsx'
import ProtectedRoute from './components/ProtectedRoutes.jsx'
import AuthRoute from './components/AuthRoute.jsx'
function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/register' element={<AuthRoute><Register/></AuthRoute>}/>
        <Route path='/login' element={<AuthRoute><Login/></AuthRoute>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/dashboard' element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
        <Route path='/transactions' element={<TransactionsPage/>}/>
        <Route path='/reports' element={<ReportsPage/>}/>
        <Route path='/analytics' element={<AnalyticsPage/>}/>


        </Routes>
    </>
  )
}

export default App
