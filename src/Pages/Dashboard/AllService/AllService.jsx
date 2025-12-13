import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all services
  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:3000/services");
      if (!res.ok) throw new Error("Failed to fetch services");
      const data = await res.json();
      setServices(data); // Already sorted from backend
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Delete service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`http://localhost:3000/services/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete service");
      alert("Service deleted successfully");
      fetchServices(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  // Update service (PATCH example: toggle available)
  const handleUpdate = async (service) => {
    const updatedData = {
      available: !service.available,
    };

    try {
      const res = await fetch(`http://localhost:3000/services/${service._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update service");
      alert("Service updated successfully");
      fetchServices(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading services...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        All Services ({services.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Duration</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service, index) => (
              <tr key={service._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{service.name}</td>
                <td>{service.category}</td>
                <td>{service.price}</td>
                <td>{service.rating}</td>
                <td>{service.duration}</td>
                <td>{service.available ? "Yes" : "No"}</td>
                <td className="flex gap-2">
                  <Link to='/dashboard/update-service'
                    className="btn btn-sm btn-primary"
                    
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllServices;
