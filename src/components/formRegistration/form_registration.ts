/* eslint-disable linebreak-style */
import Block from '../../core/Block';

import { TitleElement } from '../title';
import { InputWrapper } from '../input';
import { Button } from '../button';

export default class FormRegistration extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        submit: (e) => {
          e.preventDefault();
          console.log('Регистрация');
          this.onRegistration(e);
        },
      },
      TitleRegistration: new TitleElement({
        label: 'Регистрация',
      }),
      InputEmail: new InputWrapper({
        type: 'email',
        label: 'Почта',
        name: 'email',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangeEmail(e),
      }),
      InputLogin: new InputWrapper({
        type: 'text',
        label: 'Логин',
        name: 'login',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangeLogin(e),
      }),
      InputFirstName: new InputWrapper({
        type: 'text',
        label: 'Имя',
        name: 'first_name',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangeFirstName(e),
      }),
      InputSecondName: new InputWrapper({
        type: 'text',
        label: 'Фамилия',
        name: 'second_name',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangeSecondName(e),
      }),
      InputPhone: new InputWrapper({
        type: 'tel',
        label: 'Телефон',
        name: 'phone',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangePhone(e),
      }),
      InputPasswordFirst: new InputWrapper({
        type: 'password',
        label: 'Пароль',
        name: 'password',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangePasswordFirst(e),
      }),
      InputPasswordSecond: new InputWrapper({
        type: 'password',
        label: 'Пароль (ещё раз)',
        name: 'password',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangePasswordSecond(e),
      }),
      ButtonRegistration: new Button({
        classType: 'button__primary',
        type: 'submit',
        label: 'Зарегистрироваться',
      }),
      ButtonLogin: new Button({
        classType: 'button__secondary',
        label: 'Войти',
      }),
    });
  }

  onChangeEmail(e) {
    const inputValueEmail = e.target.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(inputValueEmail)) {
      this.children.InputEmail.setProps({
        error: true,
        errorText: 'Введите корректный email!',
      });
      return;
    }
    this.children.InputEmail.setProps({ error: false, errorText: null });


    this.setProps({ email: inputValueEmail });
  }

  onChangeLogin(e) {
    const inputValueLogin = e.target.value;
    const loginPattern = /^(?!\d+$)[A-Za-z\d_-]{3,20}$/;

    if (!loginPattern.test(inputValueLogin)) {
      this.children.InputLogin.setProps({
        error: true,
        errorText: `Логин должен быть от 3 до 20 символов, содержать только латиницу, цифры, 
          дефис или нижнее подчёркивание, и не состоять только из цифр!`,
      });
      return;
    }
    this.children.InputLogin.setProps({ error: false, errorText: null });


    this.setProps({ login: inputValueLogin });
  }

  onChangeFirstName(e) {
    const inputValueName = e.target.value;

    if (inputValueName.length === 0) {
      this.children.InputFirstName.setProps({
        error: true,
        errorText: 'Поле имени не должно быть пустым!',
      });
      return;
    }

    if (inputValueName.length < 2) {
      this.children.InputFirstName.setProps({
        error: true,
        errorText: 'Имя должно содержать минимум 2 символа!',
      });
      return;
    }

    if (!/^[A-ZА-Я][a-zа-я-]*$/.test(inputValueName)) {
      this.children.InputFirstName.setProps({
        error: true,
        errorText: `Имя должно содержать только буквы и дефис, 
          начинаться с заглавной буквы, и не содержать пробелов или цифр!`,
      });
      return;
    }

    this.children.InputFirstName.setProps({ error: false, errorText: null });

    this.setProps({ first_name: inputValueName });
  }

  onChangeSecondName(e) {
    const inputValueName = e.target.value;

    if (inputValueName.length === 0) {
      this.children.InputSecondName.setProps({
        error: true,
        errorText: 'Поле фамилии не должно быть пустым!',
      });
      return;
    }

    if (inputValueName.length < 2) {
      this.children.InputSecondName.setProps({
        error: true,
        errorText: 'Фамилия должно содержать минимум 2 символа!',
      });
      return;
    }

    if (!/^[A-ZА-Я][a-zа-я-]*$/.test(inputValueName)) {
      this.children.InputSecondName.setProps({
        error: true,
        errorText: `Фамилия должно содержать только буквы и дефис, 
          начинаться с заглавной буквы, и не содержать пробелов или цифр!`,
      });
      return;
    }

    this.children.InputSecondName.setProps({ error: false, errorText: null });

    this.setProps({ second_name: inputValueName });
  }

  onChangePasswordFirst(e) {
    const inputValue = e.target.value;
    if (inputValue === '12345') {
      this.children.InputPasswordFirst.setProps({ error: true, errorText: 'неверный пароль' });
      return;
    }

    if (inputValue.length === 0) {
      this.children.InputPasswordFirst.setProps({
        error: true,
        errorText: 'Пожалуйста, введите ваш пароль!',
      });
      return;
    }

    const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,40}$/;
    if (!passwordPattern.test(inputValue)) {
      this.children.InputPasswordFirst.setProps({
        error: true,
        errorText: `Пожалуйста, ваш пароль должен быть от 8 до 40 символов, 
          обязательно хотя бы одна заглавная буква и цифра.!`,
      });
      return;
    }
    this.children.InputPasswordFirst.setProps({ error: false, errorText: null });


    this.setProps({ passwordFirst: inputValue });
  }

  onChangePasswordSecond(e) {
    const inputValue = e.target.value;
    if (inputValue !== this.props.password) {
      this.children.InputPasswordSecond.setProps({
        error: true,
        errorText: 'Пароли не совпадают!',
      });
      return;
    }
    this.children.InputPasswordSecond.setProps({ error: false, errorText: null });
    this.setProps({ passwordSecond: inputValue });
  }

  onChangePhone(e) {
    const inputValue = e.target.value;
    const phonePattern = /^((\+7|7|8)+([0-9]){10})$/;

    if (!phonePattern.test(inputValue)) {
      this.children.InputPhone.setProps({
        error: true,
        errorText: 'Введите корректный номер телефона в формате +7XXXXXXXXXX!',
      });
      return;
    }
    this.children.InputPhone.setProps({ error: false, errorText: null });

    this.setProps({ phone: inputValue });
  }

  onRegistration(e) {
    const emailSubmit = this.props.email;
    const loginSubmit = this.props.login;
    const firstNameSubmit = this.props.first_name;
    const secondNameSubmit = this.props.second_name;
    const phoneSubmit = this.props.phone;
    const passwordFirstSubmit = this.props.passwordFirst;
    const passwordSecondSubmit = this.props.passwordSecond;

    if (emailSubmit === undefined) {
      this.children.InputEmail.setProps({
        error: true,
        errorText: 'Введите корректный email!',
      });
      return;
    }
    this.children.InputEmail.setProps({ error: false, errorText: null });

    if (loginSubmit === undefined) {
      this.children.InputLogin.setProps({
        error: true,
        errorText: `Логин должен быть от 3 до 20 символов, содержать только латиницу, цифры, 
          дефис или нижнее подчёркивание, и не состоять только из цифр!`,
      });
      return;
    }
    this.children.InputLogin.setProps({ error: false, errorText: null });

    if (firstNameSubmit === undefined) {
      this.children.InputFirstName.setProps({
        error: true,
        errorText: 'Введите корректное имя!',
      });
      return;
    }
    this.children.InputFirstName.setProps({ error: false, errorText: null });

    if (secondNameSubmit === undefined) {
      this.children.InputSecondName.setProps({
        error: true,
        errorText: 'Введите корректную фамилию!',
      });
      return;
    }
    this.children.InputSecondName.setProps({ error: false, errorText: null });

    if (phoneSubmit === undefined) {
      this.children.InputPhone.setProps({
        error: true,
        errorText: 'Введите корректный номер телефона в формате +7XXXXXXXXXX!',
      });
      return;
    }
    this.children.InputPhone.setProps({ error: false, errorText: null });

    if (passwordFirstSubmit === undefined) {
      this.children.InputPasswordFirst.setProps({
        error: true,
        errorText: 'Введите корректный пароль!',
      });
      return;
    }
    this.children.InputPasswordFirst.setProps({ error: false, errorText: null });

    if (passwordSecondSubmit !== passwordFirstSubmit) {
      this.children.InputPasswordSecond.setProps({
        error: true,
        errorText: 'Пароли не совпадают!',
      });
      return;
    }
    this.children.InputPasswordSecond.setProps({ error: false, errorText: null });

    console.log({
      email: emailSubmit,
      login: loginSubmit,
      first_name: firstNameSubmit,
      second_name: secondNameSubmit,
      phone: phoneSubmit,
      password: passwordSecondSubmit,
    });
  }

  render(): string {
    return (
      `
        <form class="login-form__wrapper">
          {{{ TitleRegistration }}}
          {{{ InputEmail }}}
          {{{ InputLogin }}}
          {{{ InputFirstName }}}
          {{{ InputSecondName }}}
          {{{ InputPhone }}}
          {{{ InputPasswordFirst }}}
          {{{ InputPasswordSecond }}}
          <div class="login-form__buttons">
            {{{ ButtonRegistration }}}
            {{{ ButtonLogin }}}
          </div>
        </form>
      `
    );
  }
}


