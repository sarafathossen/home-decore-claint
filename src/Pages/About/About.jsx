import React from "react";

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-12 py-8 sm:py-12">
            <div className="max-w-4xl sm:max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-8">

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
                    About Our Home Decorator Management
                </h1>

                {/* Intro */}
                <p className="text-gray-600 text-center mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base md:text-lg">
                    Our Home Decorator Management System is designed to simplify and
                    streamline the process of managing decoration services, decorators,
                    bookings, and customer satisfaction — all in one place.
                </p>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
                    <div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                            🎯 Our Mission
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
                            Our mission is to help home decoration businesses manage their
                            operations efficiently by providing a reliable, easy-to-use,
                            and modern management system.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                            🌟 Our Vision
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-base">
                            We envision a future where decoration service providers can
                            focus more on creativity and customer experience while the
                            system handles management, tracking, and coordination.
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="mb-8 sm:mb-10">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        🚀 Key Features
                    </h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-2 text-sm sm:text-base md:text-base">
                        <li>Easy booking and scheduling management</li>
                        <li>Decorator assignment and availability tracking</li>
                        <li>Real-time work status updates</li>
                        <li>Customer and order management</li>
                        <li>Secure and role-based access</li>
                    </ul>
                </div>

                {/* Closing */}
                <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base md:text-base">
                    This platform is built with modern web technologies to ensure
                    performance, security, and scalability — helping your home
                    decoration business grow with confidence.
                </p>

            </div>
        </div>
    );
};

export default About;
