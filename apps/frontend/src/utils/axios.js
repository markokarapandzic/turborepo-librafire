import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:3001' });

export function request({ ...options }) {
  const accessToken = localStorage.getItem('accessToken');
  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  const onSuccess = (response) => response;
  const onError = (error) => error;

  return client(options).then(onSuccess).catch(onError);
}
