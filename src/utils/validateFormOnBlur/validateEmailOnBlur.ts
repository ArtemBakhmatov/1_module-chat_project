/* eslint-disable linebreak-style */
const validateEmailOnBlur = (inputValue, classComponentChildren) => {
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

export default validateEmailOnBlur;
// const inputValue = e.target.value;
