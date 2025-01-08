// import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
// import { ChatDTO, CreateChat, UserDTO } from './type';

// const chatApi = new HTTPTransport('/chats');

// export default class ChatApi {
//   async getChats(): Promise<ChatDTO[]> {
//     const response = await chatApi.get('');
//     // @ts-expect-error: Suppress error about response type
//     return response;
//   }

//   async createChat(data: CreateChat): Promise<number> {
//     const response = await chatApi.post<{ id: number }>('', { data });
//     const result = response;
//     return result.id;
//   }

//   async deleteChat(chatId: number): Promise<void> {
//     await chatApi.delete('', { data: { chatId } });
//   }

//   async addUserToChat(chatId: number, userId: number): Promise<void> {
//     await chatApi.put('/users', { data: { users: [userId], chatId } });
//   }

//   async removeUserFromChat(chatId: number, userId: number): Promise<void> {
//     await chatApi.delete('/users', { data: { users: [userId], chatId } });
//   }

//   ////// показывать пользователя для данного чата /////
//   /* async getChatUsers(chatId: number): Promise<UserDTO[]> {
//     const response = await chatApi.get(`/chats/${chatId}/users`);
//     return response.json();
//   } */

//   async getChatUsers(chatId: number): Promise<UserDTO[]> {
//     console.log('Метод getChatUsers вызван'); // Логирование
//     const response = await chatApi.get(`/chats/${chatId}/users`);
    
//     const data = await response;
//     console.log('Ответ от API:', data); // Логирование
//     // @ts-expect-error: Suppress error about response type
//     return data;
//   }
// }

import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
import { ChatDTO, CreateChat, UserDTO } from './type';

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
  async getChats(): Promise<ChatDTO[]> {
    const response = await chatApi.get('');
    // @ts-expect-error: Suppress error about response type
    return response.json();
  }

  async createChat(data: CreateChat): Promise<number> {
    const response = await chatApi.post<{ id: number }>('', { data });
    //const result = await response.json();
    // @ts-expect-error: Suppress error about response type
    const result = await response.json();
    return result.id;
  }

  async deleteChat(chatId: number): Promise<void> {
    await chatApi.delete('', { data: { chatId } });
  }

  async addUserToChat(chatId: number, userId: number): Promise<void> {
    await chatApi.put('/users', { data: { users: [userId], chatId } });
  }

  async removeUserFromChat(chatId: number, userId: number): Promise<void> {
    await chatApi.delete('/users', { data: { users: [userId], chatId } });
  }

  ////// показывать пользователя для данного чата /////
  /* async getChatUsers(chatId: number): Promise<UserDTO[]> {
    const response = await chatApi.get(`/chats/${chatId}/users`);
    return response.json();
  } */

  async getChatUsers(chatId: number): Promise<UserDTO[]> {
    console.log('Метод getChatUsers вызван'); // Логирование
    const response = await chatApi.get(`/chats/${chatId}/users`);
    // @ts-expect-error: Suppress error about response type
    const data = await response.json();
    console.log('Ответ от API:', data); // Логирование
    return data;
  }
}

