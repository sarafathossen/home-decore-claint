import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const AssignService = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: booking = [], refetch } = useQuery({
        queryKey: ['booking', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/booking/decorator?deceretorEmail=${user?.email}`
            );
            return res.data;
        }
    });

    const handelBookingStatusUpdate = async (book, workingStatus) => {
        try {
            const resBooking = await axiosSecure.patch(
                `/booking/${book._id}/workingStatus`,
                { workingStatus }
            );

            if (resBooking.data.modifiedCount > 0) {
                const decoratorStatus =
                    workingStatus === 'completed' ? 'available' : workingStatus;

                await axiosSecure.patch(
                    `/decorator/${book.deceretorId}/workingStatus`,
                    { deceretorWorkingStatus: decoratorStatus }
                );

                refetch();
                toast(
                    `Booking status updated to: ${workingStatus} and decorator status updated`
                );
            }
        } catch (error) {
            console.error(error);
            toast("Status update failed");
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-10">
            <h2 className='text-2xl sm:text-3xl md:text-4xl mb-6'>
                Decorator Pending Bookings: {booking.length}
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full min-w-[600px] sm:min-w-[700px] md:min-w-full text-sm sm:text-base md:text-lg">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>Cost</th>
                            <th>Current Status</th>
                            <th>Confirm</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {booking.map((book, index) => (
                            <tr key={book._id}>
                                <th>{index + 1}</th>
                                <td>{book.serviceName}</td>
                                <td>{book.finalCost}</td>

                                <td className="capitalize">
                                    {book.workingStatus?.replaceAll('_', ' ')}
                                </td>

                                <td>
                                    {book.workingStatus === 'decorator_assigned' && (
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() =>
                                                    handelBookingStatusUpdate(book, 'planning_phase')
                                                }
                                                className="btn btn-success btn-xs"
                                                disabled={book.workingStatus === 'completed'}
                                            >
                                                Accept
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handelBookingStatusUpdate(book, 'rejected')
                                                }
                                                className="btn btn-error btn-xs"
                                                disabled={book.workingStatus === 'completed'}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </td>

                                <td className="flex flex-wrap gap-2">
                                    {book.workingStatus !== 'rejected' && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handelBookingStatusUpdate(book, 'planning_phase')
                                                }
                                                className="btn btn-outline btn-xs"
                                                disabled={book.workingStatus === 'completed'}
                                            >
                                                Planning Phase
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handelBookingStatusUpdate(book, 'materials_prepared')
                                                }
                                                className="btn btn-outline btn-xs"
                                                disabled={book.workingStatus === 'completed'}
                                            >
                                                Materials Prepared
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handelBookingStatusUpdate(book, 'on_the_way')
                                                }
                                                className="btn btn-outline btn-xs"
                                                disabled={book.workingStatus === 'completed'}
                                            >
                                                On the Way
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handelBookingStatusUpdate(book, 'setup_in_progress')
                                                }
                                                className="btn btn-outline btn-xs"
                                                disabled={book.workingStatus === 'completed'}
                                            >
                                                Setup in Progress
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handelBookingStatusUpdate(book, 'completed')
                                                }
                                                className="btn btn-primary btn-xs text-black"
                                                disabled={book.workingStatus === 'completed'}
                                            >
                                                Completed
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignService;
