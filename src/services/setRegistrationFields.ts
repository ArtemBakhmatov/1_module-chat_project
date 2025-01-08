export const fillRegistrationField = (field: string, value: string) => {
  // @ts-expect-error: Игнорируем ошибку window.store 
  window.store.set({ [field]: value });
};