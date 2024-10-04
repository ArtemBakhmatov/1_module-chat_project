/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */

import Block from '../../core/Block';

import { Button } from '../button';
import { InputWrapper } from '../input';

import {
  validateEmailOnBlur,
  validateLoginOnBlur,
  validateFirstNameOnBlur,
  validateSecondNameOnBlur,
  validateDisplayNameOnBlur,
  validatePhoneOnBlur,

  validateEmailOnSubmit,
  validateLoginOnSubmit,
  validateFirstNameOnSubmit,
  validateSecondNameOnSubmit,
  validateDisplayNameOnSubmit,
  validatePhoneOnSubmit,
} from '../../utils';

export default class FormProfileChange extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        submit: (e) => {
          e.preventDefault();
          console.log('Профиль');
          this.onSubmit(e);
        },
      },
      ButtonSave: new Button({
        classType: 'button__primary button__width',
        label: 'Сохранить',
      }),
      InputEmail: new InputWrapper({
        type: 'email',
        name: 'email',
        placeholder: 'pochta@yandex.ru',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangeEmail(e),
      }),
      InputLogin: new InputWrapper({
        type: 'text',
        name: 'login',
        placeholder: 'ivanivanov',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangeLogin(e),
      }),
      InputFirstName: new InputWrapper({
        type: 'text',
        name: 'first_name',
        placeholder: 'Иван',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangeFirstName(e),
      }),
      InputSecondName: new InputWrapper({
        type: 'text',
        name: 'second_name',
        placeholder: 'Иванов',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangeSecondName(e),
      }),
      InputDisplayName: new InputWrapper({
        type: 'text',
        name: 'display_name',
        placeholder: 'Иван',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangeDisplayName(e),
      }),
      InputPhone: new InputWrapper({
        type: 'tel',
        name: 'phone',
        placeholder: '+7(909)-967-30-30',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        onBlur: (e) => this.onChangePhone(e),
      }),
    });
  }

  onChangeEmail(e) {
    const inputValueEmail = e.target.value;
    validateEmailOnBlur(inputValueEmail, this.children.InputEmail);
    this.setProps({ email: inputValueEmail });
  }

  onChangeLogin(e) {
    const inputValueLogin = e.target.value;
    validateLoginOnBlur(inputValueLogin, this.children.InputLogin);
    this.setProps({ login: inputValueLogin });
  }

  onChangeFirstName(e) {
    const inputValueName = e.target.value;
    validateFirstNameOnBlur(inputValueName, this.children.InputFirstName);
    this.setProps({ first_name: inputValueName });
  }

  onChangeSecondName(e) {
    const inputValueName = e.target.value;
    validateSecondNameOnBlur(inputValueName, this.children.InputSecondName);
    this.setProps({ second_name: inputValueName });
  }

  onChangeDisplayName(e) {
    const inputValueName = e.target.value;
    validateDisplayNameOnBlur(inputValueName, this.children.InputDisplayName);
    this.setProps({ display_name: inputValueName });
  }

  onChangePhone(e) {
    const inputValue = e.target.value;
    validatePhoneOnBlur(inputValue, this.children.InputPhone);
    this.setProps({ phone: inputValue });
  }

  onSubmit(e) {
    const emailSubmit = this.props.email;
    const loginSubmit = this.props.login;
    const firstNameSubmit = this.props.first_name;
    const secondNameSubmit = this.props.second_name;
    const displayNameSubmit = this.props.display_name;
    const phoneSubmit = this.props.phone;

    validateEmailOnSubmit(emailSubmit, this.children.InputEmail);
    validateLoginOnSubmit(loginSubmit, this.children.InputLogin);
    validateFirstNameOnSubmit(firstNameSubmit, this.children.InputFirstName);
    validateSecondNameOnSubmit(secondNameSubmit, this.children.InputSecondName);
    validateDisplayNameOnSubmit(displayNameSubmit, this.children.InputDisplayName);
    validatePhoneOnSubmit(phoneSubmit, this.children.InputPhone);

    console.log({
      email: emailSubmit,
      login: loginSubmit,
      first_name: firstNameSubmit,
      second_name: secondNameSubmit,
      display_name: displayNameSubmit,
      phone: phoneSubmit,
    });
  }

  render(): string {
    return (
      `
        <form class="profile__userData">
          <div class="profile__flex">
            <div class="profile__flex_left">
              Почта
            </div>
            {{{ InputEmail }}}
          </div>

          <div class="profile__flex">
            <div class="profile__flex_left">
              Логин
            </div>
            {{{ InputLogin }}}
          </div>

          <div class="profile__flex">
            <div class="profile__flex_left">
              Имя
            </div>
            {{{ InputFirstName }}}
          </div>

          <div class="profile__flex">
            <div class="profile__flex_left">
              Фамилия
            </div>
            {{{ InputSecondName }}}
          </div>

          <div class="profile__flex">
            <div class="profile__flex_left">
              Имя в чате
            </div>
            {{{ InputDisplayName }}}
          </div>

          <div class="profile__flex">
            <div class="profile__flex_left">
              Телефон
            </div>
            {{{ InputPhone }}}
          </div>

        <div class="profile__changeUserBottom">
          {{{ ButtonSave }}}
        </div>
      </form>
`
    );
  }
}


