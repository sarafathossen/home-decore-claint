import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { useLocation, useNavigate, Link } from 'react-router'; // ✅ react-router-dom
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { singInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // আগের পেজ থাকলে সেই দিকে redirect, না থাকলে '/'
    const from = location.state?.from || '/';
    console.log("Redirect after login to:", from);

    const handelLogin = (data) => {
        singInUser(data.email, data.password)
            .then(() => {
                navigate(from, { replace: true }); // Login successful → redirect
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className='text-3xl font-bold text-center'>Welcome Back</h3>
            <p className='text-center'>Please Login</p>
            <form className="card-body" onSubmit={handleSubmit(handelLogin)}>
                <label className="label">Email</label>
                <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                {errors.email && <p className='text-red-500'>Email is required</p>}

                <label className="label">Password</label>
                <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>}

                <div><a className="link link-hover">Forgot password?</a></div>
                <button className="btn btn-neutral mt-4">Login</button>
            </form>

            <p className="text-center mt-2">
                New to zap Shift? 
                <Link className='text-blue-400 underline' state={{ from }} to={'/register'}>Register</Link>
            </p>

            <SocialLogin redirectPath={from} />
        </div>
    );
};

export default Login;
