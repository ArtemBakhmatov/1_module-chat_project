
import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
import { UserDTO, APIError } from './type';

const profileApi = new HTTPTransport('/auth');

export default class ProfileApi {
  async getProfile(): Promise<UserDTO | APIError> {
    return profileApi.get('/user');
  }
}

