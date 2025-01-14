import Block from '../../core/Block';
import { ChatList, ChatFormSearch, ButtonOnMyProfile } from '../../components';
import { ChatWindow } from '../../components';
import { ChatDTO } from '../../api/type';

import { createChat, fetchChats, clearMessages } from '../../services/chatService';
import { connect } from '../../utils';

class ChatPage extends Block {
  constructor(props: any) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;

          if (target.classList.contains('create-chat-button')) {
            const modal = document.querySelector('.modal-chat') as HTMLElement;
            if (modal) {
              modal.style.display = 'block';
            }
          }

          if (target.classList.contains('close-button')) {
            const modal = document.querySelector('.modal-chat') as HTMLElement;
            if (modal) {
              modal.style.display = 'none';
            }
          }

          if (target.id === 'create-chat') {
            const chatTitleElement = document.getElementById('chat-title') as HTMLInputElement;
            const chatTitle = chatTitleElement?.value.trim();
            if (chatTitle) {
              createChat({ title: chatTitle })
                .then(() => {
                  void this.loadChats(); // Обновите список чатов
                  const modal = document.querySelector('.modal-chat') as HTMLElement;
                  if (modal) {
                    modal.style.display = 'none';
                  }
                })
                .catch(error => {
                  console.error('Ошибка при создании чата:', error);
                });
            }
          }
        },
      },
      ChatList: new ChatList({
        chats: props.chats || [],
        onSelectChat: (chat: ChatDTO) => {
          this.setProps({ selectedChat: chat, chats: this.props.chats });
          console.log('Выбранный чат:', chat);
          console.log('Чаты после клика:', this.props.chats); // Логирование чатов
        },
      }),
      ChatWindow: new ChatWindow({
        selectedChat: props.selectedChat || null,
        onDeleteChat: () => {
          this.setProps({
            selectedChat: null,
          });
          void this.loadChats(); // Перезагрузка списка чатов
        },
      }),
      ButtonOnMyProfile: new ButtonOnMyProfile({
        classType: 'buttonOnMyProfile',
        label: 'Профиль',
        onClick: () => this.onClickProfilePage(),
      }),
      ChatFormSearch: new ChatFormSearch({}),
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    console.log('Старые пропсы:', oldProps);
    console.log('Новые пропсы:', newProps);
    if (oldProps.chats !== newProps.chats) {
      this.children.ChatList.setProps({ chats: newProps.chats });
    }
    if (oldProps.selectedChat !== newProps.selectedChat) {
      this.children.ChatWindow.setProps({ selectedChat: newProps.selectedChat });
      clearMessages();
    }
    return true;
  }

  componentDidMount() {
    void this.loadChats(); // Загрузка чатов при открытии страницы
  }
  
  async loadChats() {
    try {
      const chats = await fetchChats();
      this.setProps({ chats });
    } catch (error) {
      console.error('Ошибка загрузки чатов', error);
    }
  }

  onClickProfilePage() {
    (window.router as unknown as { go: (path: string) => void }).go('/profile');
  }

  render() {
    return `
      
      <main class="chat">
          <div class="chat__wrapper">
            <div class="chat__leftBlock">
              <div class="chat__wrapperButton">
                {{{ ButtonOnMyProfile }}}
              </div>
              {{{  ChatFormSearch }}}
                <button class="button button__primary create-chat-button">Создать чат</button>
              
                {{{ChatList}}}
              


            </div>
            <div class="chat__rightBlock">
              {{{ChatWindow}}}
            </div>
          </div>

          <div class="modal-chat hide">
            <div class="modal-content">
              <span class="close-button">&times;</span>
              <h2>Создать новый чат</h2>
              <input type="text" id="chat-title" placeholder="Название чата" />
              <button id="create-chat" class="button button__primary">Создать</button>
            </div>
          </div>
        </main>
    `;
  }
}

const mapStateToProps = (state: any) => ({
  chats: state.chats || [],
  selectedChat: state.selectedChat || null,
});

export default connect(mapStateToProps)(ChatPage);

