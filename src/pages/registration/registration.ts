/* eslint-disable linebreak-style */
import { FormRegistration } from '../../components/formRegistration';
import { FormWrapper } from '../../components/formWrapper';
import { Spinner } from '../../components';
import Block from '../../core/Block';
import { connect } from '../../utils';

interface State {
  isLoading: boolean;
  registrationError: string | null;
}

interface RegistrationPageProps {
  isLoading: boolean;
  registrationError: string | null;
  [key: string]: unknown;
}

class RegistrationPage extends Block {
  constructor(props: RegistrationPageProps) {
    super({
      ...props,
      FormRegistration: new FormWrapper({
        formBody: new FormRegistration({}),
      }),
      Spinner: new Spinner({}),
    });
  }

  render(): string {
    return (
      `
        <main class="modal">
          {{#if isLoading}}
            {{{ Spinner }}}
          {{else}}

            {{{ FormRegistration }}}

            <div class="error-message">
              {{#if registrationError}}
                <p>{{ registrationError }}</p>
              {{/if}}   
            </div>

          {{/if}}
        </main>
      `
    );
  }
}

const mapStateToPropsShort = ({ isLoading, registrationError }: State): RegistrationPageProps => ({
  isLoading,
  registrationError,
});

// @ts-expect-error: Игнорируем ошибку connect(mapStateToPropsShort)(RegistrationPage)
export default connect(mapStateToPropsShort)(RegistrationPage);
