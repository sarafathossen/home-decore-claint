import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const UpdateService = () => {
    const { id } = useParams(); // id from URL
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await axiosSecure.get(`/services/${id}`);
                const data = res.data;
                reset(data); // pre-fill form
                setLoading(false);
            } catch (err) {
                setError("Failed to load service");
                setLoading(false);
            }
        };
        fetchService();
    }, [id, reset, axiosSecure]);

    const handleUpdateService = async (data) => {
        try {
            const res = await axiosSecure.patch(`/services/${id}`, data); // PATCH ব্যবহার
            if (res.data.message) {
                Swal.fire({
                    icon: "success",
                    title: "Service Updated Successfully",
                    showConfirmButton: false,
                    timer: 2000,
                });
                navigate("/dashboard/all-service");
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Failed to update service",
            });
        }
    };


    if (loading) return <p className="text-center mt-10">Loading service...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-4xl font-bold mb-8">Update Service</h2>
            <form onSubmit={handleSubmit(handleUpdateService)} className="space-y-6">
                <fieldset className="fieldset">
                    <label className="label">Service Name</label>
                    <input className="input w-full" {...register("name", { required: true })} />
                </fieldset>

                <fieldset className="fieldset">
                    <label className="label">Image URL</label>
                    <input className="input w-full" {...register("image", { required: true })} />
                </fieldset>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <fieldset className="fieldset">
                        <label className="label">Price</label>
                        <input className="input w-full" {...register("price", { required: true })} />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Category</label>
                        <input className="input w-full" {...register("category", { required: true })} />
                    </fieldset>
                </div>

                <fieldset className="fieldset">
                    <label className="label">Short Description</label>
                    <textarea className="textarea w-full" {...register("description", { required: true })} />
                </fieldset>

                <fieldset className="fieldset">
                    <label className="label">Long Description</label>
                    <textarea className="textarea w-full" {...register("longDescription", { required: true })} />
                </fieldset>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <fieldset className="fieldset">
                        <label className="label">Rating</label>
                        <input type="number" step="0.1" className="input w-full" {...register("rating", { required: true })} />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Reviews</label>
                        <input type="number" className="input w-full" {...register("reviews", { required: true })} />
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Duration</label>
                        <input className="input w-full" {...register("duration", { required: true })} />
                    </fieldset>
                </div>

                <input type="submit" className="btn btn-primary w-full" value="Update Service" />
            </form>
        </div>
    );
};

export default UpdateService;
