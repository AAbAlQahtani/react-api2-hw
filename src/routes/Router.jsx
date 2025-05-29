import React from 'react'
import Character from '../pages/Character';


import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function Layout() {
    return (

        <>
            <Nav />
            <Outlet />
            <Footer />
        </>

    );

}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Character /> },
            // { path: "/login", element: <Login /> },
            // { path: "/register", element: <Register /> }


        ],
        
    }, { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);


export default function Router() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

