import React from 'react'
import AdminHomecont from './AdminHomecont'
import Navbar from '../common/Navbar'
import Sidebar from '../common/Sidebar'

export default function AdminApp() {
  return (
    <div className="adminapp">
      <Navbar />
      <Sidebar />
      <AdminHomecont />
    </div>
  )
}