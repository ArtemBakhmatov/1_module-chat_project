/* eslint-disable linebreak-style */
import { FormRegistration } from '../../components/formRegistration';
import { FormWrapper } from '../../components/formWrapper';
import Block from '../../core/Block';

interface RegistrationPageProps {
  [key: string]: unknown;
}

export default class RegistrationPage extends Block {
  constructor(props: RegistrationPageProps) {
    super({
      ...props,
      FormRegistration: new FormWrapper({
        formBody: new FormRegistration({}),
      }),
    });
  }

  render(): string {
    return (
      `
        <main class="modal">
          {{{ FormRegistration }}}
        </main>
      `
    );
  }
}
