import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AssignDeceretors = () => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const axiosSecure = useAxiosSecure();
    const DeceretorModalRef = useRef(null);

    const { data: booking = [], refetch: bookingRefetch } = useQuery({
        queryKey: ['booking', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/booking?workingStatus=pending-pickup');
            return res.data;
        }
    });

    const { data: decorator = [] } = useQuery({
        queryKey: ['decorator', selectedBooking?.category, 'available'],
        enabled: !!selectedBooking,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/decorator?role=decorator&specialty=${selectedBooking?.category}&deceretorWorkingStatus=available`
            );
            return res.data;
        }
    });

    const openAssignDeceretorModal = (bookingItem) => {
        setSelectedBooking(bookingItem);
        setTimeout(() => {
            if (DeceretorModalRef.current) {
                DeceretorModalRef.current.showModal();
            }
        }, 0);
    };

    const handleAssignDeceretor = async (dec) => {
        if (!selectedBooking) return;
        try {
            const assignDeceretorInfo = {
                deceretorId: dec._id,
                deceretorName: dec.displayName,
                deceretorEmail: dec.email,
                trackingId: selectedBooking.trackingId
            };
            const res = await axiosSecure.patch(`/booking/${selectedBooking._id}`, assignDeceretorInfo);
            if (res.data.modifiedCount) {
                bookingRefetch();
                DeceretorModalRef.current?.close();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4">Assign Decorators: {booking.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-sm sm:text-base md:text-base">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Create At</th>
                            <th>Category</th>
                            <th>Work Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booking.map((book, index) => (
                            <tr key={book._id}>
                                <th>{index + 1}</th>
                                <td>{book.serviceName}</td>
                                <td>{book.finalCost}</td>
                                <td>{book.bookingDate}</td>
                                <td>{book.category}</td>
                                <td>{book.workingStatus}</td>
                                <td>
                                    <button
                                        onClick={() => openAssignDeceretorModal(book)}
                                        className="btn btn-sm sm:btn-md md:btn-md"
                                    >
                                        Find Decorator
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <dialog ref={DeceretorModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box p-4 sm:p-6 md:p-8">
                        <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-4">
                            Decorators: {decorator.length}
                        </h3>
                        <div className="overflow-x-auto mb-4">
                            <table className="table table-zebra w-full text-sm sm:text-base md:text-base">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Tracking</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {decorator
                                        .filter(dec => dec.deceretorWorkingStatus !== "in_delivery")
                                        .map((dec, index) => (
                                            <tr key={dec._id}>
                                                <th>{index + 1}</th>
                                                <td>{dec.displayName}</td>
                                                <td>{dec.email}</td>
                                                <td>{dec.trackingId}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleAssignDeceretor(dec)}
                                                        className="btn btn-sm sm:btn-md md:btn-md"
                                                    >
                                                        Assign
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-action">
                            <button
                                onClick={() => DeceretorModalRef.current?.close()}
                                className="btn btn-outline btn-sm sm:btn-md md:btn-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default AssignDeceretors;
