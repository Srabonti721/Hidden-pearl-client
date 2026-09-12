import React from 'react'
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layoute/MainLayout';
import Home from '../Pages/HomePages/Home';
import AllFoods from '../Pages/AllFoods/AllFoods';
import Gallery from '../Pages/Gallery/Gallery';
import Register from '../Pages/Authentication/Register';
import Login from '../Pages/Authentication/Login';

const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:"allFoods",
        Component:AllFoods
      },
      {
        path:"gallery",
        Component:Gallery
      },
      {
        path:"register",
        Component:Register
      },
      {
        path:"login",
        Component:Login
      },
    ]
  },

]);

export default router
