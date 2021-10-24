import axios from 'axios';
import { getSession, useSession } from 'next-auth/client';

const api = axios.create();

api.interceptors.request.use(async (config) => {
  const session = await getSession();
  config.headers.Authorization = `Bearer ${session?.accessToken}`;
  return config;
});
export default api;
