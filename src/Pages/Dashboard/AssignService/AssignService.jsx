import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AssignService = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: booking = [], refetch } = useQuery({
        queryKey: ['booking', user?.email, 'decorator_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`booking/decorator?decoratorEmail=${user?.email}&
workingStatus=decorator_assigned`);
            return res.data;
        }
    })
    const handelAccepctBooking = booking => {

    }
    return (
        <div>
            <h2 className='text-5xl'>Deceretor painding Booking {booking.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Confirm</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booking.map((book, index) => <tr key={book._id}>
                                <th> {index + 1} </th>
                                <td>{book.serviceName}</td>
                                <td>
                                    <button onClick={() => handelAccepctBooking(booking)} className='btn'>Accepct</button>
                                    <button className='btn btn-warning'>Reject</button>
                                </td>
                                <td>Blue</td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignService;