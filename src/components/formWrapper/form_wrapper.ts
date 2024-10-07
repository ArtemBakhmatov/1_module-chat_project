/* eslint-disable linebreak-style */
import Block from '../../core/Block';
// import { TitleElement } from '../title';

interface FormWrapperProps {
  [key: string]: unknown;
}

export default class FormWrapper extends Block {
  constructor(props: FormWrapperProps) {
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


