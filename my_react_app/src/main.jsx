import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';

import './index.css'

import App from './App.jsx'
import ShowImage from './showData/ShowImage.jsx';

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/ShowImage',
    element:<ProtectedRoute element={<ShowImage />} />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
