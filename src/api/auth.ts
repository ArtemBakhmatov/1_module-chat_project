import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
import { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from './type';

const authApi = new HTTPTransport('/auth');

export default class AuthApi {
  async create(data: CreateUser): Promise<SignUpResponse> {
    return authApi.post<SignUpResponse>('/signup', { data });
  }

  async login(data: LoginRequestData): Promise<void | APIError> {
    // return authApi.post('/signin', {data});
    // return delay(data.login === 'httperror');
    try {
      const response = await authApi.post<Response>('/signin', { data });
  
      if (response.ok) {
        console.log('Авторизация прошла успешно');
        alert('Добро пожаловать!');
        // @ts-expect-error: Игнорируем ошибку window.router
        window.router.go('/messenger');
      } else {
        const errorData = await response.json();
        console.error('Ошибка при авторизации', errorData.reason);
        
        // @ts-expect-error: Игнорируем ошибку window.store
        window.store.set({ loginError: 'Неверный логин или пароль!' });
        // @ts-expect-error: Игнорируем ошибку window.store
        setTimeout(() => window.store.set({ loginError: '' }), 2000);
      }
    } catch (error) {
      console.error('Ошибка при авторизации', error);
      // Обновите глобальное состояние или покажите сообщение об ошибке
      // window.store.set({ loginError: 'Неизвестная ошибка' });
    }
  }

  async register(data: CreateUser): Promise<void | APIError> {
    try {
      const response = await authApi.post<Response>('/signup', { data });
  
      if (response.ok) {
        console.log('Регистрация прошла успешно');
        alert('Регистрация прошла успешно');
        // Дополнительная логика после успешной регистрации, например, перенаправление
        // @ts-expect-error: Игнорируем ошибку window.store
        window.router.go('/login'); // Перенаправляем пользователя на страницу входа
      } else {
        const errorData = await response.json();
        if (response.status === 409) {
          console.error('Пользователь с такими данными уже существует', errorData.reason);
          // @ts-expect-error: Игнорируем ошибку window.store
          window.store.set({ registrationError: 'Пользователь с такими данными уже существует' });
        } else {
          console.error('Ошибка при регистрации', errorData.reason || 'Неизвестная причина');
          // @ts-expect-error: Игнорируем ошибку window.store
          window.store.set({ registrationError: errorData.reason || 'Неизвестная причина' });
        }
      }
    } catch (error) {
      console.error('Ошибка при регистрации', error);
      // Обновите глобальное состояние или покажите сообщение об ошибке
      // @ts-expect-error: Игнорируем ошибку window.store
      window.store.set({ registrationError: 'Неизвестная ошибка' });
    }
  }

  async me(): Promise<UserDTO | APIError> {
    return authApi.get('/user');
  }

  async logout(): Promise<void | APIError> {
    try {
      const response = await authApi.post<Response>('/logout');
  
      if (response.ok) {
        console.log('Выход из системы прошел успешно');
        // Дополнительная логика после успешного выхода
        // @ts-expect-error: Игнорируем ошибку window.router
        window.router.go('/login'); // Перенаправляем пользователя на страницу входа
      } else {
        const errorData = await response.json();
        console.error('Ошибка при выходе из системы', errorData.reason);
        // @ts-expect-error: Игнорируем ошибку window.store
        window.store.set({ logoutError: errorData.reason });
      }
    } catch (error) {
      console.error('Ошибка при выходе из системы', error);
      // @ts-expect-error: Игнорируем ошибку window.store
      window.store.set({ logoutError: 'Неизвестная ошибка' });
    }
  }
}



// import { HTTPTransport } from '../utils/HTTPTransport/HTTPTransport';
// import { APIError, CreateUser, LoginRequestData, SignUpResponse, UserDTO } from './type';

// const authApi = new HTTPTransport('/auth');

// export default class AuthApi {
//   async create(data: CreateUser): Promise<SignUpResponse> {
//     return authApi.post<SignUpResponse>('/signup', { data });
//   }

//   async login(data: LoginRequestData): Promise<void | APIError> {
//     try {
//       const response = await authApi.post('/signin', { data });

//       if (response) {
//         console.log('Авторизация прошла успешно');
//         // @ts-expect-error: Игнорируем ошибку window.router
//         window.router.go('/messenger');
//       } else {
//         console.error('Ошибка при авторизации', response.reason);
//         // @ts-expect-error: Игнорируем ошибку window.store
//         window.store.set({ loginError: response.reason });
//       }
//     } catch (error) {
//       console.error('Ошибка при авторизации', error);
//       // @ts-expect-error: Игнорируем ошибку window.store
//       window.store.set({ loginError: 'Неизвестная ошибка' });
//     }
//   }

//   async register(data: CreateUser): Promise<void | APIError> {
//     try {
//       const response = await authApi.post('/signup', { data });

//       if (response) {
//         console.log('Регистрация прошла успешно');
//         // @ts-expect-error: Игнорируем ошибку window.router
//         window.router.go('/login');
//       } else {
//         if (response.status === 409) {
//           console.error('Пользователь с такими данными уже существует', response.reason);
//           // @ts-expect-error: Игнорируем ошибку window.store
//           window.store.set({ registrationError: 'Пользователь с такими данными уже существует' });
//         } else {
//           console.error('Ошибка при регистрации', response.reason || 'Неизвестная причина');
//           // @ts-expect-error: Игнорируем ошибку window.store
//           window.store.set({ registrationError: response.reason || 'Неизвестная причина' });
//         }
//       }
//     } catch (error) {
//       console.error('Ошибка при регистрации', error);
//       // @ts-expect-error: Игнорируем ошибку window.store
//       window.store.set({ registrationError: 'Неизвестная ошибка' });
//     }
//   }

//   async me(): Promise<UserDTO | APIError> {
//     return authApi.get('/user');
//   }

//   async logout(): Promise<void | APIError> {
//     try {
//       const response = await authApi.post('/logout');

//       if (response) {
//         console.log('Выход из системы прошел успешно');
//         // @ts-expect-error: Игнорируем ошибку window.router
//         window.router.go('/login');
//       } else {
//         console.error('Ошибка при выходе из системы', response.reason);
//         // @ts-expect-error: Игнорируем ошибку window.store
//         window.store.set({ logoutError: response.reason });
//       }
//     } catch (error) {
//       console.error('Ошибка при выходе из системы', error);
//       // @ts-expect-error: Игнорируем ошибку window.store
//       window.store.set({ logoutError: 'Неизвестная ошибка' });
//     }
//   }
// }


