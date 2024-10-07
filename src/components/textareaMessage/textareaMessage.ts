/* eslint-disable linebreak-style */
import Block from '../../core/Block';

interface TextareaMessageProps {
  [key: string]: unknown;
}

export default class TextareaMessage extends Block {
  constructor(props: TextareaMessageProps) {
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


