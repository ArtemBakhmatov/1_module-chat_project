/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */

import Block from '../../core/Block';

import { InputWrapper } from '../input';
import { TitleElement } from '../title';
import { Link } from '../link';

export default class FormProfile extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        submit: (e) => {
          e.preventDefault();
          console.log('Профиль');
        },
      },
      linkButtonData: new Link({
        classLinkButton: 'linkButton',
        linkPage: 'profileChange',
        label: 'Изменить данные',
      }),
      linkButtonPassword: new Link({
        classLinkButton: 'linkButton',
        linkPage: 'profileChange',
        label: 'Изменить пароль',
      }),
      linkButtonExit: new Link({
        classLinkButton: 'linkButton__red',
        linkPage: 'login',
        label: 'Выйти',
      }),
      TitleName: new TitleElement({
        label: 'Иван',
        classTitleName: 'title__name',
      }),
      InputEmail: new InputWrapper({
        type: 'email',
        name: 'email',
        placeholder: 'pochta@yandex.ru',
        classInputProfile: 'input__profile input__profile_eventNone',
      }),
      InputLogin: new InputWrapper({
        type: 'text',
        name: 'login',
        placeholder: 'ivanivanov',
        classInputProfile: 'input__profile input__profile_eventNone',
      }),
      InputFirstName: new InputWrapper({
        type: 'text',
        name: 'first_name',
        placeholder: 'Иван',
        classInputProfile: 'input__profile input__profile_eventNone',
        classInputError: 'input__error',
      }),
      InputSecondName: new InputWrapper({
        type: 'text',
        name: 'second_name',
        placeholder: 'Иванов',
        classInputProfile: 'input__profile input__profile_eventNone',
      }),
      InputDisplayName: new InputWrapper({
        type: 'text',
        name: 'display_name',
        placeholder: 'Иван',
        classInputProfile: 'input__profile input__profile_eventNone',
      }),
      InputPhone: new InputWrapper({
        type: 'tel',
        name: 'phone',
        placeholder: '+7(909)-967-30-30',
        classInputProfile: 'input__profile input__profile_eventNone',
      }),
    });
  }

  render(): string {
    return (
      `
        <form class="profile__userData">
          {{{ TitleName }}}
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

        <div class="profile__changeUserData">
            {{{ linkButtonData }}}
            {{{ linkButtonPassword }}}
            {{{ linkButtonExit }}}
        </div>
      </form>
`
    );
  }
}


