import ProfileChangeApi from '../api/profileChange';
import { UserDTO } from '../api/type';

const profileChangeApi = new ProfileChangeApi();

export const updateProfile = async (data: Partial<UserDTO>) => {
  window.store.set({ isLoading: true });
  try {
    const updatedProfile = await profileChangeApi.updateProfile(data);
    window.store.set({ profile: updatedProfile });
    return await updatedProfile.json();
  } catch (error) {
    console.error('Error updating profile:', error);
  } finally {
    window.store.set({ isLoading: false });
  }
};

