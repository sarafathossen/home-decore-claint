import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import Covarage from "../Pages/Covarage/Covarage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../Pages/Rider/Rider";
import SendPercels from "../Pages/SendPercel/SendPercels";
import DashbordLayout from "../Layouts/DashbordLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import Error from "../Pages/Error/Error";
import Service from "../Pages/Service/Service";
import ServiceDetails from "../Pages/Service/ServiceDetails";
import Profile from "../Pages/Dashboard/Profile/Profile";
import MyBooking from "../Pages/Dashboard/Booking/MyBooking";
import BeDecorator from "../Pages/Decorator/BeDecorator";
import AproveDecorator from "../Pages/Decorator/AproveDecorator";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PAymentHistory";
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import AdminRoutes from "./AdminRoutes";
import AssignDeceretors from "../Pages/Dashboard/AssignDeceretor/AssignDeceretors";
import AssignService from "../Pages/Dashboard/AssignService/AssignService";
import CompeleteBooking from "../Pages/Dashboard/CompeleteBooking/CompeleteBooking";
import BookingTrack from "../Pages/BookingTrack/BookingTrack";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";

import CreateService from "../Pages/Dashboard/CreateService/CreateService";





export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayouts,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch(`http://localhost:3000/services`),
                
            },
            {
                path: 'covarage',
                Component: Covarage,
                loader: () => fetch('/ServiceCenter.json').then(res => res.json())
            },
            {
                path: 'services',
                Component: Service,
                loader: () => fetch('http://localhost:3000/services').then(res => res.json())
            },
            {
                path: 'service/service-details/:id',
                element: <ServiceDetails></ServiceDetails>,
                loader: ({ params }) => fetch(`http://localhost:3000/services/${params.id}`),
            },

            {
                path: 'be-decorator',
                element: <PrivateRoutes> <BeDecorator></BeDecorator> </PrivateRoutes>
            },
            {
                path: 'send-percel',
                element: <PrivateRoutes> <SendPercels></SendPercels> </PrivateRoutes>,
                loader: () => fetch('/ServiceCenter.json').then(res => res.json()),
            },
            {
                path: 'booking-track/:trackingId',
                Component:BookingTrack,
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login,

            },
            {
                path: 'register',
                Component: Register,
            },

        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes> <DashbordLayout></DashbordLayout> </PrivateRoutes>,
        children: [
            {
                index:true,
                Component: DashboardHome
            },
            {
                path: 'my-profile',
                Component: Profile
            },
            {
                path: 'create-service',
                Component: CreateService

                
            },
            {
                path: 'my-booking',
                Component: MyBooking
            },
            {
                path: 'my-parcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: 'user-management',
                element:<AdminRoutes> <UserManagement></UserManagement> </AdminRoutes>
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            {
                path: 'aprove-decorator',
                element: <AdminRoutes> <AproveDecorator></AproveDecorator> </AdminRoutes>
            },
            {
                path: 'assign-decorator',
                element: <AdminRoutes> <AssignDeceretors></AssignDeceretors> </AdminRoutes>
            },
            {
                path: 'assign-service',
                element: <AssignService></AssignService>
            },
            {
                path: 'completed-booking',
                element: <CompeleteBooking></CompeleteBooking>
            },
        ]
    },
    {
        path: '*',
        Component: Error
    }
]);