import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png'

const AuthLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Logo></Logo>
            <div className="flex items-center">
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
                <div className="grid grid-cols-3 gap-4 flex-1">
                    <img className=' h-[200px] w-[200px] ' src='https://cdn.home-designing.com/wp-content/uploads/2022/04/high-end-luxurious-unique-wall-decor-for-living-room-designer-authentic-mid-century-modern-decorative-accents-to-hang-on-walls-above-sofa-artwork-inspiration.jpg' alt="" />
                    <img className=' h-[200px] w-[200px] ' src='https://cdn.home-designing.com/wp-content/uploads/2022/04/high-end-luxurious-unique-wall-decor-for-living-room-designer-authentic-mid-century-modern-decorative-accents-to-hang-on-walls-above-sofa-artwork-inspiration.jpg' alt="" />
                    <img className=' h-[200px] w-[200px] ' src='https://cdn.home-designing.com/wp-content/uploads/2022/04/high-end-luxurious-unique-wall-decor-for-living-room-designer-authentic-mid-century-modern-decorative-accents-to-hang-on-walls-above-sofa-artwork-inspiration.jpg' alt="" />
                    <img className=' h-[200px] w-[200px] ' src='https://cdn.home-designing.com/wp-content/uploads/2022/04/high-end-luxurious-unique-wall-decor-for-living-room-designer-authentic-mid-century-modern-decorative-accents-to-hang-on-walls-above-sofa-artwork-inspiration.jpg' alt="" />
                    <img className=' h-[200px] w-[200px] ' src='https://cdn.home-designing.com/wp-content/uploads/2022/04/high-end-luxurious-unique-wall-decor-for-living-room-designer-authentic-mid-century-modern-decorative-accents-to-hang-on-walls-above-sofa-artwork-inspiration.jpg' alt="" />
                    <img className=' h-[200px] w-[200px] ' src='https://cdn.home-designing.com/wp-content/uploads/2022/04/high-end-luxurious-unique-wall-decor-for-living-room-designer-authentic-mid-century-modern-decorative-accents-to-hang-on-walls-above-sofa-artwork-inspiration.jpg' alt="" />
                   
                   
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;