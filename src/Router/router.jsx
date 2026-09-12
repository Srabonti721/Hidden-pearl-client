import React from 'react'
import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layoute/MainLayout';

const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayout
  },
]);

export default router
