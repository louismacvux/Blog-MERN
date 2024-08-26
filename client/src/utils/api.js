import axios from 'axios';

const baseAPI = axios.create({
  baseURL: "https://note-binder-backend.vercel.app/api/v1",
  withCredentials: true,
});

export default baseAPI
