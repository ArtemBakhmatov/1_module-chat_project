/* eslint-disable linebreak-style */
import { FormRegistration } from '../../components/formRegistration';
import { FormWrapper } from '../../components/formWrapper';
import Block from '../../core/Block';

export default class registrationPage extends Block {
  constructor(props) {
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
