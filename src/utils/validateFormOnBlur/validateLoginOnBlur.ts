/* eslint-disable linebreak-style */
const validateLoginOnBlur = (inputValue, classComponentChildren) => {
  const loginPattern = /^(?!\d+$)[A-Za-z\d_-]{3,20}$/;

  if (!loginPattern.test(inputValue)) {
    classComponentChildren.setProps({
      error: true,
      errorText: `Логин должен быть от 3 до 20 символов, содержать только латиницу, цифры, 
          дефис или нижнее подчёркивание, и не состоять только из цифр!`,
    });
    return;
  }
  classComponentChildren.setProps({ error: false, errorText: null });
};

export default validateLoginOnBlur;
// const inputValue = e.target.value;
