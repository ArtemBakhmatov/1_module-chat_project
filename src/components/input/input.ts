/* eslint-disable linebreak-style */
import Block from '../../core/Block';

interface InputProps {
  [key: string]: unknown;
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return (
      `
        <input type={{ type }} class="input__element" name={{ name }} placeholder={{ placeholder }}>
      `
    );
  }
}



