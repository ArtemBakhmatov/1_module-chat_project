import PasswordChangeApi from '../api/passwordChange';

const passwordChangeApi = new PasswordChangeApi();

export const changePassword = async (data: { oldPassword: string; newPassword: string }): Promise<void> => {
  // @ts-expect-error: Игнорируем ошибку window.store
  window.store.set({ isLoading: true });
  try {
    await passwordChangeApi.changePassword(data);
    alert('Пароль успешно изменен');
  } catch (error) {
    console.error('Error changing password:', error);
    // @ts-expect-error: Игнорируем ошибку ${error.message}
    alert(`Ошибка при смене пароля: ${error.message}`);
  } finally {
    // @ts-expect-error: Игнорируем ошибку window.store
    window.store.set({ isLoading: false });
  }
};

// import PasswordChangeApi from '../api/passwordChange';

// const passwordChangeApi = new PasswordChangeApi();

// export const changePassword = async (data: { oldPassword: string; newPassword: string }): Promise<void> => {
//   // @ts-expect-error: Игнорируем ошибку window.store
//   window.store.set({ isLoading: true });
//   try {
//     await passwordChangeApi.changePassword(data);
//     alert('Пароль успешно изменен');
//   } catch (error) {
//     console.error('Error changing password:', error);
//     alert(`Ошибка при смене пароля: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
//   } finally {
//     // @ts-expect-error: Игнорируем ошибку window.store
//     window.store.set({ isLoading: false });
//   }
// };


