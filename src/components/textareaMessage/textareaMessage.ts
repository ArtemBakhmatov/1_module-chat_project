/* eslint-disable linebreak-style */
import Block from '../../core/Block';

export default class TextareaMessage extends Block {
  constructor(props) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return (
      `
        <textarea class="chat__sendingForm__message" name={{ name }} placeholder={{ placeholder }}></textarea>
        
      `
    );
  }
}


