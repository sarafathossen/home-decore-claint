import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Loading from '../Loading/Loading';

const MyAssignProject = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // logged in decorator
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure
            .get(`/booking?deceretorEmail=${user.email}`)
            .then((res) => {
                setBookings(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [user?.email, axiosSecure]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-4 sm:p-6 md:p-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                My Assigned Bookings ({bookings.length})
            </h2>

            {bookings.length === 0 ? (
                <p className="text-center text-gray-500">No bookings found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full min-w-[600px] sm:min-w-[700px] md:min-w-full">
                        <thead>
                            <tr className="text-sm sm:text-base md:text-lg">
                                <th>#</th>
                                <th>Service</th>
                                <th>Client</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Work</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm sm:text-base md:text-lg">
                            {bookings.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.serviceName}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.bookingDate}</td>
                                    <td>৳ {item.finalCost}</td>
                                    <td>
                                        <span
                                            className={`badge ${item.paymentStatus === "paid" ? "badge-success" : "badge-warning"
                                                }`}
                                        >
                                            {item.paymentStatus}
                                        </span>
                                    </td>
                                    <td>{item.status}</td>
                                    <td>
                                        <span
                                            className={`badge ${item.workingStatus === "finished_work" ? "badge-info" : "badge-outline"
                                                }`}
                                        >
                                            {item.workingStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyAssignProject;
