/* eslint-disable linebreak-style */
import Block from '../../core/Block';
import { InputWrapper } from '../input';
// import Input from '../input/input';
import TitleElement from '../title/title';
import { Button } from '../button';

export default class FormLogin extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        submit: (e) => {
          console.log('hello!');
          e.preventDefault();
          this.onLogin(e);
        },
      },
      InputLogin: new InputWrapper({
        type: 'type',
        label: 'Логин',
        name: 'login',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangeLogin(e),
      }),
      InputPassword: new InputWrapper({
        type: 'password',
        label: 'Пароль',
        name: 'password',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangePassword(e),
      }),
      TitleLogin: new TitleElement({
        label: 'Вход',
      }),
      ButtonLogin: new Button({
        classType: 'button__primary',
        type: 'submit',
        label: 'Авторизоваться',
      }),
      ButtonNotAccount: new Button({
        classType: 'button__secondary',
        label: 'Нет аккаунта?',
      }),
    });
  }

  onChangeLogin(e) {
    const inputValue = e.target.value;
    if (inputValue === 'error') {
      this.children.InputLogin.setProps({ error: true, errorText: 'Неверный логин' });
      return;
    }

    if (inputValue.length === 0) {
      this.children.InputLogin.setProps({
        error: true,
        errorText: 'Пожалуйста, введите ваш логин!',
      });
      return;
    }

    const loginPattern = /^(?!\d+$)[A-Za-z\d_-]{3,20}$/;
    if (!loginPattern.test(inputValue)) {
      this.children.InputLogin.setProps({
        error: true,
        errorText: `Логин должен быть от 3 до 20 символов, содержать только латиницу, цифры, 
          дефис или нижнее подчёркивание, и не состоять только из цифр!`,
      });
      return;
    }
    this.children.InputLogin.setProps({ error: false, errorText: null });


    this.setProps({ login: inputValue });
  }

  onChangePassword(e) {
    const inputValue = e.target.value;
    if (inputValue === '12345') {
      this.children.InputPassword.setProps({ error: true, errorText: 'неверный пароль' });
      return;
    }

    if (inputValue.length === 0) {
      this.children.InputPassword.setProps({
        error: true,
        errorText: 'Пожалуйста, введите ваш пароль!',
      });
      return;
    }

    const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,40}$/;
    if (!passwordPattern.test(inputValue)) {
      this.children.InputPassword.setProps({
        error: true,
        errorText: `Пожалуйста, ваш пароль должен быть от 8 до 40 символов, 
          обязательно хотя бы одна заглавная буква и цифра.!`,
      });
      return;
    }
    this.children.InputPassword.setProps({ error: false, errorText: null });


    this.setProps({ password: inputValue });
  }

  onLogin(e) {
    const loginSubmit = this.props.login;
    console.log({
      login: loginSubmit,
      password: this.props.password,
    });
    if (loginSubmit === undefined) {
      console.log('поле пустое');
    }
    console.log(loginSubmit);
    if (loginSubmit === undefined) {
      this.children.InputLogin.setProps({
        error: true,
        errorText: 'поле пустое',
      });
      return;
    }
    this.children.InputLogin.setProps({ error: false, errorText: null });
  }

  render(): string {
    return (
      `
        <form class="login-form__wrapper">
          {{{ TitleLogin }}}
          {{{ InputLogin }}}
          {{{ InputPassword }}}
          <div class="login-form__buttons">
            {{{ ButtonLogin }}}
            {{{ ButtonNotAccount }}}
          </div>
        </form>
      `
    );
  }
}
