import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div className="flex items-center">
            <Link to="/">
                <div className="flex items-end gap-2 sm:gap-3 md:gap-4">
                    <img
                        className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                        src={logo}
                        alt="DecorSheba Logo"
                    />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        DecorSheba
                    </h3>
                </div>
            </Link>
        </div>
    );
};

export default Logo;
