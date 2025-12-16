import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const MyBooking = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newDate, setNewDate] = useState("");
    const [squareFeet, setSquareFeet] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['my-booking', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking?email=${user.email}`);
            return res.data;
        },
    });

    const parseBookedDate = (dateStr) => {
        if (!dateStr) return new Date(0);
        const [day, month, year] = dateStr.split("-");
        return new Date(Number(year), Number(month) - 1, Number(day));
    };

    const sortedBookings = [...bookings].sort((a, b) => {
        return parseBookedDate(b.bookedDate) - parseBookedDate(a.bookedDate);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBookings = sortedBookings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);

    const handelPayment = async (service) => {
        if (!user?.email) {
            Swal.fire("Error", "User email not found", "error");
            return;
        }

        try {
            const res = await axiosSecure.post('/payment-checkout-session', {
                cost: service.finalCost,
                parcelId: service._id,
                customerEmail: user?.email,
                parcelName: service.serviceName,
                trackingId: service.trackingId || ""
            });

            if (res.data?.url) window.location.assign(res.data.url);
            else Swal.fire("Error", "Payment session failed", "error");
        } catch {
            Swal.fire("Error", "Payment failed", "error");
        }
    };

    const handleUpdateBooking = async () => {
        if (!selectedBooking) return;
        const sf = Number(squareFeet) || 0;
        const price = Number(selectedBooking.price) || 0;
        const finalCost = sf * price;

        try {
            const res = await axiosSecure.patch(
                `/booking/${selectedBooking._id}`,
                { bookedDate: newDate, squareFeet: sf, finalCost }
            );

            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire("Updated!", "Booking updated successfully", "success");
                document.getElementById("my_modal_5").close();
            }
        } catch {
            Swal.fire("Error", "Update failed", "error");
        }
    };

    const handleDeleteBooking = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/booking/${id}`);
            if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire("Deleted!", "Booking removed", "success");
            }
        }
    };

    return (
        <div className="px-2 sm:px-4 md:px-8 lg:px-12 py-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
                My Booked Services: {bookings.length}
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-sm sm:text-base md:text-lg">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Tracking</th>
                            <th>Work</th>
                            <th>Booked Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentBookings.map((service, index) => (
                            <tr key={service._id}>
                                <th>{indexOfFirstItem + index + 1}</th>
                                <td>{service.serviceName}</td>
                                <td>{service.finalCost}</td>
                                <td>
                                    {service.paymentStatus === 'paid' ? (
                                        <span className='text-green-500'>Paid</span>
                                    ) : (
                                        <button
                                            onClick={() => handelPayment(service)}
                                            className='btn btn-xs sm:btn-sm btn-primary text-black'
                                        >
                                            Pay
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <Link className="text-blue-500 underline text-xs sm:text-sm md:text-base"
                                        to={`/booking-track/${service.trackingId}`}>
                                        {service.trackingId}
                                    </Link>
                                </td>
                                <td>{service.workingStatus || "pending"}</td>
                                <td>{service.bookedDate}</td>
                                <td className="space-x-1 flex flex-wrap gap-1">
                                    <button
                                        onClick={() => {
                                            setSelectedBooking(service);
                                            setNewDate(service.bookedDate);
                                            setSquareFeet(service.squareFeet || "");
                                            document.getElementById("my_modal_5").showModal();
                                        }}
                                        className="btn btn-xs sm:btn-sm btn-outline"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBooking(service._id)}
                                        className="btn btn-xs sm:btn-sm btn-error text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center mt-4 gap-2">
                <button
                    className="btn btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary text-black" : ""}`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    className="btn btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                >
                    Next
                </button>
            </div>

            {/* Update Modal */}
            <dialog id="my_modal_5" className="modal">
                <div className="modal-box w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2">
                    <h3 className="font-bold text-lg mb-4">Update Booking</h3>
                    <p>Update Date</p>
                    <input
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        placeholder="DD-MM-YYYY"
                        className="input input-bordered w-full mb-3"
                    />
                    <p>Update Square Feet</p>
                    <input
                        type="number"
                        value={squareFeet}
                        onChange={(e) => setSquareFeet(e.target.value)}
                        placeholder="Square Feet"
                        className="input input-bordered w-full mb-4"
                    />

                    <div className="flex flex-wrap justify-end gap-2">
                        <button onClick={handleUpdateBooking} className="btn btn-primary">
                            Save
                        </button>
                        <button
                            onClick={() => document.getElementById("my_modal_5").close()}
                            className="btn"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyBooking;
