import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewsCard = ({ review }) => {
    const { userName, review:testemonial,user_photoURL } = review
    return (
        <div className="max-w-md p-6 rounded-xl shadow bg-base-100 border">
            {/* Quote icon */}
            <FaQuoteLeft className="text-3xl text-primary  mb-4" />

            {/* Description */}
            <p className="text-base ">
                {testemonial}
            </p>

            {/* Divider */}
            <div className="border-b border-dashed my-4"></div>

            {/* Profile */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary">
                    <img src={user_photoURL} alt="" />
                </div>

                <div>
                    <h3 className="font-semibold text-primary text-lg">
                        {userName}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Senior Product Designer
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewsCard;