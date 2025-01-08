//import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
//import { APIError } from './type';

/* const passwordChangeApi = new HTTPTransport('/user');

export default class PasswordChangeApi {
  updateProfile(data: Partial<import('./type').UserDTO>) {
    throw new Error('Method not implemented.');
  }

  async changePassword(data: { oldPassword: string; newPassword: string }): Promise<void | APIError> {
    const response = await passwordChangeApi.put<Response>('/password', { data });

    if (!response.ok) {
      const errorData: APIError = await response.json();
      throw new Error(errorData.reason || 'Failed to change password');
    }
  }
} */

import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
import { UserDTO, APIError } from './type';

const profileChangeApi = new HTTPTransport('/user');

export default class ProfileChangeApi {
  async updateProfile(data: Partial<UserDTO>): Promise<UserDTO | APIError> {
    return profileChangeApi.put<UserDTO>('/profile', { data });
  }
}

// import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
// import { UserDTO, APIError } from './type';

// const profileChangeApi = new HTTPTransport('/user');

// export default class ProfileChangeApi {
//   async updateProfile(data: Partial<UserDTO>): Promise<UserDTO | APIError> {
//     return profileChangeApi.put<UserDTO>('/profile', { data });
//   }
// }


