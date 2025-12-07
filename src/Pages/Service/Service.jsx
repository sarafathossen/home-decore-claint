import React, { useState } from "react";
import { useLoaderData } from "react-router";
import ServiceCard from "./ServiceCard";

const Service = () => {
  const allData = useLoaderData();

  // State
  const [searchText, setSearchText] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"

  // Unique categories from data
  const categories = Array.from(new Set(allData.map(item => item.category)));

  // Filtered & Sorted Data
  const filteredData = allData
    .filter(item => {
      // Name search
      const nameMatch = item.name.toLowerCase().includes(searchText.toLowerCase());

      // Category filter
      const typeMatch = serviceType
        ? item.category.toLowerCase() === serviceType.toLowerCase()
        : true;

      return nameMatch && typeMatch;
    })
    .sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^\d]/g, ""));
      const priceB = parseInt(b.price.replace(/[^\d]/g, ""));

      if (sortOrder === "asc") return priceA - priceB;
      if (sortOrder === "desc") return priceB - priceA;
      return 0;
    });

  return (
    <div className="p-6 space-y-6">
      {/* 🔍 Search & Filters */}
      <div className="flex gap-4 flex-wrap items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search services..."
          className="input input-bordered w-full md:w-72"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Category Dropdown */}
        <select
          className="select select-bordered w-full md:w-56"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        >
          <option value="">All Types</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort by Price */}
        <select
          className="select select-bordered w-full md:w-56"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* 🔥 Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <p className="text-gray-500 text-lg">No matching services found...</p>
        )}
      </div>
    </div>
  );
};

export default Service;
