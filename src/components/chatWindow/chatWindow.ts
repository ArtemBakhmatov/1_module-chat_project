import Block from '../../core/Block';
import { connect } from '../../utils';

import { ChatDTO } from '../../api/type';
import { deleteChat, fetchToken } from '../../services/chatService';
import { addUserToChat, removeUserFromChat } from '../../services/chatService';
import { ChatWebSocketService } from '../../services/chatWebSocketService';
import { loadProfileID } from '../../services/profile';

interface ChatWindowProps {
  selectedChat: ChatDTO | null;
  onDeleteChat: () => void;
  messages: Array<{ content: string }>; 
}
  
class ChatWindow extends Block {
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
          
        },
      },
    });
    // @ts-expect-error: игнорируем ошибку
    this.chatWebSocketService = new ChatWebSocketService(window.store);
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

  componentDidMount() {
    // Переместите вызов loadProfile сюда, если он не должен вызываться в конструкторе
    void loadProfileID();
    //console.log(profileData.id)
  }

  protected componentDidUpdate(oldProps: any): boolean {

    if (oldProps.messages !== this.props.messages) {
      console.log('Обновление сообщений в компоненте:', this.props.messages);
      this.setProps({ messages: this.props.messages });
    }
    
    // @ts-expect-error: игнорируем ошибку
    if (oldProps.selectedChat?.id !== this.props.selectedChat?.id) {
      void loadProfileID().then(() => {
        const profile = window.store.getState().profile;
        if (profile && this.props.selectedChat) {
          // @ts-expect-error: игнорируем ошибку
          const { id } = this.props.selectedChat;
          // @ts-expect-error: игнорируем ошибку
          const userId = profile.id;
          fetchToken(id).then((token) => {
            this.chatWebSocketService.connect(id, token, userId);
            // this.loadOldMessages();
          }).catch((e) => console.log(e));
        }
      });
    }


    return true;
  }

  componentWillUnmount() {
    this.chatWebSocketService.disconnect();
  }

  render() {
    const { selectedChat, messages = [] } = this.props as unknown as ChatWindowProps;
    console.log('Сообщения в render:', messages);

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
            ${messages.map((message: { content: string }) => `
              <div class="message">${message.content}</div>
            `).join('')} 
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

const mapStateToProps = (state: any) => ({
  messages: state.messages || [],
});

// @ts-expect-error: игнорируем ошибку
export default connect(mapStateToProps)(ChatWindow);




