import React, { useContext } from 'react'
import AdminHomecont from './AdminHomecont'
import Sidebar from '../common/Sidebar'
import './styles/AdminApp.css'
import { StoreContext } from '../../common/StoreContext'

export default function AdminApp() {

  const {darkMode} = useContext(StoreContext)

  return (
    <div className={`adminapp ${darkMode?"darkmode":""}`}>
      <Sidebar />
      <AdminHomecont />
    </div>
  )
}