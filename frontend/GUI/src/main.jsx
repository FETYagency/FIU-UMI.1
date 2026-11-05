import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.jsx'

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";



const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[]
  }
])


createRoot(document.getElementById('root')).render(
 <RouterProvider router={router} />,
)
