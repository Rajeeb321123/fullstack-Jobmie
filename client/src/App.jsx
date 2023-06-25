
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

// TANSTACK REACT_QUERY for GIGS API CALL
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';



import Navbar from './components/navabar/Navbar' ;
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from './pages/orders/Orders'
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import Pay from "./pages/pay/Pay.jsx";
import Success from "./pages/success/Success";

import './app.scss'







function App() {

  


  // tanstack REACT-QUERY
  // redux query is more powerful , we have used it in our dash board project. But we want simple query here
  // Cacheing our fetched data is easy in Tanstack react query
  const queryClient = new QueryClient()



  // LAYOUT FUCTION COMPONENT
  const Layout =()=> {
    return (
      
      <div className="app">
        
        {/* REACT-QUERY */}
        {/* queryClient provider: Wrapping our Tanstack reat query in layout as layout wrap the whole project */}
        <QueryClientProvider client={queryClient}>

        <Navbar />
        <Outlet />
        <Footer />
        </QueryClientProvider>
      </div>
      
    );
  };

  // BROWSE ROUTER DOM FUNCTIONAL COMPONENT
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id/:recieverId",
          element: <Message  />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        
        // MOST IMP OF THIS PROJECT: STRIPE PAYMENT
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/success",
          element: <Success />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
