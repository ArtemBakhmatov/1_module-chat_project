/* eslint-disable linebreak-style */
import Block from '../../core/Block';

export default class Input extends Block {
  constructor(props) {
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

