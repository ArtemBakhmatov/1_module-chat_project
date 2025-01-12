
import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
import { APIError } from './type';

const profileApi = new HTTPTransport('/auth');

export default class ProfileApi {
  async getProfile(): Promise<Response> {
    const response = await profileApi.get('/user');

    if (!response.ok) {
      const errorData: APIError = await response.json(); // Если ошибка возвращается в формате JSON
      throw new Error(errorData.reason || 'Failed to get profile');
    }

    return response;
  }
}

