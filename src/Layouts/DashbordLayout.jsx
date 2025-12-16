import React from 'react';
import { FaBicycle } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../Hooks/useRole';
import logoImg from '../assets/logo.png';
import { PrefetchPageLinks } from 'react-router';
import { IoIosCreate } from "react-icons/io";
import { GiHumanTarget } from "react-icons/gi";
import { LuBookCheck } from "react-icons/lu";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdSecurityUpdate } from "react-icons/md";
import { BookCheck, BookCopy, BookPlus, CalendarCheck, ChartNoAxesColumn, DollarSign, FileUser, House, Kanban, Rows4, SquarePen, UserRoundPen, UsersRound } from 'lucide-react';




const DashbordLayout = () => {
    const { role } = useRole();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4">DecorSheba Dashboard</div>
                </nav>
                {/* Page content here */}
                <Outlet></Outlet>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}

                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>

                            <Link to='/' className='h-[60px] w-[60px]'><img src={logoImg} alt="" /></Link>
                        </li>
                        <li>
                            <Link to='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <House />
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>
                        {/* Our Dashboard Links  */}
                        <li>
                            <NavLink to='/dashboard/my-profile' >   <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Profile">
                                <UserRoundPen />
                                <span className="is-drawer-close:hidden">Profile</span>
                            </button>
                            </NavLink>
                        </li>






                        {/* User DashBoard Link  */}
                        {
                            role === 'user' && <>

                                <li>
                                    <NavLink to='/dashboard/my-booking' >   <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Booking">
                                        <BookCheck />
                                        <span className="is-drawer-close:hidden">Booking</span>
                                    </button>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/payment-history' >   <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2" data-tip="Payment History">
                                        <DollarSign />
                                        <span className="is-drawer-close:hidden">Payment History</span>
                                    </button>
                                    </NavLink>
                                </li>




                            </>
                        }
                        {/* Deceretor DashBoard Link  */}
                        {
                            role === 'decorator' && <>

                                <li>
                                    <NavLink to='/dashboard/my-assign' >   <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center" data-tip="Assigned Service">
                                        <BookCopy />

                                        <span className="is-drawer-close:hidden">Assigned Service</span>
                                    </button>
                                    </NavLink>
                                </li>




                                <li>
                                    <NavLink to='/dashboard/assign-service' >   <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center" data-tip="Update Project Status">
                                        <ChartNoAxesColumn />


                                        <span className="is-drawer-close:hidden">Update Project Status</span>
                                    </button>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/todays-schedule' >   <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center" data-tip="Todays Schedule">
                                        <CalendarCheck />

                                        <span className="is-drawer-close:hidden">Todays Schedule</span>
                                    </button>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/deceretor-earning' >   <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center" data-tip="Deceretor Earning">
                                        <DollarSign />
                                        <span className="is-drawer-close:hidden">Deceretor Earning</span>
                                    </button>
                                    </NavLink>
                                </li>

                            </>
                        }
                        {/* Admin Dashboard Links  */}

                        {
                            role === 'admin' && <>
                                <li>
                                    <NavLink to='/dashboard/aprove-decorator' >   <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center" data-tip="Aproved Decorator">
                                        <BookPlus />
                                        <span className="is-drawer-close:hidden">Aproved Decorator</span>
                                    </button>
                                    </NavLink>

                                </li>
                                <li>
                                    <Link to='/dashboard/assign-decorator'> <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assign Decorators">
                                        {/* Settings icon */}
                                        <FileUser />
                                        <span className="is-drawer-close:hidden">Assign Decorators</span>
                                    </button></Link>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/user-management' >   <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center" data-tip="User Management">
                                        <UsersRound />
                                        <span className="is-drawer-close:hidden">User Management</span>
                                    </button>
                                    </NavLink>
                                </li>



                                <li>
                                    <Link to='/dashboard/create-service'> <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Create Booking">
                                        {/* Settings icon */}
                                        <SquarePen />
                                        <span className="is-drawer-close:hidden">Create Booking</span>
                                    </button></Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/all-service'> <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Service">
                                        {/* Settings icon */}
                                        <Rows4 />
                                        <span className="is-drawer-close:hidden">All Service</span>
                                    </button></Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/booking-history'> <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Booking History">
                                        {/* Settings icon */}
                                        <BookCopy />
                                        <span className="is-drawer-close:hidden">All Booking History</span>
                                    </button></Link>
                                </li>

                                <li>
                                    <Link to='/dashboard/completed-booking'> <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
                                        {/* Settings icon */}
                                        <DollarSign />
                                        <span className="is-drawer-close:hidden">Payment History</span>
                                    </button></Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/manage-booking'> <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Bookings">
                                        {/* Settings icon */}
                                        <Kanban />
                                        <span className="is-drawer-close:hidden">Manage Bookings</span>
                                    </button></Link>
                                </li>








                            </>
                        }







                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashbordLayout;