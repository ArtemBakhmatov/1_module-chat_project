/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */

import Block from '../../core/Block';

import { InputWrapper } from '../input';
import { TitleElement } from '../title';
import { Button } from '../button';

import { logout } from '../../services/logout';

interface FormProfileProps {
  [key: string]: unknown;
  profileData?: {
    first_name?: string;
    second_name?: string;
    email: string;
    login: string;
    phone: string;
    display_name: string;
  };
}

export default class FormProfile extends Block {
  constructor(props: FormProfileProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          e.preventDefault();
          console.log('Профиль');
        },
      },
      ButtonDate: new Button({
        classType: 'button__profileLink',
        label: 'Изменить данные', 
        onClick: () => this.onClickProfileChangePage(),
      }),
      ButtonPassword: new Button({
        classType: 'button__profileLink',
        label: 'Изменить пароль', 
        onClick: () => this.onClickProfilePasswordPage(),
      }),
      ButtonExit: new Button({
        classType: 'button__profileLink button__profileLink_red',
        label: 'Выйти', 
        onClick: () => this.onLogout(),
      }),
      TitleName: new TitleElement({
        label: props.profileData?.first_name || '',
        classTitleName: 'title__name',
      }),
      InputEmail: new InputWrapper({
        type: 'email',
        name: 'email',
        classInputProfile: 'input__profile input__profile_eventNone',
        classInputError: 'input__error',
        value: props.profileData?.email || '',
      }),
      InputLogin: new InputWrapper({
        type: 'text',
        name: 'login',
        classInputProfile: 'input__profile input__profile_eventNone',
        value: props.profileData?.login || '',
      }),
      InputFirstName: new InputWrapper({
        type: 'text',
        name: 'first_name',
        classInputProfile: 'input__profile input__profile_eventNone',
        classInputError: 'input__error',
        value: props.profileData?.first_name || '', // Использование profileData
      }),
      InputSecondName: new InputWrapper({
        type: 'text',
        name: 'second_name',
        classInputProfile: 'input__profile input__profile_eventNone',
        value: props.profileData?.second_name || '', // Использование profileData
      }),
      InputDisplayName: new InputWrapper({
        type: 'text',
        name: 'display_name',
        classInputProfile: 'input__profile input__profile_eventNone',
        value: props.profileData?.display_name || '', 
      }),
      InputPhone: new InputWrapper({
        type: 'tel',
        name: 'phone',
        // placeholder: '+7(909)-967-30-30',
        classInputProfile: 'input__profile input__profile_eventNone',
        value: props.profileData?.phone || '', // Использование profileData
      }),
    });
    // console.log('FormProfile props:', props); // Отладка props
  }

  onLogout() {
    logout().catch(error => {
      console.error('Ошибка при выходе из системы', error);
    });
  }

  onClickProfileChangePage() {
    // @ts-expect-error: Suppress error related to router.go possibly not existing
    window.router.go('/settings');
  }

  onClickProfilePasswordPage() {
    // @ts-expect-error: Suppress error related to router.go possibly not existing
    window.router.go('/password');
  }

  componentDidUpdate(oldProps: FormProfileProps, newProps: FormProfileProps): boolean {
    // console.log('FormProfile componentDidUpdate:', { oldProps, newProps });
    if (oldProps.profileData !== newProps.profileData) {
      this.children.InputFirstName.setProps({ value: newProps.profileData?.first_name || '' });
      this.children.InputSecondName.setProps({ value: newProps.profileData?.second_name || '' });
      this.children.InputEmail.setProps({ value: newProps.profileData?.email || '' });
      this.children.InputLogin.setProps({ value: newProps.profileData?.login || '' });
      this.children.InputPhone.setProps({ value: newProps.profileData?.phone || '' });
      this.children.InputDisplayName.setProps({ value: newProps.profileData?.display_name || 'Безымянный' });
      this.children.TitleName.setProps({ label: newProps.profileData?.first_name || '' });
    }
    return true;
  }

  render(): string {
    // console.log('Rendering FormProfile with:', this.props.profileData); // Отладка данных
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
            {{{ ButtonDate }}}
            {{{ ButtonPassword }}}
            {{{ ButtonExit }}}
        </div>
      </form>
`
    );
  }
}


// import { connect } from '../../utils';

// const mapStateToProps = (state: { profile: FormProfileProps }): FormProfileProps => ({
//   ...state.profile,
// });
// // @ts-expect-error: Игнорируем ошибку connect(mapStateToPropsShort)(Profile)
// export default connect(mapStateToProps)(FormProfile);


