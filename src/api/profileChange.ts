import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
import { UserDTO } from './type';

const profileChangeApi = new HTTPTransport('/user');

export default class ProfileChangeApi {
  async updateProfile(data: Partial<UserDTO>): Promise<Response> {
    return profileChangeApi.put('/profile', { data });
  }
}


