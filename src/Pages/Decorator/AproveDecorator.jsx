import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AproveDecorator = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: decorators = [] } = useQuery({
        queryKey: ['decorator'],
        queryFn: async () => {
            const res = await axiosSecure.get('/decorator');
            return res.data;
        }
    });

    const handelApproved = (decorator) => {
        const updateRole = { role: 'decorator', email: decorator.email };

        axiosSecure.patch(`/decorator/${decorator._id}`, updateRole)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast('Decorator Approved Successfully');
                    refetch();
                }
            })
            .catch(err => console.log(err));
    };

    const handleCancel = (id) => {
        axiosSecure.delete(`/decorator/${id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    toast('Decorator Deleted Successfully');
                    refetch();
                }
            })
            .catch(err => console.log(err));
    };

    const sortedDecorators = [...decorators].sort((a, b) => {
        if (a.role === 'pending' && b.role !== 'pending') return -1;
        if (a.role !== 'pending' && b.role === 'pending') return 1;
        return 0;
    });

    const handleDisable = (decorator) => {
        const updateRole = { role: 'disable', email: decorator.email };

        axiosSecure.patch(`/decorator/${decorator._id}`, updateRole)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast('Decorator Disabled Successfully');
                    refetch();
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='p-4 sm:p-6 md:p-8'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6'>
                Decorator Pending Approval: {decorators.length}
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className='text-sm sm:text-base md:text-lg'>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedDecorators.map((d, index) => (
                            <tr key={d._id} className="text-sm sm:text-base md:text-base">
                                <td>{index + 1}</td>

                                <td>
                                    <img
                                        src={d.photoURL}
                                        className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 rounded-full object-cover"
                                        alt={d.displayName}
                                    />
                                </td>

                                <td>{d.displayName}</td>
                                <td>{d.email}</td>
                                <td>{d.specialty}</td>

                                <td
                                    className={`font-semibold ${d.role === 'decorator'
                                        ? 'text-green-600'
                                        : d.role === 'pending'
                                            ? 'text-red-600'
                                            : 'text-orange-600'
                                        }`}
                                >
                                    {d.role}
                                </td>

                                <td className="flex flex-wrap gap-1 sm:gap-2">
                                    <button
                                        onClick={() => handelApproved(d)}
                                        className='btn btn-sm btn-success'
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() => handleDisable(d)}
                                        className='btn btn-sm btn-warning'
                                    >
                                        Disable
                                    </button>

                                    <button
                                        onClick={() => handleCancel(d._id)}
                                        className='btn btn-sm btn-error'
                                    >
                                        Remove
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AproveDecorator;
