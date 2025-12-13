import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure()
    const { data: bookingStats = [] } = useQuery({
        queryKey: ['booking-workingstatus-status'],
        queryFn: async () => {
            const res = await axiosSecure.get('/booking/working-status/status')
            return res.data
        }
    })
    console.log(bookingStats)
    const chartData = data => {
        return data.map(item => ({ name: item.category, value: item.count }));
    };


    return (
        <div>
            <h2 className='text-4xl'>Admin Dashboard</h2>
            <div className="stats shadow w-full ">
                {
                    bookingStats?.workingStatus?.map(stats => <div className="stat" key={stats._id}>
                        <div className="stat-figure text-secondary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-8 w-8 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </div>
                        <div className="stat-title">{stats.workingStatus}</div>
                        <div className="stat-value">{stats.count}</div>

                    </div>)
                }


            </div>
            <div className="">
                <div className="w-full">
                    <BarChart
                        width={600} // fixed width, অথবা responsive করতে CSS দিয়ে adjust করতে পারো
                        height={400}
                        data={bookingStats?.category || []} // category ডেটা ব্যবহার
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis className='' dataKey="category" /> {/* category নাম দেখাবে */}
                        <YAxis  />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" barSize={100} fill="#8884d8" /> {/* count দেখাবে */}
                    </BarChart>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;