import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const DecoratorRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isLoading: roleLoading } = useRole();

    if (loading || !user || roleLoading) {
        return <h2>Loading...</h2>;
    }

    // If user is NOT admin → Block access
    if (role !== 'decorator') {
        return <Forbidden />;
    }

    // If admin → Allow access
    return children;
};

export default DecoratorRoutes;