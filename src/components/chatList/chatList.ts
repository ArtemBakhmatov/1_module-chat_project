/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Block from '../../core/Block';
import { ChatDTO } from '../../api/type';

interface ChatListProps {
  chats: ChatDTO[];
  onSelectChat: (chat: ChatDTO) => void;
}
  
export default class ChatList extends Block {

  constructor(props: ChatListProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;
          const item = target.closest('.chat__profileItem') as HTMLElement;
          if (item) {
            const chatId = item.getAttribute('data-chat-id');
            // @ts-expect-error: игнорируем ошибку
            const chat = this.props.chats.find(c => c.id.toString() === chatId);
            if (chat) {
              // @ts-expect-error: игнорируем ошибку
              this.props.onSelectChat(chat);
              this.highlightChat(item);
              console.log('Выбранный чат:', chat); // Проверка клика
            }
          }
        },
      },
    });
  }

  highlightChat(selectedItem: HTMLElement) {
    const items = this.getContent().querySelectorAll('.chat__profileItem');
    items.forEach(item => {
      item.classList.remove('selected');
    });
    selectedItem.classList.add('selected');
  }

  // @ts-expect-error: игнорируем ошибку
  componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
    if (oldProps.chats !== newProps.chats) {
      console.log('Обновленные чаты:', newProps.chats);
      this.setProps({ chats: newProps.chats });
      return true;
    }
    return false;
  }

  render() {
    const { chats = [] } = this.props as unknown as ChatListProps; 
    const pathAvatar = window.store.getState().avatarUrl;
    console.log('Рендеринг чатов:', chats); // Логирование чатов
    return `
      <ul class="chat__profileList">
        ${chats.map(chat => `
          
          <li class="chat__profileItem" data-chat-id="${chat.id}">
            <img src="${chat.avatar || pathAvatar }" alt="Avatar" class="chat__profileItem_img" />
            <div class="chat-info">
              <h3 class="chat__profileItem_name">${chat.title}</h3>
              <p class="chat__profileItem_message">${chat.last_message?.content || 'сообщение'}</p>
            </div>
          </li>
        `).join('')}
      </ul>
    `;
  }
}



