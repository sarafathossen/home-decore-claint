import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const UserManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // 🔹 Change role handler
    const handleChangeRole = (user, role) => {
        axiosSecure.patch(`/users/${user._id}/role`, { role })
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} is now ${role}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    // 🔍 search + role filter
    const filteredUsers = users.filter(user =>
        (user.role === 'user' ||
            user.role === 'decorator' ||
            user.role === 'admin') &&
        user.displayName?.toLowerCase().includes(search.toLowerCase())
    );

    // 📌 Sort by createdAt: newest first
    const sortedUsers = [...filteredUsers].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <div>
            <h2 className='text-5xl mb-4'>
                Manage Users ({sortedUsers.length})
            </h2>

            {/* 🔍 Search Input */}
            <input
                type="text"
                placeholder="Search by name..."
                className="input input-bordered w-full max-w-md mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedUsers.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.photoURL} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div className="font-bold">{user.displayName}</div>
                                    </div>
                                </td>

                                <td>{user.email}</td>
                                <td className="font-semibold">{user.role}</td>

                                <td className="space-x-2">
                                    <button
                                        onClick={() => handleChangeRole(user, 'user')}
                                        className="btn btn-sm btn-info"
                                    >
                                        Make User
                                    </button>

                                    <button
                                        onClick={() => handleChangeRole(user, 'decorator')}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Make Decorator
                                    </button>

                                    <button
                                        onClick={() => handleChangeRole(user, 'admin')}
                                        className="btn btn-sm btn-success"
                                    >
                                        Make Admin
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

export default UserManagement;
