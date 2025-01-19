
import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
import { ChatDTO, CreateChat, UserDTO } from './type';

const chatApi = new HTTPTransport('/chats');

export default class ChatApi {
  async getChats(): Promise<ChatDTO[]> {
    const response = await chatApi.get('');
    
    return response.json();
  }

  async getToken(chatId: number): Promise<string> {
    const response = await chatApi.post(`/token/${ chatId }`);
    const result = await response.json();
    return result.token;
  }

  async createChat(data: CreateChat): Promise<number> {
    const response = await chatApi.post('', { data });

    const result = await response.json() as { id: number };
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

  async getChatUsers(chatId: number): Promise<UserDTO[]> {
    console.log('Метод getChatUsers вызван'); // Логирование
    const response = await chatApi.get(`/chats/${chatId}/users`);
    const data = await response.json();
    console.log('Ответ от API:', data); // Логирование
    return data;
  }
}



