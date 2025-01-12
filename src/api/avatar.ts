import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';

const avatarApi = new HTTPTransport('/user/profile');

export default class AvatarApi {
  async changeAvatar(data: FormData): Promise<Response> {
    const response = await avatarApi.put('/avatar', { data });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении аватара');
    }
    
    return response;
  }
}


