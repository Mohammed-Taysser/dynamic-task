import axios, { AxiosError, AxiosInstance } from 'axios';
import { LocalStorage } from './localStorage';
import routes from './Routes';

const API_ENDPOINT = 'http://62.171.166.157:5050/api/';

class AxiosAPI {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_ENDPOINT,
    });

    this.axiosInstance.interceptors.request.use(
      async (request) => {
        const token = LocalStorage.get('accessToken');

        request.headers.authorization = `Bearer ${token}`;

        request.headers['Content-Type'] = 'application/json';

        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const token = LocalStorage.get('refreshToken');
        const originalConfig = error.config;

        if (!token) {
          routes.navigate('/login');
        }

        if (error.response.status === 401 && token && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const response = await this.refreshToken(token);

            LocalStorage.set('accessToken', response.data.access);
          } catch (err) {
            const errorResponse = err as AxiosError<ResponseError>;
            if (errorResponse?.response?.data) {
              routes.navigate('/login');

              return Promise.reject(errorResponse.response.data);
            }
          }

          return this.axiosInstance(originalConfig);
        }

        return Promise.reject(error);
      }
    );
  }

  // Auth Endpoints
  login(body = {}) {
    return this.axiosInstance.post('login/', body);
  }
  refreshToken(token: string) {
    return this.axiosInstance.post('token/refresh/', { refresh: token });
  }

  verifyToken(token: string) {
    return this.axiosInstance.post('token/verify/', { token });
  }

  // Contacts Endpoints
  getContacts(params: GetContactsQueryParams) {
    return this.axiosInstance.get('contact/', {
      params,
    });
  }

  getContact(id: number) {
    return this.axiosInstance.get(`contact/${id}/`);
  }

  createContact(body: Omit<ContactItem, 'id'>) {
    return this.axiosInstance.post(`contact/`, body);
  }

  updateContact(id: number, body: Omit<ContactItem, 'id'>) {
    return this.axiosInstance.put(`contact/${id}/`, body);
  }

  deleteContacts(id: number) {
    return this.axiosInstance.delete(`contact/${id}/`);
  }
}

const API = new AxiosAPI();

export { API };
