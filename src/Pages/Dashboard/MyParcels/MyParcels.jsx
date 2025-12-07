import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth()
    console.log(user.email)
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [], refetch } = useQuery({

        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })
    const handelDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Parcel has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }
    const handelPayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
        }
        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo)
        console.log(res.data.url)
        window.location.assign(res.data.url)

    }
    console.log(parcels)
    return (
        <div>
            <h2>All of my parcels : {parcels.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>
                                    {
                                        parcel.paymentStatus === 'paid' ? <span className='text-green-500'>Paid</span> : <button onClick={() => handelPayment(parcel)} className='btn btn-sm btn-primary text-black'>Pay</button>
                                    }
                                </td>
                                <td>{parcel.deliveryStatus}</td>
                                <td className='gap-4'>
                                    <button className='btn btn-square hover:bg-primary'> edit </button>
                                    <button className='btn btn-square hover:bg-primary'> view </button>
                                    <button onClick={() => handelDelete(parcel._id)} className='btn btn-square hover:bg-primary'> delete </button>
                                </td>
                            </tr>)
                        }
                        {/* row 1 */}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;