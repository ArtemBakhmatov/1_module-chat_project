import Block from '../../core/Block';

import { ChatDTO } from '../../api/type';
import { deleteChat } from '../../services/chatService';
import { addUserToChat, removeUserFromChat } from '../../services/chatService';
import { ChatWebSocketService } from '../../services/chatWebSocketService';

interface ChatWindowProps {
  selectedChat: ChatDTO | null;
  onDeleteChat: () => void;
}
  
export default class ChatWindow extends Block {
  // @ts-expect-error: игнорируем ошибку
  chatWebSocketService: ChatWebSocketService;

  constructor(props: ChatWindowProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;
          if (target.classList.contains('delete-chat-button')) {
            const modal = document.querySelector('.delete-modal') as HTMLElement;
            if (modal) {
              modal.style.display = 'block';
            }
          }

          if (target.classList.contains('close-button')) {
            const modal = document.querySelector('.delete-modal') as HTMLElement;
            if (modal) {
              modal.style.display = 'none';
            }
          }

          if (target.id === 'confirm-delete') {
            if (this.props.selectedChat) {
              // @ts-expect-error: игнорируем ошибку
              deleteChat(this.props.selectedChat.id)
                .then(() => {
                  // @ts-expect-error: игнорируем ошибку
                  this.props.onDeleteChat();
                  const modal = document.querySelector('.delete-modal') as HTMLElement;
                  if (modal) {
                    modal.style.display = 'none';
                  }
                })
                .catch(error => {
                  console.error('Ошибка при удалении чата:', error);
                });
            }
            /// для отправки сообщений /////////////
            if (target.classList.contains('send-message-button')) {
              this.handleSendMessage();
            }
          }
          /////////////////// для добавления и удаления пользования ////////////////
          if (target.classList.contains('add-user-button')) {
            const userId = this.getUserIdFromInput();
            this.handleAddUser(userId);
          }

          if (target.classList.contains('remove-user-button')) {
            const userId = this.getUserIdFromInput();
            this.handleRemoveUser(userId);
          }

          if (target.classList.contains('send-message-button')) {
            this.handleSendMessage();
          }
          /////////////////////////////////////////////////////////////////////////
          if (target.classList.contains('manage-users-button')) {
            const modal = this.getContent().querySelector('.user-modal') as HTMLElement;
            if (modal) {
              modal.style.display = 'block';
            }
          }
  
          if (target.classList.contains('close-button')) {
            const modal = document.querySelector('.user-modal') as HTMLElement;
            if (modal) {
              modal.style.display = 'none';
            }
          }
          this.chatWebSocketService = new ChatWebSocketService();
        },
      },
    });
  }

  private handleAddUser(userId: number) {
    if (this.props.selectedChat) {
      // @ts-expect-error: игнорируем ошибку
      addUserToChat(this.props.selectedChat.id, userId)
        .then(() => {
          console.log('Пользователь добавлен');
        })
        .catch(error => {
          console.error('Ошибка при добавлении пользователя:', error);
        });
    }
  }

  private handleRemoveUser(userId: number) {
    if (this.props.selectedChat) {
      // @ts-expect-error: игнорируем ошибку
      removeUserFromChat(this.props.selectedChat.id, userId)
        .then(() => {
          console.log('Пользователь удален');
        })
        .catch(error => {
          console.error('Ошибка при удалении пользователя:', error);
        });
    }
  }

  private handleSendMessage() {
    const input = this.getContent().querySelector('.chat-input input') as HTMLInputElement;
    const message = input.value.trim();
    if (message) {
      console.log('Отправка сообщения:', message); // Логирование
      this.chatWebSocketService.sendMessage(message);
      input.value = '';
    } else {
      console.log('Сообщение пустое'); // Логирование
    }
  }

  private getUserIdFromInput(): number {
    // Пример получения userId из поля ввода
    const input = this.getContent().querySelector('.user-id-input') as HTMLInputElement;
    return parseInt(input.value, 10);
  }

  ///////////////////// Логика для отправки сообщений ////////////////////////
  componentDidMount() {
    if (this.props.selectedChat) {
      // @ts-expect-error: игнорируем ошибку
      const { id } = this.props.selectedChat;
      this.chatWebSocketService.connect(id);
  
      this.loadOldMessages();
    }
  }
  
  componentWillUnmount() {
    this.chatWebSocketService.disconnect();
  }
  
  private loadOldMessages() {
    this.chatWebSocketService.send({ type: 'get old', content: '0' });
  }
  //////////////////////////////////////////////////////////////////////

  render() {
    const { selectedChat } = this.props;

    if (!selectedChat) {
      return '<div class="chat-window-empty"><div>Выберите чат, чтобы начать переписку</div></div>';
    }
  
    return `
        <div class="chat-window">
          <div class="chat-header">
            <h2>{{selectedChat.title}}</h2>
            <button class="button__primary delete-chat-button">Удалить чат</button>
            <button class="button__primary manage-users-button">Управление пользователями</button>
          </div>

          

          <div class="chat-messages">
            
          </div>

          <div class="chat-input">
            <input type="text" placeholder="Введите сообщение" />
            <button type="button" class="send-message-button">Отправить</button>
          </div>

          <div class="delete-modal hide">
            <div class="modal-content">
              <span class="close-button">&times;</span>
              <div>Удалить чат?</div>
              <button id="confirm-delete" class="button button__primary">Удалить</button>
            </div>
          </div>

          <div class="user-modal hide">
            <div class="modal-content">
              <span class="close-button">&times;</span>
              <input type="text" class="user-id-input" placeholder="Введите ID пользователя" />
              <button class="add-user-button">Добавить пользователя</button>
              <button class="remove-user-button">Удалить пользователя</button>
            </div>
          </div>
        </div>
      `;
  }
}




