import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const serviceId = service._id;
        navigate(`/service/service-details/${serviceId}`);
    };

    return (
        <div className="border bg-zinc-300 p-3 sm:p-4 rounded-lg flex flex-col h-full">

            {/* Image */}
            <img
                className="h-40 sm:h-48 md:h-56 lg:h-[300px] w-full object-cover rounded-md"
                src={service.image}
                alt={service.name}
            />

            {/* Title */}
            <h2 className="text-base sm:text-lg md:text-xl font-bold mt-3 truncate">
                {service.name}
            </h2>

            {/* Price & Category */}
            <div className="flex justify-between items-center px-1 sm:px-2 mt-2 text-sm sm:text-base">
                <p className="font-bold">
                    {service.price} <span className="hidden sm:inline">Per Square</span>
                </p>
                <p className="font-bold text-green-600 truncate max-w-[120px]">
                    {service.category}
                </p>
            </div>

            {/* Button */}
            <motion.button
                onClick={handleClick}
                whileHover={{ scale: 1.05, backgroundColor: "#2563EB", color: "#fff" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-4 sm:px-6 w-full mt-auto my-4 py-2 sm:py-3 
                           border border-blue-600 text-blue-600 
                           rounded-lg font-semibold text-sm sm:text-base"
            >
                Details
            </motion.button>
        </div>
    );
};

export default ServiceCard;
