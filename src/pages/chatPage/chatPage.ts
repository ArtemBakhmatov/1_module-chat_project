// import Block from '../../core/Block';
// import { ChatList } from '../../components';
// import { ChatWindow } from '../../components';
// // import ChatApi from '../../api/chatApi';
// import { ChatDTO } from '../../api/type';

// import { createChat, fetchChats, fetchChatUsers } from '../../services/chatService';
// import { connect } from '../../utils';

/* const chatTitle = 'Новый чат';
createChat({ title: chatTitle })
  .then(chatId => {
    console.log('Новый чат создан с ID:', chatId);
    return fetchChats();  // Загрузка обновленного списка чатов
  })
  .then(chats => {
    console.log('Обновленные чаты:', chats);
    // Обновите состояние или интерфейс, чтобы отобразить новые чаты
    // Например, this.setProps({ chats });
  })
  .catch(error => {
    console.error('Ошибка при создании или обновлении чатов', error);  
  }); */

// export default class ChatPage extends Block {
//   private chatApi: ChatApi;

//   constructor() {
//     const chatApi = new ChatApi();
//     super({
//       chatApi,
//       chats: [],
//       selectedChat: null,
//       ChatList: new ChatList({
//         chats: [],
//         onSelectChat: (chat: ChatDTO) => this.setProps({ selectedChat: chat }),
//       }),
//       ChatWindow: new ChatWindow({
//         selectedChat: null,
//       }),
//     });
//     this.chatApi = chatApi;
//   }

//   async componentDidMount() {
//     try {
//       const chats = await this.chatApi.getChats();
//       console.log('Загруженные чаты:', chats); // Логирование чатов
//       this.setProps({
//         chats,
//         ChatList: new ChatList({
//           chats,
//           onSelectChat: (chat: ChatDTO) => this.setProps({ selectedChat: chat }),
//         }),
//       });
//     } catch (error) {
//       console.error('Ошибка загрузки чатов', error);
//     }
//   }

//   render() {
//     return `
//       <div class="chat-page">
//         <div class="chat-list">
//           {{{ChatList}}}
//         </div>
//         <div class="chat-window">
//           {{{ChatWindow}}}
//         </div>
//       </div>
//     `;
//   }
// }

// class ChatPage extends Block {
//   constructor(props: any) {
//     super({
//       ...props,
//       events: {
//         click: (event: Event) => {
//           const target = event.target as HTMLElement;

//           if (target.classList.contains('create-chat-button')) {
//             const modal = document.querySelector('.modal-chat');
//             if (modal) {
//               modal.style.display = 'block';
//             }
//           }

//           if (target.classList.contains('close-button')) {
//             const modal = document.querySelector('.modal-chat');
//             if (modal) {
//               modal.style.display = 'none';
//             }
//           }

//           if (target.id === 'create-chat') {
//             const chatTitleElement = document.getElementById('chat-title') as HTMLInputElement;
//             const chatTitle = chatTitleElement?.value.trim();
//             if (chatTitle) {
//               createChat({ title: chatTitle })
//                 .then(() => {
//                   this.loadChats(); // Обновите список чатов
//                   const modal = document.querySelector('.modal-chat');
//                   if (modal) {
//                     modal.style.display = 'none';
//                   }
//                 })
//                 .catch(error => {
//                   console.error('Ошибка при создании чата:', error);
//                 });
//             }
//           }
//         },
//       },
//       ChatList: new ChatList({
//         chats: props.chats || [],
//         onSelectChat: (chat: ChatDTO) => {
//           this.setProps({ 
//             selectedChat: chat, 
//             chats: this.props.chats, 
//           });
//           this.loadChatUsers(chat.id);
//           console.log('Выбранный чат:', chat);
//           console.log('Чаты после клика:', this.props.chats); // Логирование чатов
//         },
//       }),
//       ChatWindow: new ChatWindow({
//         selectedChat: props.selectedChat || null,
//         onDeleteChat: () => {
//           this.setProps({
//             selectedChat: null,
//           });
//           this.loadChats(); // Перезагрузка списка чатов
//         },
//       }),
//     });
//   }

//   componentDidUpdate(oldProps: any, newProps: any): boolean {
//     console.log('Старые пропсы:', oldProps);
//     console.log('Новые пропсы:', newProps);
//     if (oldProps.chats !== newProps.chats) {
//       this.children.ChatList.setProps({ chats: newProps.chats });
//     }
//     // if (oldProps.selectedChat !== newProps.selectedChat) {
//     //   this.children.ChatWindow.setProps({ selectedChat: newProps.selectedChat });
//     // }
//     if (oldProps.selectedChat !== newProps.selectedChat) {
//       this.loadChatUsers(newProps.selectedChat.id);
//       this.children.ChatWindow.setProps({ selectedChat: newProps.selectedChat });
//     }
//     return true;
//   }

//   componentDidMount() {
//     this.loadChats(); // Загрузка чатов при открытии страницы
//   }
  
//   async loadChats() {
//     try {
//       const chats = await fetchChats();
//       this.setProps({ chats });
//     } catch (error) {
//       console.error('Ошибка загрузки чатов', error);
//     }
//   }

//   async loadChatUsers(chatId: number) {
//     try {
//       const users = await fetchChatUsers(chatId);
//       this.setProps({ chatUsers: users });
//       this.children.ChatWindow.setProps({ users });
//     } catch (error) {
//       console.error('Ошибка загрузки пользователей чата', error);
//     }
//   }

//   render() {
//     return `
//       <div class="chat-page">

//         <button class="create-chat-button">Создать чат</button>
//         <div class="modal-chat hidden">
//           <div class="modal-content">
//             <span class="close-button">&times;</span>
//             <h2>Создать новый чат</h2>
//             <input type="text" id="chat-title" placeholder="Название чата" />
//             <button id="create-chat">Создать</button>
//           </div>
//         </div>

//         <div class="chat-list">
//           {{{ChatList}}}
//         </div>
//         <div class="chat-window">
//           {{{ChatWindow}}}
//         </div>
//       </div>
//     `;
//   }
// }

// const mapStateToProps = (state: any) => ({
//   chats: state.chats || [],
//   selectedChat: state.selectedChat || null,
//   chatUsers: state.chatUsers || [],
// });

// // @ts-expect-error: Игнорируем ошибку connect(mapStateToProps)(ChatPage);
// export default connect(mapStateToProps)(ChatPage);


/* import Block from '../../core/Block';
import { ChatList } from '../../components';
import { ChatWindow } from '../../components';
import { ChatDTO } from '../../api/type';

import { createChat, fetchChats } from '../../services/chatService';
import { connect } from '../../utils';

class ChatPage extends Block {
  constructor(props: any) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;

          if (target.classList.contains('create-chat-button')) {
            const modal = document.querySelector('.modal-chat');
            if (modal) {
              modal.style.display = 'block';
            }
          }

          if (target.classList.contains('close-button')) {
            const modal = document.querySelector('.modal-chat');
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
                  this.loadChats(); // Обновите список чатов
                  const modal = document.querySelector('.modal-chat');
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
          this.loadChats(); // Перезагрузка списка чатов
        },
      }),
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
    }
    return true;
  }

  componentDidMount() {
    this.loadChats(); // Загрузка чатов при открытии страницы
  }
  
  async loadChats() {
    try {
      const chats = await fetchChats();
      this.setProps({ chats });
    } catch (error) {
      console.error('Ошибка загрузки чатов', error);
    }
  }

  render() {
    return `
      <div class="chat-page">

        <button class="create-chat-button">Создать чат</button>
        <div class="modal-chat hidden">
          <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Создать новый чат</h2>
            <input type="text" id="chat-title" placeholder="Название чата" />
            <button id="create-chat">Создать</button>
          </div>
        </div>

        <div class="chat-list">
          {{{ChatList}}}
        </div>
        <div class="chat-window">
          {{{ChatWindow}}}
        </div>
      </div>
    `;
  }
}

const mapStateToProps = (state: any) => ({
  chats: state.chats || [],
  selectedChat: state.selectedChat || null,
});

// @ts-expect-error: Игнорируем ошибку connect(mapStateToProps)(ChatPage);
export default connect(mapStateToProps)(ChatPage); */

import Block from '../../core/Block';
import { ChatList, ChatFormSearch, ButtonOnMyProfile } from '../../components';
import { ChatWindow } from '../../components';
import { ChatDTO } from '../../api/type';

import { createChat, fetchChats } from '../../services/chatService';
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
    // @ts-expect-error: Suppress error related to router.go possibly not existing
    window.router.go('/profile');
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


/* <div class="chat-page">

        <button class="create-chat-button">Создать чат</button>
        <div class="modal-chat hidden">
          <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Создать новый чат</h2>
            <input type="text" id="chat-title" placeholder="Название чата" />
            <button id="create-chat">Создать</button>
          </div>
        </div>

        <div class="chat-list">
          {{{ChatList}}}
        </div>
        <div class="chat-window">
          {{{ChatWindow}}}
        </div>
      </div> */