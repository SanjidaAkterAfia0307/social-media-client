import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Followers from "../Pages/Follow/Followers";
import Followings from "../Pages/Follow/Followings";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";

export const router=createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/signup',
                element:<Register/>
            },
            {
                path:'/signin',
                element:<Login/>
            },
            {
                path:'/follower',
                element:<PrivateRoute><Followers/></PrivateRoute>
            },
            {
                path:'/following',
                element:<PrivateRoute><Followings/></PrivateRoute>
            },
        ]
    }
])