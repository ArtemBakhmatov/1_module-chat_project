/* eslint-disable linebreak-style */
import Block from '../../core/Block';

interface ButtonProps {
  onClick?: () => void; // Modify this type according to the actual type of onClick
  classType?: string;
  type?: string;
  label: string;
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick || (() => {}),
      },
    });
  }

  render(): string {
    return (
      `
        <button class="button {{ classType }}" type={{ type }}>
            {{ label }}
        </button>
        `
    );
  }
}

export default Button;
