import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Forbidden from '../Components/Logo/Forbidden/Forbidden';
import Loading from '../Pages/Loading/Loading';

const DecoratorRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isLoading: roleLoading } = useRole();

    if (loading || !user || roleLoading) {
        return <Loading></Loading>;
    }

    // If user is NOT admin → Block access
    if (role !== 'decorator') {
        return <Forbidden />;
    }

    // If admin → Allow access
    return children;
};

export default DecoratorRoutes;