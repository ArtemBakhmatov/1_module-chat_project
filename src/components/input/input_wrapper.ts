/* eslint-disable linebreak-style */
import Block from '../../core/Block';
import Input from './input';
import ErrorText from './error_text';

interface InputWrapperProps {
  [key: string]: unknown;
}

export default class InputWrapper extends Block {
  constructor(props: InputWrapperProps) {
    super({
      ...props,
      Input: new Input({
        type: props.type,
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

  componentDidUpdate(oldProps: InputWrapperProps, newProps: InputWrapperProps): boolean {
    if (oldProps === newProps) {
      return false;
    }

    this.children.ErrorText.setProps(newProps);
    return true;
  }

  render(): string {
    return (
      `
        <div class="input {{ classInputProfile }} {{#if error}}input__error-active{{/if}}">
          {{{ Input }}}
          <label class="input__label">{{ label }}</label>
          {{{ ErrorText }}}
        </div>
      `
    );
  }
}


