/* eslint-disable linebreak-style */
import Block from '../../core/Block';

interface ErrorTextProps {
  [key: string]: unknown;
}

export default class ErrorText extends Block {
  constructor(props: ErrorTextProps) {
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


