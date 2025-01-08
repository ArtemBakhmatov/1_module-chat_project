import AuthApi from '../api/auth';
import { LoginRequestData } from '../api/type';

const authApi = new AuthApi();

export const login = async (model: LoginRequestData) => {
  // @ts-expect-error: Игнорируем ошибку window.store 
  window.store.set({ isLoading: true });
  try {
    await authApi.login(model);
    /* // @ts-expect-error: Игнорируем ошибку window.router */
    // window.router.go('/messenger');
        
  } catch (error) {
    // @ts-expect-error: Игнорируем ошибку window.store 
    window.store.set({ loginError: 'some error' });
  } finally {
    // @ts-expect-error: Игнорируем ошибку window.store 
    window.store.set({ isLoading: false });
  }

};



