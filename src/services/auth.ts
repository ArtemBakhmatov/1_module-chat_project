import AuthApi from '../api/auth';
import { LoginRequestData } from '../api/type';

const authApi = new AuthApi();

export const login = async (model: LoginRequestData) => {
  window.store.set({ isLoading: true });
  try {
    await authApi.login(model);
        
  } catch (error) {
    window.store.set({ loginError: 'some error' });
  } finally {
    window.store.set({ isLoading: false });
  }

};



