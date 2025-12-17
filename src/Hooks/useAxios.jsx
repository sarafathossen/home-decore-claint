import axios from 'axios';
import React from 'react';


const axiosInstance = axios.create({
    baseURL: 'https://home-decor-server-lovat.vercel.app'
})
const useAxios = () => {
    return axiosInstance ;
};

export default useAxios;