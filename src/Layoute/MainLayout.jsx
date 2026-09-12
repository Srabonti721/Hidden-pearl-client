import React from 'react'
import Navbar from '../Pages/Shared/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Pages/Shared/Footer'

const MainLayout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainLayout
