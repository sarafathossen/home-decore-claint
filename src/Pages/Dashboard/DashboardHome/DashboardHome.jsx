import React from 'react';
import useRole from '../../../Hooks/useRole';
import AdminDashboard from './AdminDashboard';
import DecoratorDashboard from './DecoratorDashboard';
import UserDashboard from './UserDashboard';

const DashboardHome = () => {
    const { role, roleLoading } = useRole()
    if (roleLoading) {
        return <h2>Loading</h2>
    }
    if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>
    }
    else if (role === 'decorator') {
        return <DecoratorDashboard></DecoratorDashboard>

    }
    else {
        return <UserDashboard></UserDashboard>
    }

};

export default DashboardHome;