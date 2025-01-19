import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
import { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from './type';

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
  async create(data: CreateUser): Promise<SignUpResponse> {
    const response = await authApi.post('/signup', { data });
    const result = await response.json() as SignUpResponse; // Приведение результата
    return result;
  }

  async login(data: LoginRequestData): Promise<void | APIError> {
    try {
      const response = await authApi.post('/signin', { data });

      if (response.ok) {
        console.log('Авторизация прошла успешно');
        alert('Добро пожаловать!');
        
        (window.router as unknown as { go: (path: string) => void }).go('/messenger');
      } else {
        const errorData = await response.json();
        console.error('Ошибка при авторизации', errorData.reason);
        
        window.store.set({ loginError: 'Неверный логин или пароль!' });
        setTimeout(() => window.store.set({ loginError: '' }), 2000);
      }
    } catch (error) {
      console.error('Ошибка при авторизации', error);
    }
  }

  async register(data: CreateUser): Promise<void | APIError> {
    try {
      const response = await authApi.post('/signup', { data });

      if (response.ok) {
        console.log('Регистрация прошла успешно');
        alert('Регистрация прошла успешно');
        (window.router as unknown as { go: (path: string) => void }).go('/login');
      } else {
        const errorData = await response.json();
        if (response.status === 409) {
          console.error('Пользователь с такими данными уже существует', errorData.reason);
          window.store.set({ registrationError: 'Пользователь с такими данными уже существует' });
        } else {
          console.error('Ошибка при регистрации', errorData.reason || 'Неизвестная причина');
          window.store.set({ registrationError: errorData.reason || 'Неизвестная причина' });
        }
      }
    } catch (error) {
      console.error('Ошибка при регистрации', error);
      window.store.set({ registrationError: 'Неизвестная ошибка' });
    }
  }

  async me(): Promise<UserDTO | APIError | null> {
    try {
      const response = await authApi.get('/user');

      if (response.ok) {
        const userData = await response.json() as UserDTO;
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Ошибка при получении информации о пользователе', error);
      return null;
    }
  }

  async logout(): Promise<void | APIError> {
    try {
      const response = await authApi.post('/logout');

      if (response.ok) {
        console.log('Выход из системы прошел успешно');
        (window.router as unknown as { go: (path: string) => void }).go('/login');
      } else {
        const errorData = await response.json();
        console.error('Ошибка при выходе из системы', errorData.reason);
        window.store.set({ logoutError: errorData.reason });
      }
    } catch (error) {
      console.error('Ошибка при выходе из системы', error);
      window.store.set({ logoutError: 'Неизвестная ошибка' });
    }
  }
}

