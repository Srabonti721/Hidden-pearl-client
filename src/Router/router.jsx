import React from 'react'
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layoute/MainLayout';
import Home from '../Pages/HomePages/Home';
import AllFoods from '../Pages/AllFoods/AllFoods';
import Gallery from '../Pages/Gallery/Gallery';
import Register from '../Pages/Authentication/Register';
import Login from '../Pages/Authentication/Login';
import SingleFood from '../Pages/singleFood/SingleFood';

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
        path:"foods/:id",
        Component:SingleFood,
        loader:({params})=>fetch(`http://localhost:3000/foods/${params.id}`)
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
