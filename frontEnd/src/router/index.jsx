import { createBrowserRouter } from 'react-router-dom';
import Home from "../pages/Home.jsx";
import Not from "../pages/Not.jsx";
import Login from "../pages/Login.jsx";
import Layout from '../layouts/Layout.jsx';
import GuestLayout from '../layouts/GuestLayout.jsx';
import AdminDashboard from '../components/Admins/AdminDashboard.jsx';
import Layoutss from '../layouts/Layoutss.jsx';


export const router = createBrowserRouter([
  {
  
    element: <Layout/>,
    children:[
        {
    path: '/',
    element: <Home />
  },
    {
    path: '/login',
    element: <Login /> 
  },
  
   {
    path: '*',
    element: <Not/>
  }
  

    ]
  }
    ,
    {
      element:<GuestLayout/>
    },
     {
      element:<AdminDashboard/>
    },
    {
  
    element: <Layoutss/>,
    children:[        
  {
   path: '/dashboard',
    element: <p>Hi Admin</p>
  },
  
  
 
  

    ]
  }
]);
