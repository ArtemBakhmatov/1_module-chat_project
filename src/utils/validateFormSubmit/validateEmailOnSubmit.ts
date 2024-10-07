/* eslint-disable linebreak-style */

interface ClassComponentChildrenProps {
  setProps: (props: { error: boolean; errorText: string | null }) => void;
}

const validateEmailOnSubmit = (inputValue: string, classComponentChildren: ClassComponentChildrenProps) => {
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
