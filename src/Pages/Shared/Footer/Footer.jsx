import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { FaFacebook, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-8 sm:py-10 px-4 sm:px-6 md:px-12 mt-10">
      <div className="max-w-5xl sm:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

        {/* Contact Details */}
        <div className="text-sm sm:text-base">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Contact Us</h2>
          <p className="flex items-center gap-2 mb-1"><FaPhoneAlt /> +880 1234-567890</p>
          <p className="flex items-center gap-2 mb-1"><FaEnvelope /> support@yourbusiness.com</p>
          <p className="mb-1">Address: Dhaka, Bangladesh</p>
        </div>

        {/* Social Media Links */}
        <div className="text-sm sm:text-base">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Follow Us</h2>
          <div className="flex gap-4 text-xl sm:text-2xl">
            <a href="https://www.facebook.com/sarafat.hossen.14"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="text-sm sm:text-base">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Working Hours</h2>
          <p>Monday - Friday: 9:00 AM – 8:00 PM</p>
          <p>Saturday: 10:00 AM – 5:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 sm:mt-8 border-t pt-4 text-sm sm:text-base">
        <p>© {new Date().getFullYear()} Your Business Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
