import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import useAuth from '../../../Hooks/useAuth';

const AdminDashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: bookingStats = [] } = useQuery({
        queryKey: ['booking-workingstatus-status'],
        queryFn: async () => {
            const res = await axiosSecure.get('/booking/working-status/status');
            return res.data;
        }
    });

    // console.log(bookingStats);

    const chartData = data => data.map(item => ({ name: item.category, value: item.count }));

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h2 className='text-2xl sm:text-3xl md:text-4xl mb-4'>
                Hi {user.displayName}, Welcome to Admin Dashboard
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {
                    bookingStats?.workingStatus?.map(stats => (
                        <div className="stat bg-white shadow rounded-lg p-4" key={stats._id}>
                            <div className="stat-figure text-secondary mb-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 sm:h-8 md:h-10 w-6 sm:w-8 md:w-10 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="stat-title text-sm sm:text-base md:text-lg">{stats.workingStatus}</div>
                            <div className="stat-value text-xl sm:text-2xl md:text-3xl">{stats.count}</div>
                        </div>
                    ))
                }
            </div>

            <div className="w-full h-64 sm:h-80 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={bookingStats?.category || []}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminDashboard;
