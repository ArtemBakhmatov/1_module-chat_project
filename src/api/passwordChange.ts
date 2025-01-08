import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
import { APIError } from './type';

const passwordChangeApi = new HTTPTransport('/user');

export default class PasswordChangeApi {
  async changePassword(data: { oldPassword: string; newPassword: string }): Promise<void | APIError> {
    const response = await passwordChangeApi.put<Response>('/password', { data });

    if (!response.ok) {
      const errorData: APIError = await response.json();
      throw new Error(errorData.reason || 'Failed to change password');
    }
  }
}

// import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
// import { APIError } from './type';

// const passwordChangeApi = new HTTPTransport('/user');

// export default class PasswordChangeApi {
//   async changePassword(data: { oldPassword: string; newPassword: string }): Promise<void | APIError> {
//     try {
//       const response = await passwordChangeApi.put('/password', { data });

//       return response;
//       // if (response) {
//       //   return response;
//       // } else {
//       //   throw new Error('Failed to change password');
//       // }
//     } catch (error) {
//       const errorData: APIError = error as APIError;
//       throw new Error(errorData.reason || 'Failed to change password');
//     }
//   }
// }

