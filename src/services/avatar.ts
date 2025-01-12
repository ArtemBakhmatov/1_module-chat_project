import AvatarApi from '../api/avatar';

const avatarApi = new AvatarApi();

export const changeAvatar = async (formData: FormData) => {
  try {
    const response = await avatarApi.changeAvatar(formData);
    const updatedProfile = await response.json();
    if (updatedProfile && updatedProfile.avatar) {
      window.store.set({ 
        profile: { 
          // @ts-expect-error: Игнорируем ошибку window.store
          ...window.store.getState().profile, 
          avatar: updatedProfile.avatar, 
        }, 
      });

      console.log('Store after set:', window.store.getState());
    }
  } catch (error) {
    console.error('Ошибка при изменении аватара:', error);
  }
};

