import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Logo />
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 w-full">
                    <Outlet />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1 w-full">
                    <img className='h-[150px] sm:h-[200px] w-full object-cover' src='https://i.ibb.co.com/PqS9Zj4/AU2-A2115-scaled.jpg' alt="" />
                    <img className='h-[150px] sm:h-[200px] w-full object-cover' src='https://i.ibb.co.com/d4BY6sKZ/magnificent-small-banquet-hall-wedding-tips.jpg' alt="" />
                    <img className='h-[150px] sm:h-[200px] w-full object-cover' src='https://i.ibb.co.com/k6hkMLVN/images-8.jpg' alt="" />
                    <img className='h-[150px] sm:h-[200px] w-full object-cover' src='https://i.ibb.co.com/fzhS1sxf/91d-Re-Es-Qg-IL-AC-SL1500.jpg' alt="" />
                    <img className='h-[150px] sm:h-[200px] w-full object-cover' src='https://i.ibb.co.com/39w7T7m5/Glampingparty1-1771128000f3431c96834852542ab06d.jpg' alt="" />
                    <img className='h-[150px] sm:h-[200px] w-full object-cover' src='https://i.ibb.co.com/TD1gNk1W/images-7.jpg' alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
