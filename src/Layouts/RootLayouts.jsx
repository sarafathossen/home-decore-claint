import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import NAvbar from '../Pages/Shared/Navbar/NAvbar';

const RootLayouts = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <NAvbar></NAvbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;