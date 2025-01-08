/* eslint-disable linebreak-style */
import Block from '../../core/Block';
import { FormWrapper } from '../../components/formWrapper';
import { FormLogin } from '../../components/formLogin';
import { Spinner } from '../../components';
import { connect } from '../../utils';

interface State {
  isLoading: boolean;
  loginError: string | null;
}
interface LoginPageProps {
  isLoading: boolean;
  loginError: string | null;
  [key: string]: unknown;
}

class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super({
      ...props,
      FormLogin: new FormWrapper({
        formBody: new FormLogin({}),
      }),
      Spinner: new Spinner({}),
    });
  }

  render():string {
    return (
      `
        <main class="modal">
          {{#if isLoading}}
            {{{ Spinner }}}
          {{else}}

            {{{ FormLogin }}}

            <div class="error-message">
              {{#if loginError}}
                <p>{{ loginError }}</p>
              {{/if}}   
            </div>

          {{/if}}
        </main>
      `
    );
  }
}

const mapStateToPropsShort = ({ isLoading, loginError }: State): LoginPageProps => ({
  isLoading,
  loginError,
});
// @ts-expect-error: Игнорируем ошибку connect(mapStateToPropsShort)(LoginPage)
export default connect(mapStateToPropsShort)(LoginPage);


