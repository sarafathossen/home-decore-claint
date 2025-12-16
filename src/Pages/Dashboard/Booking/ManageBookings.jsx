import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageBookings = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all bookings
    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/booking');
            return res.data;
        }
    });

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                Manage Bookings ({bookings.length})
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-sm sm:text-base md:text-base">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Service</th>
                            <th>Category</th>
                            <th>Cost</th>
                            <th>Booked Date</th>
                            <th>Status</th>
                            <th>Payment</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((b, index) => (
                            <tr key={b._id} className="hover:bg-base-100">
                                <td>{index + 1}</td>
                                <td>{b.userName}</td>
                                <td>{b.userEmail}</td>
                                <td>{b.serviceName}</td>
                                <td>{b.category}</td>
                                <td>{b.finalCost}</td>
                                <td>{b.bookedDate}</td>
                                <td className="font-semibold text-orange-600">{b.status}</td>
                                <td className={`font-semibold ${b.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                                    {b.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;
