import ChatApi from '../api/chatApi';
import { ChatDTO, CreateChat, UserDTO } from '../api/type';

// Инициализация API
const chatApi = new ChatApi();

// Получение списка чатов
export const fetchChats = async (): Promise<ChatDTO[]> => {
  try {
    const chats = await chatApi.getChats();
    // Обновление глобального состояния, если необходимо
    // window.store.set({ chats });
    return chats;
  } catch (error) {
    console.error('Ошибка при получении чатов', error);
    throw error;
  }
};

// Создание нового чата
export const createChat = async (data: CreateChat): Promise<number> => {
  try {
    const chatId = await chatApi.createChat(data);
    // Обновление глобального состояния, если необходимо
    // window.store.set({ newChatId: chatId });
    console.log('Чат создан с ID:', chatId);
    return chatId;
  } catch (error) {
    console.error('Ошибка при создании чата', error);
    throw error;
  }
};

// Удаление чата
export const deleteChat = async (chatId: number): Promise<void> => {
  try {
    await chatApi.deleteChat(chatId);
    // Обновление глобального состояния, если необходимо
    // window.store.set({ chatDeleted: true });
  } catch (error) {
    console.error('Ошибка при удалении чата', error);
    throw error;
  }
};

// Добавление пользователя в чат
export const addUserToChat = async (chatId: number, userId: number): Promise<void> => {
  try {
    await chatApi.addUserToChat(chatId, userId);
    console.log(`User ${userId} added to chat ${chatId}`);
  } catch (error) {
    console.error('Ошибка при добавлении пользователя в чат', error);
    throw error;
  }
};

// Удаление пользователя из чата
export const removeUserFromChat = async (chatId: number, userId: number): Promise<void> => {
  try {
    await chatApi.removeUserFromChat(chatId, userId);
    console.log(`User ${userId} removed from chat ${chatId}`);
  } catch (error) {
    console.error('Ошибка при удалении пользователя из чата', error);
    throw error;
  }
};

// Получение пользователя из чата
export const fetchChatUsers = async (chatId: number): Promise<UserDTO[]> => {
  try {
    const users = await chatApi.getChatUsers(chatId);
    console.log('Полученные пользователи:', users); // Добавьте логирование
    return users;
  } catch (error) {
    console.error('Ошибка при получении пользователей чата', error);
    throw error;
  }
};

export const fetchToken = async (chatId: number): Promise<string> => {
  try {
    const token = await chatApi.getToken(chatId);
    console.log('Получен токен', token );
    return token;
  } catch (error) {
    console.error('Ошибка при получении токена', error);
    throw error;
  }
};

export const clearMessages = () => {
  window.store.set({ messages: [] });
};






