import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Loading/Loading';

const RevinewMonitaring = () => {
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['finished-bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/booking/finished');
            return res.data;
        }
    });
    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4">
                Finished Bookings ({bookings.length})
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>User Email</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Finished Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking._id}>
                                <th>{index + 1}</th>
                                <td>{booking.serviceName}</td>
                                <td>{booking.userEmail}</td>
                                <td>{booking.finalCost}</td>
                                <td className="text-green-600 font-semibold">
                                    {booking.workingStatus}
                                </td>
                                <td>
                                    {booking.createdAt
                                        ? new Date(booking.createdAt).toLocaleDateString('en-GB')
                                        : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RevinewMonitaring;