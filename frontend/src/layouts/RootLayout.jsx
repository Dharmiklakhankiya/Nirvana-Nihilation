import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/custom/Footer'

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout
