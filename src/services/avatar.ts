// import AvatarApi from '../api/avatar';

// const avatarApi = new AvatarApi();

// export const changeAvatar = async (file: File): Promise<void> => {
//   // @ts-expect-error: Игнорируем ошибку window.store
//   window.store.set({ isLoading: true });
//   try {
//     const data = await avatarApi.changeAvatar(file);
//     // @ts-expect-error: Игнорируем ошибку window.store
//     window.store.set({ avatarUrl: data.avatar });
//     alert('Avatar changed successfully');
//   } catch (error) {
//     console.error('Error changing avatar:', error);
//     alert(`Error changing avatar: ${error.message}`);
//   } finally {
//     // @ts-expect-error: Игнорируем ошибку window.store
//     window.store.set({ isLoading: false });
//   }
// };

// import AvatarApi from '../api/avatar';

// const avatarApi = new AvatarApi();

// export const changeAvatar = async (file: File): Promise<void> => {
//   // @ts-expect-error: Игнорируем ошибку window.store
//   window.store.set({ isLoading: true });
//   try {
//     const data = await avatarApi.changeAvatar(file);
//     // @ts-expect-error: Игнорируем ошибку window.store
//     window.store.set({ avatarUrl: data.avatar });
//     alert('Avatar changed successfully');
//   } catch (error) {
//     console.error('Error changing avatar:', error);
//     throw error;
//   } finally {
//     // @ts-expect-error: Игнорируем ошибку window.store
//     window.store.set({ isLoading: false });
//   }
// };


/* ////////////// этот код сделан для страницы редактирования пароля //////////////////////////
import AvatarApi from '../api/avatar';
import { getAvatarUrl } from '../api/resources';
//import { APIError } from '../api/type';

const avatarApi = new AvatarApi();

export const changeAvatar = async (file: File): Promise<void> => {
  // @ts-expect-error: Игнорируем ошибку window.store
  window.store.set({ isLoading: true });
  try {
    const data = await avatarApi.changeAvatar(file);
    console.log('Avatar path from server:', data.avatar);
    const avatarUrl = getAvatarUrl(data.avatar);
    console.log('Full avatar URL:', avatarUrl);
    console.log('Setting avatarUrl in store (after upload):', avatarUrl);
    // @ts-expect-error: Игнорируем ошибку window.store
    window.store.set({ avatarUrl });
    alert('Avatar changed successfully');
  } catch (error) {
    console.error('Error changing avatar:', error);
    alert(`Error changing avatar: ${error.message}`);
  } finally {
    // @ts-expect-error: Игнорируем ошибку window.store
    window.store.set({ isLoading: false });
  }
};

//////////////////////////////////////////////////////////////////////////////// */

// import AvatarApi from '../api/avatar';

// const avatarApi = new AvatarApi();

// export const changeAvatar = async (formData: FormData) => {
//   try {
//     const response = await avatarApi.changeAvatar(formData);
//     // @ts-expect-error: Игнорируем ошибку window.store
//     window.store.set({ 
//       profile: { 
//         // @ts-expect-error: Игнорируем ошибку window.store
//         ...window.store.getState().profile, 
//         avatar: response.avatar, 
//       }, 
//     });
//   } catch (error) {
//     console.error('Ошибка при изменении аватара:', error);
//   }
// };


import AvatarApi from '../api/avatar';

const avatarApi = new AvatarApi();

// export const changeAvatar = async (formData: FormData) => {
//   try {
//     const response = await avatarApi.changeAvatar(formData);
//     const updatedProfile = response;

//     console.log('Response from server:', updatedProfile); // Логируем ответ сервера

//     if (updatedProfile && updatedProfile.avatar) {
//       console.log('Updated avatar:', updatedProfile.avatar); // Логируем новый аватар
//       // @ts-expect-error: Игнорируем ошибку window.store
//       window.store.set({ 
//         profile: { 
//           // @ts-expect-error: Игнорируем ошибку window.store
//           ...window.store.getState().profile, 
//           avatar: updatedProfile.avatar, 
//         }, 
//       });
//       // @ts-expect-error: Игнорируем ошибку window.store
//       console.log('Store after update:', window.store.getState()); // Логируем состояние store
//       // @ts-expect-error: Игнорируем ошибку window.store
//       console.log('Store after set:', window.store.getState()); // Логируем состояние store после установки
//     }
//   } catch (error) {
//     console.error('Ошибка при изменении аватара:', error);
//   }
// };

export const changeAvatar = async (formData: FormData) => {
  try {
    const response = await avatarApi.changeAvatar(formData);
    const updatedProfile = await response.json();
    // @ts-expect-error: Игнорируем ошибку updatedProfile.avatar
    if (updatedProfile && updatedProfile.avatar) {
      // @ts-expect-error: Игнорируем ошибку window.store
      window.store.set({ 
        profile: { 
          // @ts-expect-error: Игнорируем ошибку window.store
          ...window.store.getState().profile, 
          // @ts-expect-error: Игнорируем ошибку updatedProfile.avatar
          avatar: updatedProfile.avatar, 
        }, 
      });

      // @ts-expect-error: Игнорируем ошибку window.store
      console.log('Store after set:', window.store.getState()); // Логируем состояние store после установки
    }
  } catch (error) {
    console.error('Ошибка при изменении аватара:', error);
  }
};