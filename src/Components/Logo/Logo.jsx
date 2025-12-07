import React from 'react';
import logo from '../../assets/logo.png';

const Logo = () => {
    return (
        <div className='flex items-end font-bold '>
            <img className='h-[50px] w-[50px]' src={logo} alt="" />
            <h3 className="text-3xl">DecorSheba</h3>
        </div>
    );
};

export default Logo;
