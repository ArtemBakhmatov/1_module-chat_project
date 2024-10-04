/* eslint-disable linebreak-style */
import Block from '../../core/Block';
import { FormWrapper } from '../../components/formWrapper';
import { FormLogin } from '../../components/formLogin';

export default class LoginPage extends Block {
  constructor(props) {
    super({
      ...props,
      FormLogin: new FormWrapper({
        formBody: new FormLogin({}),
      }),
    });
  }

  render():string {
    return (
      `
      <main class="modal">
        {{{ FormLogin }}}
      </main>
    `
    );
  }
}

/* {{{ FormLogin }}} это обертка формы
<form action="" class="login-form">
          <div class="login-form__wrapper">
            {{> Title label="Вход" }}
            {{> Input type="text" label="Логин" name="login" }}
            {{> Input type="password" label="Пароль" name="password" }}
            <div class="login-form__buttons">
              <button class="button button__primary">
                Авторизоваться
              </button>
              <button class="button button__secondary">
                Нет аккаунта?
              </button>
            </div>
          </div>
        </form> */
