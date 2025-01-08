import ProfileApi from '../api/profile';
// import { UserDTO } from '../api/type';

const profileApi = new ProfileApi();

export const loadProfile = async () => {
  console.log('loadProfile called'); // Логирование для проверки вызова
  // @ts-expect-error: Игнорируем ошибку window.store
  window.store.set({ isLoading: true });
  try {
    const response = await profileApi.getProfile();
    
    // @ts-expect-error: Игнорируем ошибку response.json();e
    const profileData = await response.json(); // Извлечение JSON-данных 
    console.log('Profile Data Loaded:', profileData); // Добавьте это для проверки
    // @ts-expect-error: Игнорируем ошибку window.store
    window.store.set({ profile: profileData });
  } catch (error) {
    console.error('Error loading profile:', error);
  } finally {
    // @ts-expect-error: Игнорируем ошибку window.store
    window.store.set({ isLoading: false });
  }
  
};

// export const loadProfile = async (): Promise<void> => {
//   console.log('loadProfile called'); // Логирование для проверки вызова
//   // @ts-expect-error: Игнорируем ошибку window.store
//   window.store.set({ isLoading: true });
//   try {
//     const response = await profileApi.getProfile();
    
//     const profileData = response; 
//     console.log('Profile Data Loaded:', profileData); // Проверка загруженных данных

//     if (profileData) {
//       // @ts-expect-error: Игнорируем ошибку window.store
//       window.store.set({ profile: profileData });

//       // Логирование состояния store после обновления
//       // @ts-expect-error: Игнорируем ошибку window.store
      
//       console.log('Store after load:', window.store.getState());
//     }
//   } catch (error) {
//     console.error('Error loading profile:', error);
//   } finally {
//     // @ts-expect-error: Игнорируем ошибку window.store
//     window.store.set({ isLoading: false });
//   }
// };

// export const updateProfile = async (data: Partial<UserDTO>) => {
//   // @ts-expect-error: Игнорируем ошибку window.store 
//   window.store.set({ isLoading: true });
//   try {
//     const updatedProfile = await profileApi.updateProfile(data);
//     if ('reason' in updatedProfile) {
//       throw new Error(updatedProfile.reason);
//     }
//     // @ts-expect-error: Игнорируем ошибку window.store 
//     window.store.set({ profile: updatedProfile });
//   } catch (error) {
//     console.error('Ошибка при обновлении профиля', error);
//   } finally {
//     // @ts-expect-error: Игнорируем ошибку window.store 
//     window.store.set({ isLoading: false });
//   }
// };

