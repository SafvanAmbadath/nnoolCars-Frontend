import React from 'react'
import { useSelector } from 'react-redux';
// import Userroutes from '../routes/Userroutes';
import { Navigate, Outlet } from 'react-router-dom';


function ProtectAuthentication() {

    const isAuth = Boolean(useSelector((state) => state.userSlice.token));
    console.log(isAuth);
    
        return (
            isAuth ?<Navigate to='/' /> :  <Outlet />
        )

    


}

export default ProtectAuthentication