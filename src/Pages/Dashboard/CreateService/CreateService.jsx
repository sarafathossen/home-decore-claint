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
      serviceId: Date.now().toString(),
      userEmail: user?.email,
      name: data.name,
      image: data.image,
      price: data.price,
      description: data.description,
      longDescription: data.longDescription,
      category: data.category,
      rating: Number(data.rating),
      reviews: Number(data.reviews),
      duration: data.duration,
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
        navigate('/dashboard/all-service');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to create service',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
        Create New Service
      </h2>

      <form onSubmit={handleSubmit(handleCreateService)} className="space-y-4 sm:space-y-6 md:space-y-8">
        <fieldset className="fieldset">
          <label className="label">Service Name</label>
          <input
            className="input w-full text-sm sm:text-base md:text-base"
            {...register('name', { required: true })}
            placeholder="Luxury Home Wedding Setup"
          />
        </fieldset>

        <fieldset className="fieldset">
          <label className="label">Image URL</label>
          <input
            className="input w-full text-sm sm:text-base md:text-base"
            {...register('image', { required: true })}
            placeholder="https://i.ibb.co/..."
          />
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <fieldset className="fieldset">
            <label className="label">Price</label>
            <input
              className="input w-full text-sm sm:text-base md:text-base"
              {...register('price', { required: true })}
              placeholder="Per Square Feet"
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Category</label>
            <input
              className="input w-full text-sm sm:text-base md:text-base"
              {...register('category', { required: true })}
              placeholder="Wedding"
            />
          </fieldset>
        </div>

        <fieldset className="fieldset">
          <label className="label">Short Description</label>
          <textarea
            className="textarea w-full text-sm sm:text-base md:text-base"
            {...register('description', { required: true })}
          />
        </fieldset>

        <fieldset className="fieldset">
          <label className="label">Long Description</label>
          <textarea
            className="textarea w-full text-sm sm:text-base md:text-base"
            {...register('longDescription', { required: true })}
          />
        </fieldset>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <fieldset className="fieldset">
            <label className="label">Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="Out of 5"
              className="input w-full text-sm sm:text-base md:text-base"
              {...register('rating', {
                required: true,
                min: { value: 0, message: 'Rating cannot be negative' },
                max: { value: 5, message: 'Rating cannot be more than 5' }
              })}
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Reviews Number</label>
            <input
              type="number"
              className="input w-full text-sm sm:text-base md:text-base"
              {...register('reviews', { required: true })}
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Duration</label>
            <input
              className="input w-full text-sm sm:text-base md:text-base"
              {...register('duration', { required: true })}
              placeholder="3 hours"
            />
          </fieldset>
        </div>

        <input
          type="submit"
          className="btn btn-primary w-full text-sm sm:text-base md:text-base"
          value="Create Service"
        />
      </form>
    </div>
  );
};

export default CreateService;
