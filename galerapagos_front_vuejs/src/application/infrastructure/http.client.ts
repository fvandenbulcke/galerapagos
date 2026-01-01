import axios from 'axios';
import { API_URL } from './constants';

axios.defaults.withCredentials = true;

const httpClient = axios.create();

const get = async <T>(path: string): Promise<T> => {
  const queryString = new URLSearchParams(API_URL).toString();

  fetch(queryString);

  return httpClient.get(`${API_URL}${path}`).then((response) => response.data as unknown as T);
};

const post = async <T>(path: string, payload?: unknown): Promise<T> => {
  const headers = {
    'content-type': 'application/json',
  };

  return httpClient
    .post(`${API_URL}${path}`, payload, { headers })
    .then((response) => response.data as unknown as T);
};

const put = async <T>(path: string, payload?: unknown): Promise<T> => {
  const headers = {
    'content-type': 'application/json',
  };

  return httpClient
    .put(`${API_URL}${path}`, payload, { headers })
    .then((response) => response.data as unknown as T);
};

export default {
  get,
  post,
  put,
};
