import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiousSecure = useAxiosSecure()
    const { refetch, data: payments = [] } = useQuery({
        queryKey: ['payment-history', user?.email],
        queryFn: async () => {
            const res = await axiousSecure.get(`/payments?email=${user?.email}`)
            return res.data
        }
    })

    return (
        <div className="px-2 sm:px-4 md:px-8 lg:px-12 py-6">
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4'>
                Payment History: {payments.length}
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-sm sm:text-base md:text-lg">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Transaction Id</th>
                            <th>Paid Date</th>
                            <th>Paid At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td className="break-words">{payment.parcelName}</td>
                                <td>{payment.amount}</td>
                                <td className="break-words">{payment.transactionId}</td>
                                <td>
                                    {new Date(payment.paidAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: '2-digit',
                                    })}
                                </td>
                                <td>
                                    {new Date(payment.paidAt).toLocaleTimeString('en-GB', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
