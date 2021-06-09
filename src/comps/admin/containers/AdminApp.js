import React from 'react'
import AdminHomecont from './AdminHomecont'
import Sidebar from '../common/Sidebar'
import './styles/AdminApp.css'

export default function AdminApp() {
  return (
    <div className="adminapp">
      <Sidebar />
      <AdminHomecont />
    </div>
  )
}