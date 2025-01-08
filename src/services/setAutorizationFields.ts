export const fillLogin = (value: string) => {
  // @ts-expect-error: Игнорируем ошибку window.store 
  window.store.set({ loginField: value });
};


