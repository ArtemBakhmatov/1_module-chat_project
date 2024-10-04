/* eslint-disable linebreak-style */
import Block from '../../core/Block';

export default class ErrorText extends Block {
  constructor(props) {
    super({
      ...props,
    });
  }

  render(): string {
    return (
      `
        <div class={{ classInputError }}>{{ errorText }}</div>
      `
    );
  }
}


