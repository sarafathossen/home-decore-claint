import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../../Components/Logo/Logo';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth()
    const handelLogOut = () => {
        logOut()
            .then()
            .catch(error => console.log(error))
    }

    const links = <>
        <li><NavLink to={'/'} >Home</NavLink></li>
        <li><NavLink to={'/services'} >Services</NavLink></li>
        <li><NavLink to={'/about'} >About</NavLink></li>
        <li><NavLink to={'/contact'} >Contact</NavLink></li>
        <li><NavLink to={'/covarage'} >Covarage</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 sm:px-6 md:px-12 py-2 sm:py-4">

            {/* Mobile / Tablet */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-sm">
                        {links}
                    </ul>
                </div>
                <Link to={'/'}> <Logo /> </Link>
            </div>

            {/* Desktop */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {links}
                </ul>
            </div>

            {/* Right Section */}
            <div className="navbar-end flex items-center gap-2 sm:gap-4">
                {user && <Link to='/dashboard' className="btn btn-sm sm:btn-md">Dashboard</Link>}

                {user && (
                    <details className="dropdown">
                        <summary className="btn m-1 p-1 sm:p-2">
                            <img className='h-8 w-8 sm:h-10 sm:w-10 rounded-full border object-cover' src={user?.photoURL} alt="User" />
                        </summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-40 sm:w-52 p-2 shadow-sm">
                            <li><Link to='/dashboard/my-profile' className='btn btn-sm sm:btn-md w-full'>Profile</Link></li>
                            <li><Link className='btn btn-sm sm:btn-md w-full' onClick={handelLogOut}>Log Out</Link></li>
                        </ul>
                    </details>
                )}

                {!user && <Link className='btn btn-sm sm:btn-md' to='/login'>Log In</Link>}

                {user?.role !== 'user' && (
                    <Link className='btn btn-primary text-black btn-sm sm:btn-md' to='/be-decorator'>
                        Be a Decorator
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
