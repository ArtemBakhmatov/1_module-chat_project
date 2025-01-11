export const fillRegistrationField = (field: string, value: string) => {
  window.store.set({ [field]: value });
};

