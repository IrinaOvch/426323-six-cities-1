import axios from 'axios';

export const BASE_URL = `https://es31-server.appspot.com/six-cities`;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true,
  });

  return api;
};
