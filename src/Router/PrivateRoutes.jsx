import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    console.log(location)
    if (loading) {
        return <div className=""><span className="loading loading-bars loading-xl"></span></div>
    }
    if (!user) {
        return <Navigate state={location.pathname} to='/login' ></Navigate>
    }

    return children;
};

export default PrivateRoutes;