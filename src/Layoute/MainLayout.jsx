import React from 'react'
import Navbar from '../Pages/Shared/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Pages/Shared/Footer'
import axios from 'axios'

const foodPromice = axios.get('http://localhost:3000/foods').then((response) => response.data)

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
