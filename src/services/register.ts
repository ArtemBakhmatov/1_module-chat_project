import AuthApi from '../api/auth';
import { CreateUser } from '../api/type';

const authApi = new AuthApi();

export const register = async (model: CreateUser) => {
  window.store.set({ isLoading: true });
  try {
    await authApi.create(model);
    // Здесь вы можете выполнить дополнительные действия после успешной регистрации
    // Например, перенаправить пользователя на страницу входа
    // @ts-expect-error: Игнорируем ошибку window.router
    window.router.go('/messenger');
  } catch (error) {
    window.store.set({ registrationError: 'Ошибка при регистрации' });
  } finally {
    window.store.set({ isLoading: false });
  }
};

