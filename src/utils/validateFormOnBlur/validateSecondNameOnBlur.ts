/* eslint-disable linebreak-style */
interface ClassComponentChildrenProps {
  setProps: (props: { error: boolean; errorText: string | null }) => void;
}
const validateSecondNameOnBlur = (inputValue: string, classComponentChildren: ClassComponentChildrenProps) => {
  if (inputValue.length === 0) {
    classComponentChildren.setProps({
      error: true,
      errorText: 'Поле имени не должно быть пустым!',
    });
    return;
  }

  if (inputValue.length < 2) {
    classComponentChildren.setProps({
      error: true,
      errorText: 'Имя должно содержать минимум 2 символа!',
    });
    return;
  }

  if (!/^[A-ZА-Я][a-zа-я-]*$/.test(inputValue)) {
    classComponentChildren.setProps({
      error: true,
      errorText: `Имя должно содержать только буквы и дефис, 
          начинаться с заглавной буквы, и не содержать пробелов или цифр!`,
    });
    return;
  }

  classComponentChildren.setProps({ error: false, errorText: null });
};

export default validateSecondNameOnBlur;
// const inputValue = e.target.value;
