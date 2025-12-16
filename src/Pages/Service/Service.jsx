import React, { useState } from "react";
import { useLoaderData } from "react-router";
import ServiceCard from "./ServiceCard";

const Service = () => {
  const allData = useLoaderData();

  const [searchText, setSearchText] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const categories = Array.from(new Set(allData.map(item => item.category)));

  const filteredData = allData
    .filter(item => {
      const nameMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
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
    <div className="px-4 sm:px-6 md:px-8 py-6 space-y-6">

      {/* 🔍 Search & Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
        <input
          type="text"
          placeholder="Search services..."
          className="input input-bordered w-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="select select-bordered w-full"
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

        <select
          className="select select-bordered w-full"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* 🔥 Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <p className="text-gray-500 text-base sm:text-lg col-span-full text-center">
            No matching services found...
          </p>
        )}
      </div>
    </div>
  );
};

export default Service;
