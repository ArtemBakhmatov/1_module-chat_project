/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Block from '../../core/Block';

interface InputProps {
  [key: string]: unknown;
  value?: string;
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
    });
  }

  componentDidUpdate(oldProps: InputProps, newProps: InputProps): boolean {
    const inputElement = this.getContent().querySelector('input');
    if (inputElement && oldProps.value !== newProps.value) {
      inputElement.value = newProps.value || '';
    }
    return true;
  }

  render(): string {
    return (
      `
        <input 
          type={{ type }} 
          class="input__element" 
          name={{ name }} 
          placeholder="{{ placeholder }}" 
          value="${this.props.value || ''}"
        >
      `
    );
  }
}





