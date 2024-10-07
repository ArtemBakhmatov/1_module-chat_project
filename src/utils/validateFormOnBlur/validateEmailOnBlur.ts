/* eslint-disable linebreak-style */

interface ClassComponentChildrenProps {
  setProps: (props: { error: boolean; errorText: string | null }) => void;
}
const validateEmailOnBlur = (inputValue: string, classComponentChildren: ClassComponentChildrenProps) => {
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
