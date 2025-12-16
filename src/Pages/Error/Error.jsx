import React from 'react';
import { Link } from 'react-router';
import { AlertTriangle } from 'lucide-react';

const Error = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
            <div className="max-w-sm sm:max-w-md md:max-w-lg w-full text-center bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">

                {/* Icon */}
                <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="p-4 sm:p-6 md:p-8 bg-blue-100 rounded-full">
                        <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600">404</h1>

                {/* Message */}
                <p className="mt-2 sm:mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
                    Oops! The page you’re looking for doesn’t exist.
                </p>

                <p className="mt-1 sm:mt-2 text-gray-500 text-xs sm:text-sm md:text-base">
                    It might have been removed, renamed, or temporarily unavailable.
                </p>

                {/* Actions */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Error;
