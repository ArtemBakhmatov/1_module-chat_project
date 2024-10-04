/* eslint-disable linebreak-style */
import Block from '../../core/Block';
// import { TitleElement } from '../title';

export default class FormWrapper extends Block {
  constructor(props) {
    super({
      ...props,
    });
  }

  render(): string {
    return (
      `
        <div action="" class="login-form">
          {{{ formBody }}}
        </div>
      `
    );
  }
}


