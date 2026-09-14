import React from 'react'
import Navbar from '../Pages/Shared/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Pages/Shared/Footer'

const foodPromice = fetch('http://localhost:3000/foods').then(res=>res.json())

const MainLayout = () => {
  
  return (
    <div className='container mx-auto'>
        <Navbar/>
        <Outlet/>
        <Footer foodPromice={foodPromice}/>
    </div>
  )
}

export default MainLayout
