import React from 'react'
import { useSelector } from 'react-redux';
// import Userroutes from '../routes/Userroutes';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectUserRouter() {
    const isAuth = Boolean(useSelector((state) => state.userSlice.token));
    return (
        isAuth ? <Outlet /> : <Navigate to='/login' />
    )
}

export default ProtectUserRouter