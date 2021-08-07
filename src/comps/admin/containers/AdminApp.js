import React, { useContext } from 'react'
import AdminHomecont from './AdminHomecont'
import Sidebar from '../common/Sidebar'
import './styles/AdminApp.css'
import { StoreContext } from '../../common/StoreContext'
import Loader from '../../common/Loader'
import { useHistory } from 'react-router-dom'

export default function AdminApp() {

  const {darkMode, myUser} = useContext(StoreContext)
  const history= useHistory()

  return (
    myUser&&myUser?.isAdmin?
    <div className={`adminapp ${darkMode?"darkmode":""}`}>
      <Sidebar />
      <AdminHomecont />
    </div>:
    <Loader />
  )
}