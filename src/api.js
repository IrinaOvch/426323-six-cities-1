import axios from 'axios';

export const BASE_URL = `https://es31-server.appspot.com/six-cities`;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response.status === 403) {
      window.location = `${window.location.origin}/login`;
      return;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
