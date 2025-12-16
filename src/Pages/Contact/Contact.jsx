import React from "react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-12 py-8 sm:py-12">
            <div className="max-w-4xl sm:max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-8">

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
                    Contact Us
                </h1>

                <p className="text-gray-600 text-center mb-8 sm:mb-10 leading-relaxed text-sm sm:text-base md:text-lg">
                    Have questions, feedback, or need support?
                    Feel free to reach out — we’re here to help you.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                            📍 Get in Touch
                        </h2>

                        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                            Our team is always ready to assist you with bookings, decorators,
                            or any system-related queries.
                        </p>

                        <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                            <p>
                                <strong>📧 Email:</strong> hello.sarafat@gmail.com
                            </p>
                            <p>
                                <strong>📞 Phone:</strong> +8801750187656
                            </p>
                            <p>
                                <strong>🏠 Address:</strong> Satkhira, Khulna, Bangladesh
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
                            ✉️ Send a Message
                        </h2>

                        <form className="space-y-3 sm:space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-800"
                            />

                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-800"
                            />

                            <textarea
                                rows="4"
                                placeholder="Your Message"
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-800"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full bg-gray-800 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-gray-900 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;
