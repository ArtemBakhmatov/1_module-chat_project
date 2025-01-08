/* eslint-disable linebreak-style */
import Block from '../../core/Block';

interface ButtonOnMyProfileProps {
  [key: string]: unknown;
  onClick?: () => void; // Modify this type according to the actual type of onClick
  classType?: string;
  label: string;
}

export default class ButtonOnMyProfile extends Block {
  constructor(props: ButtonOnMyProfileProps) {
    super({
      ...props,
      events: {
        click: props.onClick || (() => {}),
      },
    });
  }

  protected render(): string {
    return (
      `
        <button class="{{ classType }}">
          {{ label }}
            <svg 
              class="buttonOnMyProfile__svg"
              width="6" 
              height="10" 
              viewBox="0 0 6 10" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1 9L5 5L1 1" stroke="#999999"/>
            </svg>
        </button>
      `
    );
  }
}

