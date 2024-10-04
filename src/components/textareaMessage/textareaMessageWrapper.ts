/* eslint-disable linebreak-style */
import Block from '../../core/Block';
import TextareaMessage from './textareaMessage';
import ErrorText from './textError';

export default class InputWrapper extends Block {
  constructor(props) {
    super({
      ...props,
      TextareaMessage: new TextareaMessage({
        name: props.name,
        placeholder: props.placeholder,
        events: {
          blur: props.onBlur || (() => {}),
        },
      }),
      ErrorText: new ErrorText({
        errorText: props.errorText,
        classInputError: props.classInputError,
      }),
    });
  }

  componentDidUpdate(oldProps, newProps): boolean {
    if (oldProps === newProps) {
      return false;
    }

    this.children.ErrorText.setProps(newProps);
    return true;
  }

  render(): string {
    return (
      `
        <div class="chat__sendingForm__message_wrapper {{#if error}}input__error-active{{/if}}">
          {{{ ErrorText }}}
          {{{ TextareaMessage }}}
        </div>
      `
    );
  }
}
