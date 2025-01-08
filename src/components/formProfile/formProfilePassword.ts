import Block from '../../core/Block';

import { Button } from '../button';
import { InputWrapper } from '../input';

interface FormProfilePasswordProps {
  onSubmit: (data: { oldPassword: string; newPassword: string }) => void;
}

interface FormProfilePasswordState {
  isValid: {
    [key: string]: boolean;
  };
}

export default class FormProfilePassword extends Block {
  private state: FormProfilePasswordState;

  constructor(props: FormProfilePasswordProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          e.preventDefault();
          console.log('изменение пароля!!');
          this.onSubmit();
        },
      },
      ButtonSave: new Button({
        classType: 'button__primary button__width',
        label: 'Сохранить',
        onClick: () => this.onSubmit(),
      }),
      InputPasswordOld: new InputWrapper({
        type: 'password',
        name: 'oldPassword',
        placeholder: 'Введите старый пароль',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
      }),
      InputPasswordNew: new InputWrapper({
        type: 'password',
        name: 'newPassword',
        placeholder: 'Введите новый пароль',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        onBlur: (e: FocusEvent) => this.onValidatePassword(e),
      }),
      InputPasswordNewRepeat: new InputWrapper({
        type: 'password',
        name: 'confirmPassword',
        placeholder: 'Введите новый пароль',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        onBlur: (e: FocusEvent) => this.onValidatePassword(e),
      }),
      
    });
    this.state = {
      isValid: {
        oldPassword: true,
        newPassword: true,
        confirmPassword: true,
      },
    };
  }

  onValidatePassword(e: FocusEvent) {
    const inputElement = e.target as HTMLInputElement;
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,40}$/;
    if (!passwordPattern.test(inputElement.value)) {
      alert('Пароль должен содержать от 8 до 40 символов, хотя бы одну заглавную букву и цифру.');
      this.state.isValid[inputElement.name] = false;
    } else {
      this.state.isValid[inputElement.name] = true;
    }
  }

  onSubmit() {
    const oldPassword = this.children.InputPasswordOld.getContent().querySelector('input')?.value;
    const newPassword = this.children.InputPasswordNew.getContent().querySelector('input')?.value;
    const confirmPassword = this.children.InputPasswordNewRepeat.getContent().querySelector('input')?.value;

    if (newPassword !== confirmPassword) {
      alert('Новый пароль и подтверждение не совпадают!');
      return;
    }

    if (!this.state.isValid.newPassword || !this.state.isValid.confirmPassword) {
      alert('Пожалуйста, исправьте ошибки в форме');
      return;
    }

    // @ts-expect-error: игнорируем ошибку
    this.props.onSubmit({ oldPassword, newPassword });
  }

  render(): string {
    return (
      `
        <form class="profile__userData">
          <div class="profile__flex">
            <div class="profile__flex_left">
              Старый пароль
            </div>
            {{{ InputPasswordOld }}}
          </div>

					<div class="profile__flex">
            <div class="profile__flex_left">
              Новый пароль
            </div>
            {{{ InputPasswordNew }}}
          </div>

					<div class="profile__flex">
            <div class="profile__flex_left">
              Повторите новый пароль
            </div>
            {{{ InputPasswordNewRepeat }}}
          </div>

          

        <div class="profile__changeUserBottom">
          {{{ ButtonSave }}}
        </div>
      </form>
`
    );
  }
}


