import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();

    const handleRegistration = async (data) => {
        try {
            await registerUser(data.email, data.password);
            const profileImg = data.photo[0];
            const formData = new FormData();
            formData.append("image", profileImg);

            const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
            const imageRes = await axios.post(imageApiUrl, formData);
            const photoURL = imageRes.data.data.url;

            await axiosSecure.post("/users", {
                displayName: data.name,
                email: data.email,
                photoURL
            });

            await updateUserProfile({
                displayName: data.name,
                photoURL
            });

            toast("Registration Successful 🎉");
            navigate("/");
        } catch (error) {
            toast(error.message || "Registration Failed!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-12 bg-gray-50">
            <div className='card bg-base-100 w-full max-w-sm sm:max-w-md md:max-w-lg shadow-2xl p-6 sm:p-8 md:p-10'>

                {/* Heading */}
                <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-1'>Welcome to DecorSheba</h3>
                <p className='text-xs sm:text-sm md:text-base text-center mb-4'>Please Register</p>

                <form className="space-y-4" onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="flex flex-col gap-3">

                        {/* Name */}
                        <label className="label text-sm sm:text-base">Name</label>
                        <input type="text" {...register('name', { required: true })} className="input w-full text-sm sm:text-base" placeholder="Name" />
                        {errors.name && <p className='text-red-500 text-xs sm:text-sm'>Name is required</p>}

                        {/* Photo */}
                        <label className="label text-sm sm:text-base">Photo</label>
                        <input type="file" {...register('photo', { required: true })} className="file-input w-full text-sm sm:text-base" />
                        {errors.photo && <p className='text-red-500 text-xs sm:text-sm'>Photo is required</p>}

                        {/* Email */}
                        <label className="label text-sm sm:text-base">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input w-full text-sm sm:text-base" placeholder="Email" />
                        {errors.email && <p className='text-red-500 text-xs sm:text-sm'>Email is required</p>}

                        {/* Password */}
                        <label className="label text-sm sm:text-base">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                            })}
                            className="input w-full text-sm sm:text-base"
                            placeholder="Password"
                        />

                        {errors.password?.type === 'required' && <p className='text-red-500 text-xs sm:text-sm'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500 text-xs sm:text-sm'>Password must be at least 6 characters</p>}
                        {errors.password?.type === 'pattern' && (
                            <p className='text-red-500 text-xs sm:text-sm'>
                                Password must contain uppercase, lowercase, number & special character
                            </p>
                        )}

                        <button className="btn btn-neutral w-full text-sm sm:text-base mt-2">Register</button>
                    </fieldset>

                    <p className='text-center text-xs sm:text-sm mt-2'>
                        Already have an account?{' '}
                        <Link className='text-blue-400 underline' state={location.state} to={'/login'}>Login</Link>
                    </p>
                </form>

                <div className="mt-4">
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;
