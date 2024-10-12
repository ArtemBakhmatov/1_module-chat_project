/* eslint-disable linebreak-style */
import Block from '../../core/Block';

interface ChatProfileItemProps {
  classProfileActive?: string;
  name: string;
  time: string;
  message?: string;
  classMyMessage?: string;
  myMessage?: string;
  classNumberMessages?: string;
  numberMessages: string;
  [key: string]: unknown; // Allow additional properties if necessary
}

export default class ChatProfileItem extends Block {
  constructor(props: ChatProfileItemProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return (
      `
        <li class="chat__profileItem">
          <a href="#" class="chat__profileLink {{ classProfileActive }}">
            <div class="chat__profileLink_img"></div>
            <div class="chat__profileLink_flex">
              <div class="chat__profileLink_top">
                <div class="chat__profileLink_name">
                  {{ name }}
                </div>
                <div class="chat__profileLink_time">{{ time }}</div>
                                
              </div>
              <div class="chat__profileLink_bottom">
                <div class="chat__profileLink_message">
                  {{ message }} 
                  <span class="myMessage {{ classMyMessage }}">Вы:</span> 
                  <span class="myMessage {{ classMyMessage }}">{{ myMessage }}</span>
                </div>
                <div class="{{ classNumberMessages }}">{{ numberMessages }}</div>
              </div>
            </div>
          </a>
            
        </li>
      `
    );
  }
}

