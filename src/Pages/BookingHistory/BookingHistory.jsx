import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const BookingHistory = () => {
    const axiosSecure = useAxiosSecure();

    // ===== Filters =====
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [status, setStatus] = useState('');

    // ===== Pagination =====
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['all-bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/booking');
            return res.data;
        }
    });

    // ===== Date parser (DD-MM-YYYY → Date) =====
    const parseDate = (dateStr) => {
        if (!dateStr) return null;
        const [day, month, year] = dateStr.split('-');
        return new Date(`${year}-${month}-${day}`);
    };

    // ===== Filter by date & status =====
    const filteredBookings = bookings.filter(book => {
        let isValid = true;

        if (fromDate && toDate && book.bookedDate) {
            const bookDate = parseDate(book.bookedDate);
            const from = new Date(fromDate);
            const to = new Date(toDate);

            if (bookDate < from || bookDate > to) {
                isValid = false;
            }
        }

        if (status && book.workingStatus !== status) {
            isValid = false;
        }

        return isValid;
    });

    // ===== Pagination logic =====
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

    if (isLoading) {
        return <p className="text-center mt-10">Loading booking history...</p>;
    }

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-5">
                {/* All Booking History ({filteredBookings.length}) */}
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-semibold">From Date</label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>

                <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-semibold">To Date</label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>

                <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-semibold">Status</label>
                    <select
                        className="select select-bordered w-full"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="planning_phase">Planning Phase</option>
                        <option value="materials_prepared">Materials Prepared</option>
                        <option value="on_the_way">On the Way to Venue</option>
                        <option value="setup_in_progress">Setup in Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-sm sm:text-base md:text-base">
                    <thead>
                        <tr className="bg-base-200">
                            <th>#</th>
                            <th>Service</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Category</th>
                            <th>Final Cost</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Decorator</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentBookings.map((book, index) => (
                            <tr key={book._id} className="hover:bg-base-100">
                                <th>{indexOfFirstItem + index + 1}</th>
                                <td>{book.serviceName}</td>
                                <td>{book.userName}</td>
                                <td>{book.userEmail}</td>
                                <td>{book.category}</td>
                                <td>৳ {book.finalCost}</td>
                                <td>
                                    {book.paymentStatus === 'paid' ? (
                                        <span className="badge badge-success">Paid</span>
                                    ) : (
                                        <span className="badge badge-error">Unpaid</span>
                                    )}
                                </td>
                                <td>
                                    <span className="badge badge-info capitalize">
                                        {(book.workingStatus || 'pending').replaceAll('_', ' ')}
                                    </span>
                                </td>
                                <td>{book.deceretorName || 'Not Assigned'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
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
                        className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary text-black' : ''}`}
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
        </div>
    );
};

export default BookingHistory;
