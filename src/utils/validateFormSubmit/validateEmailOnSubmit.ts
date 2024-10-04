/* eslint-disable linebreak-style */
const validateEmailOnSubmit = (inputValue, classComponentChildren) => {
  if (inputValue === undefined) {
    classComponentChildren.setProps({
      error: true,
      errorText: 'Введите корректный email!',
    });
    return;
  }
  classComponentChildren.setProps({ error: false, errorText: null });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(inputValue)) {
    classComponentChildren.setProps({
      error: true,
      errorText: 'Введите корректный email!',
    });
    return;
  }
  classComponentChildren.setProps({ error: false, errorText: null });
};

export default validateEmailOnSubmit;
