import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const DecoratorDashboard = () => {
    const {user}=useAuth()
    return (
        
         <div className="min-h-screen px-4 sm:px-6 md:px-12 py-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Welcome {user.displayName} to Decorator Dashboard
            </h2>
        </div>
    );
};

export default DecoratorDashboard;