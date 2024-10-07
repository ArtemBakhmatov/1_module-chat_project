/* eslint-disable linebreak-style */
import Block from '../../core/Block';

interface ChatMainProfileProps {
  [key: string]: unknown;
}

export default class ChatMainProfile extends Block {
  constructor(props: ChatMainProfileProps) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return (
      `
        <a href="#" class="chatProfile__block" page="profile">
          Профиль
            <svg 
              class="chatProfile__svg"
              width="6" 
              height="10" 
              viewBox="0 0 6 10" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1 9L5 5L1 1" stroke="#999999"/>
            </svg>
        </a>
      `
    );
  }
}
