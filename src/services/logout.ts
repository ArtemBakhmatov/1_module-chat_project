import AuthApi from '../api/auth';

const authApi = new AuthApi();

export const logout = async () => {
  window.store.set({ isLoading: true });
  try {
    await authApi.logout();
    console.log('Выход из системы прошел успешно');
    alert('Выход из системы прошел успешно');
    // Перенаправляем пользователя на страницу входа после выхода
    // @ts-expect-error: Игнорируем ошибку window.router 
    window.router.go('/login');
  } catch (error) {
    console.error('Ошибка при выходе из системы', error);
    window.store.set({ logoutError: 'Ошибка при выходе из системы' });
  } finally { 
    window.store.set({ isLoading: false });
  }
};

