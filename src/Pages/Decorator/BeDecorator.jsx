import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import axios from 'axios';
import { useNavigate } from 'react-router';

const BeDecorator = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();
    const [services, setServices] = useState([]);

    // load services
    useEffect(() => {
        fetch('https://home-decor-server-lovat.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data));
    }, []);

    // unique categories
    const categories = [...new Set(services.map(service => service.category))];

    const handleDecoratorApplication = async (data) => {
        try {
            // photo check
            if (!data.photo || data.photo.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Photo Required',
                    text: 'Please upload your profile photo',
                });
                return;
            }

            // upload image
            const profileImg = data.photo[0];
            const formData = new FormData();
            formData.append('image', profileImg);

            const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
            const imageRes = await axios.post(imageApiUrl, formData);
            const photoURL = imageRes.data.data.url;

            const decorator = {
                displayName: user.displayName,
                email: user.email,
                photoURL,
                phone: data.phone,
                dob: data.dob,
                address: data.address,
                nidOrBirth: data.nidOrBirth,
                specialty: data.skillCategory,
            };

            const res = await axiosSecure.post('/decorator', decorator);

            // 🔴 double entry check
            if (res.data?.exists || res.data?.message === 'already-exists') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Already Applied',
                    text: 'Your application already placed',
                });
                return;
            }

            // ✅ success
            if (res.data.insertedId) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your application has been submitted. We will reach you soon!',
                    showConfirmButton: false,
                    timer: 2500,
                });

                reset();
                navigate('/');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Something went wrong. Please try again.',
            });
        }
    };

    return (
        <div className="p-6">
            {/* <h2 className="text-4xl text-primary font-bold">Be a Decorator</h2> */}

            <form onSubmit={handleSubmit(handleDecoratorApplication)} className="mt-8 text-black">
                <fieldset className="fieldset">
                    <h4 className="text-2xl font-semibold mb-4">Personal Information</h4>

                    {/* Full Name */}
                    <label className="label">Full Name</label>
                    <input
                        type="text"
                        {...register('fullName')}
                        value={user?.displayName || ''}
                        className="input w-full"
                        readOnly
                    />

                    {/* Email */}
                    <label className="label mt-4">Email Address</label>
                    <input
                        type="email"
                        {...register('email')}
                        value={user?.email || ''}
                        className="input w-full bg-gray-100"
                        readOnly
                    />

                    {/* Photo */}
                    <label className="label mt-4">Profile Photo</label>
                    <input
                        type="file"
                        {...register('photo', { required: true })}
                        className="file-input w-full"
                        accept="image/*"
                    />

                    {/* Phone */}
                    <label className="label mt-4">Phone Number</label>
                    <input
                        type="text"
                        {...register('phone')}
                        className="input w-full"
                        placeholder="Phone Number"
                    />

                    {/* DOB */}
                    <label className="label mt-4">Date of Birth</label>
                    <input
                        type="date"
                        {...register('dob')}
                        className="input w-full"
                    />

                    {/* Address */}
                    <label className="label mt-4">Current Address</label>
                    <input
                        type="text"
                        {...register('address')}
                        className="input w-full"
                        placeholder="Present Address"
                    />

                    {/* NID */}
                    <label className="label mt-4">NID / Birth Certificate Number (optional)</label>
                    <input
                        type="text"
                        {...register('nidOrBirth')}
                        className="input w-full"
                        placeholder="NID or Birth Certificate Number"
                    />

                    {/* Skill Category */}
                    <label className="label mt-4">Skill Category</label>
                    <select
                        {...register('skillCategory', { required: true })}
                        className="select w-full"
                    >
                        <option value="">Select one</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </fieldset>

                <input
                    type="submit"
                    className="btn btn-primary mt-6 w-full text-black"
                    value="Apply as a Decorator"
                />
            </form>
        </div>
    );
};

export default BeDecorator;
