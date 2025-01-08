import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
import { UserDTO } from './type';

const avatarApi = new HTTPTransport('/user/profile');

export default class AvatarApi {
  async changeAvatar(data: FormData): Promise<UserDTO> {
    return avatarApi.put<UserDTO>('/avatar', { data });
  }
}

