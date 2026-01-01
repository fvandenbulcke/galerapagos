import axios from 'axios';

const API_URL = 'http://localhost:3000'

const httpClient = axios.create({
  withCredentials: true,
});

const getMarvelCharacters = async <T>(path: string): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json'
  };

  const queryString = `https://gateway.marvel.com:443/v1/public/characters/${path}?ts=1&apikey=f9b0e2941ae8af423029b90f76da1fdb&hash=a491c2e9141631d4e9efbd2e0737290f`;
  return httpClient.get(queryString, { headers })
    .then((response) => response.data as unknown as T);
};

const get = async <T>(path: string): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json'
  };
  return httpClient.get(`${API_URL}${path}`, { headers })
    .then((response) => response.data as unknown as T);
};

const post = async <T>(path: string, payload?: unknown): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json'
  };

  return httpClient.post(`${API_URL}${path}`, payload, { headers })
    .then((response) => response.data as unknown as T);
};

/* const put = async <T>(path: string, payload?: unknown): Promise<T> => {
  const configuration = await configurationService.getConfiguration();

  const headers = {
    'content-type': 'application/json',
  };

  return httpClient.put(`${configuration['marti-bff-url']}${path}`, payload, { headers })
    .then((response) => response.data as unknown as T);
}; */

export default {
  get,
  getMarvelCharacters,
  post,
};
