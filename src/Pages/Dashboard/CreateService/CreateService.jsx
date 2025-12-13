import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const CreateService = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCreateService = async (data) => {
    const serviceData = {
      // 🔴 REQUIRED by backend
      serviceId: Date.now().toString(), // temporary unique id
      userEmail: user?.email,

      // service info
      name: data.name,
      image: data.image,
      price: data.price,
      description: data.description,
      longDescription: data.longDescription,
      category: data.category,
      rating: Number(data.rating),
      reviews: Number(data.reviews),
      duration: data.duration,

      // default
      available: true,
    };

    try {
      const res = await axiosSecure.post('/service', serviceData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Service Created Successfully',
          showConfirmButton: false,
          timer: 2000,
        });
        reset();
        navigate('/dashboard/services');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to create service',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8">Create New Service</h2>

      <form
        onSubmit={handleSubmit(handleCreateService)}
        className="space-y-6"
      >
        <fieldset className="fieldset">
          <label className="label">Service Name</label>
          <input
            className="input w-full"
            {...register('name', { required: true })}
            placeholder="Luxury Home Wedding Setup"
          />
        </fieldset>

        <fieldset className="fieldset">
          <label className="label">Image URL</label>
          <input
            className="input w-full"
            {...register('image', { required: true })}
            placeholder="https://i.ibb.co/..."
          />
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset className="fieldset">
            <label className="label">Price</label>
            <input
              className="input w-full"
              {...register('price', { required: true })}
              placeholder="Starting at 12,000৳"
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Category</label>
            <input
              className="input w-full"
              {...register('category', { required: true })}
              placeholder="Wedding"
            />
          </fieldset>
        </div>

        <fieldset className="fieldset">
          <label className="label">Short Description</label>
          <textarea
            className="textarea w-full"
            {...register('description', { required: true })}
          />
        </fieldset>

        <fieldset className="fieldset">
          <label className="label">Long Description</label>
          <textarea
            className="textarea w-full"
            {...register('longDescription', { required: true })}
          />
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <fieldset className="fieldset">
            <label className="label">Rating</label>
            <input
              type="number"
              step="0.1"
              className="input w-full"
              {...register('rating', { required: true })}
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Reviews</label>
            <input
              type="number"
              className="input w-full"
              {...register('reviews', { required: true })}
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Duration</label>
            <input
              className="input w-full"
              {...register('duration', { required: true })}
              placeholder="3 hours"
            />
          </fieldset>
        </div>

        <input
          type="submit"
          className="btn btn-primary w-full"
          value="Create Service"
        />
      </form>
    </div>
  );
};

export default CreateService;
