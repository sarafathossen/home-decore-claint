import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const TodaysSchedule = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [decoratorEmail, setDecoratorEmail] = useState(user?.email || "");

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayStr = `${dd}-${mm}-${yyyy}`;

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['todays-bookings', decoratorEmail],
        enabled: !!decoratorEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/booking?deceretorEmail=${decoratorEmail}`
            );
            return res.data;
        }
    });

    const todaysBookings = bookings.filter(b => b.bookedDate === todayStr);

    return (
        <div className="p-4 sm:p-6 md:p-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Today's Schedule: {todayStr}
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full min-w-[600px] sm:min-w-[700px] md:min-w-full text-sm sm:text-base md:text-lg">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>Customer Name</th>
                            <th>Price</th>
                            <th>Booked Date</th>
                            <th>Tracking ID</th>
                            <th>Work Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todaysBookings.length > 0 ? (
                            todaysBookings.map((b, index) => (
                                <tr key={b._id}>
                                    <th>{index + 1}</th>
                                    <td>{b.serviceName}</td>
                                    <td>{b.userName}</td>
                                    <td>{b.finalCost}</td>
                                    <td>{b.bookedDate}</td>
                                    <td>{b.trackingId}</td>
                                    <td>{b.workingStatus}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-sm sm:text-base md:text-lg">
                                    {/* No bookings found for today. */}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TodaysSchedule;
