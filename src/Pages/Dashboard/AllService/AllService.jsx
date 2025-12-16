import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 10;

  const fetchServices = async () => {
    try {
      const res = await fetch("https://home-decor-server-lovat.vercel.app/services");
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

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://home-decor-server-lovat.vercel.app/services/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Failed to delete service");

          Swal.fire({
            title: "Deleted!",
            text: "Service deleted successfully.",
            icon: "success"
          });

          fetchServices(); // ডেটা রিফ্রেশ
        } catch (err) {
          Swal.fire("Error!", err.message, "error");
        }
      }
    });
  };


  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = services.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(services.length / servicesPerPage);

  const handlePrev = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  if (loading) return <Loading></Loading>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">All Services ({services.length})</h2>

      <div className="overflow-x-auto items-center">
        <table className="table table-zebra w-full text-sm sm:text-base md:text-base items-center">
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
              <tr key={service._id} className="hover:bg-base-100">
                <td>{indexOfFirst + index + 1}</td>
                <td>
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded"
                  />
                </td>
                <td>{service.name}</td>
                <td>{service.category}</td>
                <td>{service.price}</td>
                <td>{service.rating}</td>
                <td>{service.duration}</td>
                <td>{service.available ? "Yes" : "No"}</td>
                <td className="flex flex-wrap gap-2">
                  <Link to={`/dashboard/update-service/${service._id}`} className="btn btn-sm btn-primary">
                    Update
                  </Link>
                  <button className="btn btn-sm btn-error" onClick={() => handleDelete(service._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 items-center">
        <button className="btn btn-sm" onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button className="btn btn-sm" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default AllServices;
