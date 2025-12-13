import React, { useEffect, useState } from "react";
import { Link } from "react-router"; 
import Swal from "sweetalert2";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 10;

  // Fetch all services
  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:3000/services");
      if (!res.ok) throw new Error("Failed to fetch services");
      const data = await res.json();
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setServices(sortedData);
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
      const res = await fetch(`http://localhost:3000/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");
      Swal.fire("Deleted!", "Service deleted successfully", "success");
      fetchServices();
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  // Pagination logic
  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = services.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(services.length / servicesPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <p className="text-center mt-10">Loading services...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Services ({services.length})</h2>

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
            {currentServices.map((service, index) => (
              <tr key={service._id}>
                <td>{indexOfFirst + index + 1}</td>
                <td>
                  <img src={service.image} alt={service.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td>{service.name}</td>
                <td>{service.category}</td>
                <td>{service.price}</td>
                <td>{service.rating}</td>
                <td>{service.duration}</td>
                <td>{service.available ? "Yes" : "No"}</td>
                <td className="flex gap-2">
                  <Link
                    to={`/dashboard/update-service/${service._id}`}
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

      {/* Pagination buttons */}
      <div className="flex justify-center gap-2 mt-4 items-center">
        <button 
          className="btn btn-sm" 
          onClick={handlePrev} 
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button 
          className="btn btn-sm" 
          onClick={handleNext} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllServices;
