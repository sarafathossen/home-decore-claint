import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const DeceretorEarning = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: booking = [] } = useQuery({
        queryKey: ['booking', user?.email, 'completed'],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/booking/decorator?deceretorEmail=${user?.email}&workingStatus=completed`
            );
            return res.data;
        }
    });

    const calculatePayout = book => book.finalCost * 0.8;

    const totalEarning = booking.reduce(
        (sum, book) => sum + calculatePayout(book),
        0
    );

    return (
        <div className="p-4 sm:p-6 md:p-10">
            <h2 className='text-2xl sm:text-3xl md:text-5xl mb-4'>
                Deceretor Earning {booking.length}
            </h2>
            <h2 className='text-xl sm:text-2xl md:text-3xl mb-4'>
                {user.displayName}'s Total Earning: {totalEarning}
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full min-w-[600px] sm:min-w-[700px] md:min-w-full text-sm sm:text-base md:text-lg">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Decorator Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Decorator Profit (80%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booking.map((book, index) => (
                            <tr key={book._id}>
                                <th>{index + 1}</th>
                                <td>{book.serviceName}</td>
                                <td>{book.deceretorName}</td>
                                <td>{book.category}</td>
                                <td>{book.finalCost}</td>
                                <td>{calculatePayout(book)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeceretorEarning;
