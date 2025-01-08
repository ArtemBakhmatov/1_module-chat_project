import ProfileChangeApi from '../api/profileChange';
import { UserDTO } from '../api/type';

const profileChangeApi = new ProfileChangeApi();

export const updateProfile = async (data: Partial<UserDTO>) => {
  // @ts-expect-error: Игнорируем ошибку window.store
  window.store.set({ isLoading: true });
  try {
    const updatedProfile = await profileChangeApi.updateProfile(data);
    // @ts-expect-error: Игнорируем ошибку window.store
    window.store.set({ profile: updatedProfile });
    // @ts-expect-error: Игнорируем ошибку window.store
    return updatedProfile.json();
  } catch (error) {
    console.error('Error updating profile:', error);
  } finally {
    // @ts-expect-error: Игнорируем ошибку window.store
    window.store.set({ isLoading: false });
  }
};

// export const updateProfile = async (data: Partial<UserDTO>): Promise<void> => {
//   // @ts-expect-error: Игнорируем ошибку window.store
//   window.store.set({ isLoading: true });
//   try {
//     const updatedProfile = await profileChangeApi.updateProfile(data);
    
//     console.log('Response from server:', updatedProfile); // Логируем ответ сервера

//     if (updatedProfile) {
//       console.log('Updated profile:', updatedProfile); // Логируем обновлённый профиль

//       // @ts-expect-error: Игнорируем ошибку window.store
//       window.store.set({ 
//         profile: { 
//           // @ts-expect-error: Игнорируем ошибку window.store
//           ...window.store.getState().profile, 
//           ...updatedProfile, 
//         }, 
//       });

//       window.location.href = '/profile';
//     }
//   } catch (error) {
//     console.error('Error updating profile:', error);
//   } finally {
//     // @ts-expect-error: Игнорируем ошибку window.store
//     window.store.set({ isLoading: false });
//   }
// };

