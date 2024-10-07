/* eslint-disable linebreak-style */

interface ClassComponentChildrenProps {
  setProps: (props: { error: boolean; errorText: string | null }) => void;
}

const validatePhoneOnSubmit = (inputValue: string, classComponentChildren: ClassComponentChildrenProps) => {
  const phonePattern = /^((\+7|7|8)+([0-9]){10})$/;

  if (inputValue === undefined) {
    classComponentChildren.setProps({
      error: true,
      errorText: 'Введите корректный номер телефона в формате +7XXXXXXXXXX!',
    });
    return;
  }

  if (!phonePattern.test(inputValue)) {
    classComponentChildren.setProps({
      error: true,
      errorText: 'Введите корректный номер телефона в формате +7XXXXXXXXXX!',
    });
    return;
  }
  classComponentChildren.setProps({ error: false, errorText: null });
};

export default validatePhoneOnSubmit;
// const inputValue = e.target.value;
