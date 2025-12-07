import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser, updateUserProfile } = useAuth()
    const location=useLocation()
    const navigate=useNavigate()
    console.log('in register',location)

    const handelRegistration = (data) => {
        console.log("After Register : ", data)
        const profileImg = data.photo[0]
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                const fromData = new FormData()
                fromData.append('image', profileImg)
                const image_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`
                axios.post(image_Api_Url, fromData)
                    .then(res => {
                        console.log('After Image Upload', res.data.data.url)
                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url,

                        }
                        updateUserProfile(userProfile)
                            .then(()=>{
                                console.log('user profile update done')
                                navigate(location.state || '/')
                            })
                            .catch(error=>{
                                console.log(error)
                            })
                    })

            })
            .catch(error => {
                console.log(error)
            })

    }
    return (
        <div className='card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl'>
            <h3 className='text-3xl font-bold text-center' >Welcome to zap Shift</h3>
            <p className='text-center' >Please Register</p>
            <form className="card-body" onSubmit={handleSubmit(handelRegistration)}>
                <fieldset className="fieldset">
                    {/* Name Feld  */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Name" />
                    {errors.name?.type === 'required' && <p className='text-red-500' > Name required </p>}
                    {/* Photo Feld  */}
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your Photo" />
                    {errors.photo?.type === 'required' && <p className='text-red-500' > Photo required </p>}
                    {/* Email Feild  */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500' > Email required </p>}
                    {/* Password  */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                    })} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500' > Password is required </p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'> Password must be 6 characters or longer </p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500' >password must be at least one uppercase, at least one lowercase, at least one number, and at least one special characters </p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p cl>Already have an account <Link className='text-blue-400 underline' state={location.state} to={'/login'} >Login</Link> </p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;