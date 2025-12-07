import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { FaFacebook, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
         <footer className="bg-base-200 text-base-content py-10 px-6 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Contact Details */}
        <div>
          <h2 className="text-xl font-bold mb-3">Contact Us</h2>
          <p className="flex items-center gap-2">
            <FaPhoneAlt /> +880 1234-567890
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> support@yourbusiness.com
          </p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-xl font-bold mb-3">Follow Us</h2>
          <div className="flex gap-4 text-2xl">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* Business Hours */}
        <div>
          <h2 className="text-xl font-bold mb-3">Working Hours</h2>
          <p>Monday - Friday: 9:00 AM – 8:00 PM</p>
          <p>Saturday: 10:00 AM – 5:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t pt-4">
        <p>© {new Date().getFullYear()} Your Business Name. All rights reserved.</p>
      </div>
    </footer>
    );
};

export default Footer;