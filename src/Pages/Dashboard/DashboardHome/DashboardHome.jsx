import React from 'react';
import useRole from '../../../Hooks/useRole';
import AdminDashboard from './AdminDashboard';
import DecoratorDashboard from './DecoratorDashboard';
import UserDashboard from './UserDashboard';
import Loading from '../../Loading/Loading';

const DashboardHome = () => {
    const { role, roleLoading } = useRole()
    if (roleLoading) {
        return <Loading></Loading>
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