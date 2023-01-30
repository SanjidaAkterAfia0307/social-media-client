import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';


const PrivateRoute = ({children}) => {
    const { user, loading } = useSelector((state) => state.user)
    const location= useLocation()
    if(loading){
      return  <p>Loading...</p>
    }
    if(!user){
      return  <Navigate to='/signin' state={{from:location}}></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;