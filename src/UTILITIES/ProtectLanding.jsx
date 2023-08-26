import React from 'react'
import { useSelector } from 'react-redux';
// import Userroutes from '../routes/Userroutes';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectLanding() {
    const isAuth = Boolean(useSelector((state) => state.userSlice.token));

    return (
        isAuth ? <Navigate to='/' /> : null
    )
}

export default ProtectLanding