import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const lastLoginTime = user?.metadata?.lastSignInTime
    ? (() => {
      const d = new Date(user.metadata.lastSignInTime);
      const day = d.getDate();
      const month = d.toLocaleString('default', { month: 'short' });
      const hours = d.getHours();
      const minutes = d.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${day} ${month}, ${hour12}:${minutes} ${ampm}`;
    })()
    : "Not Available";

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-12 py-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">My Profile</h2>

      <img
        className="h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-full border shadow-md mb-4 object-cover"
        src={user?.photoURL || "https://www.flaticon.com/svg/static/icons/svg/666/666201.svg"}
        alt={user?.displayName || "User"}
      />

      <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-2">{user?.displayName || ""}</h2>
      <p className="text-gray-500 text-sm sm:text-base mb-2">{user?.email}</p>

      <p className="text-gray-400 text-sm sm:text-base mb-4">
        Last Login: <span className="font-medium">{lastLoginTime}</span>
      </p>

      <button
        onClick={() => navigate(-1)}
        className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
      >
        Go Back
      </button>
    </div>
  );
};

export default Profile;
