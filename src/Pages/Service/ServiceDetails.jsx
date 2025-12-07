import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const ServiceDetails = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const { user } = useContext(AuthContext);
    const data = useLoaderData();
    const navigate = useNavigate();

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleBookNowClick = () => {
        if (!user) {
            // ইউজার নেই → login page, লগিনের পর ফিরে আসবে
            navigate('/login', { state: { from: window.location.pathname } });
        } else {
            // ইউজার আছে → modal open
            document.getElementById('my_modal_1').showModal();
        }
    };

    const handelBookingConfirm = async () => {
        if (!selectedDate) {
            alert("Please select a booking date before confirming!");
            return;
        }

        const bookedDate = formatDate(new Date(selectedDate));

        const bookingData = {
            serviceId: data.id,
            serviceName: data.name,
            price: data.price,
            category: data.category,
            duration: data.duration,
            userEmail: user?.email,
            userName: user?.displayName,
            bookingDate: formatDate(new Date()),
            bookedDate: bookedDate,
            status: "pending"
        };

        const res = await fetch("http://localhost:3000/booking", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(bookingData)
        });

        const result = await res.json();
        if (result.insertedId) {
            alert("Booking confirmed!");
            document.getElementById("my_modal_1").close();
        }
    };

    return (
        <div className='max-w-[500px] mx-auto'>
            <img className='w-full h-[400px] object-cover' src={data.image} alt="" />
            <p className='text-xl font-bold'>{data.name}</p>
            <div className="flex justify-between">
                <p>{data.price}</p>
                <p>{data.category}</p>
            </div>
            <div className="flex justify-between">
                <p>Rating: {data.rating}</p>
                <p>Reviews: {data.reviews}</p>
            </div>
            <p> <span className='font-bold'>Description :</span> {data.longDescription}</p>
            <button className='btn btn-outline w-full' onClick={handleBookNowClick}>Book Now</button>

            {/* Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-xl mb-4 text-center">{data.name}</h3>

                    <table className="table table-zebra w-full">
                        <tbody>
                            <tr><td className="font-semibold">Your Name</td><td>{user?.displayName}</td></tr>
                            <tr><td className="font-semibold">Email</td><td>{user?.email}</td></tr>
                            <tr><td className="font-semibold">Category</td><td>{data.category}</td></tr>
                            <tr><td className="font-semibold">Price</td><td>{data.price}</td></tr>
                            <tr><td className="font-semibold">Duration</td><td>{data.duration}</td></tr>
                            <tr><td className="font-semibold">Available</td><td>{data.available ? "Yes" : "No"}</td></tr>
                            <tr><td className="font-semibold">Rating</td><td>{data.rating} ⭐ ({data.reviews} reviews)</td></tr>
                            <tr><td className="font-semibold">Description</td><td>{data.longDescription}</td></tr>
                            <tr>
                                <td className="font-semibold">Select Booking Date</td>
                                <td>
                                    <input
                                        type="date"
                                        className="input input-bordered"
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="modal-action">
                        <button onClick={handelBookingConfirm} className="btn btn-success">Confirm</button>
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ServiceDetails;
