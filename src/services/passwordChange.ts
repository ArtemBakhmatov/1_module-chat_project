import PasswordChangeApi from '../api/passwordChange';

const passwordChangeApi = new PasswordChangeApi();

export const changePassword = async (data: { oldPassword: string; newPassword: string }): Promise<void> => {
  window.store.set({ isLoading: true });
  try {
    await passwordChangeApi.changePassword(data);
    alert('Пароль успешно изменен');
  } catch (error) {
    console.error('Error changing password:', error);
    // @ts-expect-error: Игнорируем ошибку ${error.message}
    alert(`Ошибка при смене пароля: ${error.message}`);
  } finally {
    window.store.set({ isLoading: false });
  }
};




