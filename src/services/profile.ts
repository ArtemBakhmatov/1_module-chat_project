import ProfileApi from '../api/profile';
// import { UserDTO } from '../api/type';

const profileApi = new ProfileApi();

export const loadProfile = async () => {
  console.log('loadProfile called'); // Логирование для проверки вызова
  window.store.set({ isLoading: true });
  try {
    const response = await profileApi.getProfile();
    
    const profileData = await response.json(); // Извлечение JSON-данных 
    console.log('Profile Data Loaded:', profileData); // Добавьте это для проверки
    window.store.set({ profile: profileData });
  } catch (error) {
    console.error('Error loading profile:', error);
  } finally {
    window.store.set({ isLoading: false });
  }
  
};

