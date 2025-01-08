/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */

import Block from '../../core/Block';

import { Button } from '../button';
import { InputWrapper } from '../input';

import { UserDTO } from '../../api/type';

interface FormProfileChangeProps {
  [key: string]: unknown;
  // login?: string;
  // password?: string;
}

interface FormProfileChangeProps {
  profileData?: {
    first_name?: string;
    second_name?: string;
    display_name?: string;
    login?: string;
    email?: string;
    phone?: string;
    // добавьте другие поля, если необходимо
  };
  onSubmit: (data: Partial<UserDTO>) => void;
}

interface FormProfileChangeState {
  isValid: {
    [key: string]: boolean;
  };
}

export default class FormProfileChange extends Block {
  private state: FormProfileChangeState;

  constructor(props: FormProfileChangeProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          e.preventDefault();
          console.log('Профиль');
          // this.onSubmit();
        },
      },
      ButtonSave: new Button({
        classType: 'button__primary button__width',
        label: 'Сохранить',
        onClick: () => this.onSubmit(),
      }),
      InputEmail: new InputWrapper({
        type: 'email',
        name: 'email',
        placeholder: 'Введите почту',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        value: props.profileData?.email || '',
        onBlur: (e: FocusEvent) => this.onValidateEmail(e),
      }),
      InputLogin: new InputWrapper({
        type: 'text',
        name: 'login',
        placeholder: 'Введите логин',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        value: props.profileData?.login || '',
        onBlur: (e: FocusEvent) => this.onValidateLogin(e),
      }),
      InputFirstName: new InputWrapper({
        type: 'text',
        name: 'first_name',
        placeholder: 'Введите имя',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        onBlur: (e: FocusEvent) => this.onValidateFirstName(e),
        value: props.profileData?.first_name || '',
      }),
      InputSecondName: new InputWrapper({
        type: 'text',
        name: 'second_name',
        placeholder: 'Введите фамилию',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        value: props.profileData?.second_name || '',
        onBlur: (e: FocusEvent) => this.onValidateSecondName(e),
      }),
      InputDisplayName: new InputWrapper({
        type: 'text',
        name: 'display_name',
        placeholder: 'Введите имя для чата',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        value: props.profileData?.display_name || '',
        onBlur: (e: FocusEvent) => this.onValidateDisplayName(e),
      }),
      InputPhone: new InputWrapper({
        type: 'tel',
        name: 'phone',
        placeholder: 'Введите номер мобильного телефона',
        classInputProfile: 'input__profile',
        classInputError: 'input__error',
        value: props.profileData?.phone || '',
        onBlur: (e: FocusEvent) => this.onValidatePhone(e),
      }),
    });
    this.state = {
      isValid: {
        first_name: true,
        second_name: true,
        display_name: true,
        login: true,
        email: true,
        phone: true,
      },
    };
  }

  onValidateEmail(e: FocusEvent) {
    const inputElement = e.target as HTMLInputElement;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputElement.value)) {
      alert('Некорректный формат email'); // Простая валидация, можно заменить на вывод ошибки в интерфейсе
      this.state.isValid.email = false;
    } else {
      this.state.isValid.email = true;
    }
  }

  onValidateLogin(e: FocusEvent) {
    const inputElement = e.target as HTMLInputElement;
    const loginPattern = /^(?!\d+$)[A-Za-z\d_-]{3,20}$/;
    if (!loginPattern.test(inputElement.value)) {
      alert('Логин должен быть от 3 до 20 символов, содержать только латиницу, цифры, дефис или нижнее подчёркивание, и не состоять только из цифр!',
      ); 
      this.state.isValid.login = false;
    } else {
      this.state.isValid.login = true;
    }
  }

  onValidateFirstName(e: FocusEvent) {
    const inputElement = e.target as HTMLInputElement;
  
    if (!/^[A-ZА-Я][a-zа-я-]*$/.test(inputElement.value) || inputElement.value.length === 0 || inputElement.value.length < 2) {
      alert('Имя должно содержать только буквы и дефис, начинаться с заглавной буквы, не содержать пробелов или цифр и минимум 2 символа!');
      this.state.isValid.first_name = false;
    } else {
      this.state.isValid.first_name = true;
    }

  }

  onValidateSecondName(e: FocusEvent) {
    const inputElement = e.target as HTMLInputElement;

    if (!/^[A-ZА-Я][a-zа-я-]*$/.test(inputElement.value) || inputElement.value.length === 0 || inputElement.value.length < 2) {
      alert('Имя должно содержать только буквы и дефис, начинаться с заглавной буквы, не содержать пробелов или цифр и минимум 2 символа!');
      this.state.isValid.second_name = false;
    } else {
      this.state.isValid.second_name = true;
    }
  }

  onValidateDisplayName(e: FocusEvent) {
    const inputElement = e.target as HTMLInputElement;
    if (!/^[A-ZА-Я][a-zа-я-]*$/.test(inputElement.value) || inputElement.value.length === 0 || inputElement.value.length < 2) {
      alert('Имя должно содержать только буквы и дефис, начинаться с заглавной буквы, не содержать пробелов или цифр и минимум 2 символа!');
      this.state.isValid.display_name = false;
    } else {
      this.state.isValid.display_name = true;
    }
  }

  onValidatePhone(e: FocusEvent) {
    const inputElement = e.target as HTMLInputElement;
    const phonePattern = /^((\+7|7|8)+([0-9]){10})$/;
    if (!phonePattern.test(inputElement.value)) {
      alert('Введите корректный номер телефона в формате +7XXXXXXXXXX!',
      ); 
      this.state.isValid.phone = false;
    } else {
      this.state.isValid.phone = true;
    }
  }

  onSubmit() {
    const formData: Partial<UserDTO> = {
      first_name: this.children.InputFirstName.getContent().querySelector('input')?.value,
      second_name: this.children.InputSecondName.getContent().querySelector('input')?.value,
      display_name: this.children.InputDisplayName.getContent().querySelector('input')?.value,
      login: this.children.InputLogin.getContent().querySelector('input')?.value,
      email: this.children.InputEmail.getContent().querySelector('input')?.value,
      phone: this.children.InputPhone.getContent().querySelector('input')?.value,
    };

    if (!this.state.isValid.email) {
      this.onValidateEmail({ target: this.children.InputEmail.getContent().querySelector('input') } as FocusEvent);
      return;
    }

    if (!this.state.isValid.first_name) {
      this.onValidateFirstName({ target: this.children.InputFirstName.getContent().querySelector('input') } as FocusEvent);
      return;
    }
    if (!this.state.isValid.second_name) {
      this.onValidateSecondName({ target: this.children.InputSecondName.getContent().querySelector('input') } as FocusEvent);
      return;
    }
    if (!this.state.isValid.display_name) {
      this.onValidateDisplayName({ target: this.children.InputDisplayName.getContent().querySelector('input') } as FocusEvent);
      return;
    }
    if (!this.state.isValid.login) {
      this.onValidateLogin({ target: this.children.InputLogin.getContent().querySelector('input') } as FocusEvent);
      return;
    }
    
    if (!this.state.isValid.phone) {
      this.onValidatePhone({ target: this.children.InputPhone.getContent().querySelector('input') } as FocusEvent);
      return;
    }
    
    // @ts-expect-error: игнорируем ошибку
    this.props.onSubmit(formData);
  }

  componentDidUpdate(oldProps: FormProfileChangeProps, newProps: FormProfileChangeProps): boolean {
    // console.log('FormProfile componentDidUpdate:', { oldProps, newProps });
    if (oldProps.profileData !== newProps.profileData) {
      this.children.InputFirstName.setProps({ value: newProps.profileData?.first_name || '' });
      this.children.InputSecondName.setProps({ value: newProps.profileData?.second_name || '' });
      this.children.InputEmail.setProps({ value: newProps.profileData?.email || '' });
      this.children.InputLogin.setProps({ value: newProps.profileData?.login || '' });
      this.children.InputPhone.setProps({ value: newProps.profileData?.phone || '' });
      this.children.InputDisplayName.setProps({ value: newProps.profileData?.display_name || 'Безымянный' });
    }
    return true;
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




