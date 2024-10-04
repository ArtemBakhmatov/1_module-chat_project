/* eslint-disable linebreak-style */
const validatePhoneOnBlur = (inputValue, classComponentChildren) => {
  const phonePattern = /^((\+7|7|8)+([0-9]){10})$/;

  if (!phonePattern.test(inputValue)) {
    classComponentChildren.setProps({
      error: true,
      errorText: 'Введите корректный номер телефона в формате +7XXXXXXXXXX!',
    });
    return;
  }
  classComponentChildren.setProps({ error: false, errorText: null });

  this.setProps({ phone: inputValue });
};

export default validatePhoneOnBlur;
// const inputValue = e.target.value;
