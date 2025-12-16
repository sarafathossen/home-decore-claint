import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { useLocation, useNavigate, Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { singInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from || '/';

    const handelLogin = (data) => {
        singInUser(data.email, data.password)
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch(err => {
                toast(err.message);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-12 bg-gray-50">
            <div className="card bg-base-100 w-full max-w-sm sm:max-w-md md:max-w-lg shadow-2xl p-6 sm:p-8 md:p-10">

                {/* Heading */}
                <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-1'>Welcome Back</h3>
                <p className='text-sm sm:text-base text-center mb-4'>Please Login</p>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit(handelLogin)}>
                    <div className="flex flex-col">
                        <label className="label text-sm sm:text-base">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input w-full text-sm sm:text-base"
                            placeholder="Email"
                        />
                        {errors.email && <p className='text-red-500 text-xs sm:text-sm'>Email is required</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="label text-sm sm:text-base">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            className="input w-full text-sm sm:text-base"
                            placeholder="Password"
                        />
                        {errors.password?.type === 'required' && <p className='text-red-500 text-xs sm:text-sm'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500 text-xs sm:text-sm'>Password must be 6 characters or longer</p>}
                    </div>

                    <div className="text-right">
                        <a className="link link-hover text-xs sm:text-sm">Forgot password?</a>
                    </div>

                    <button className="btn btn-neutral w-full text-sm sm:text-base mt-2">Login</button>
                </form>

                {/* Register Link */}
                <p className="text-center text-xs sm:text-sm mt-4">
                    New to zap Shift?{' '}
                    <Link className='text-blue-400 underline' state={{ from }} to={'/register'}>Register</Link>
                </p>

                {/* Social Login */}
                <div className="mt-4">
                    <SocialLogin redirectPath={from} />
                </div>
            </div>
        </div>
    );
};

export default Login;
