import Handlebars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages';

import Router from './core/Router';
import { Store } from './core/Store';
import './styles/style.scss';

import icon from './assets/icons/Union.png';
// import { ChatWebSocketService } from './services/chatWebSocketService';

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component as unknown as Handlebars.TemplateDelegate);
});

const router = new Router('#app');

window.router = router as unknown as { go: (path: string) => void };

window.store = new Store({
  isLoading: false,
  loginError: null,
  registrationError: null,
  profile: null,
  passwordError: null,
  avatarUrl: icon,
  chats: [],
  selectedChat: null,
  chatUsers: [],
  messages: [], // Добавляем поле для хранения сообщений
});

//window.store = store;

// Инициализируем WebSocket сервис, если он требует store
//const chatWebSocketService = new ChatWebSocketService(store);

router.use('/', Pages.LoginPage)
  .use('/sign-up', Pages.RegistrationPage)
  .use('/messenger', Pages.ChatPage)
  .use('/login', Pages.LoginPage)
  .use('*', Pages.Error404Page)
  .use('/profile', Pages.ProfilePage)
  .use('/settings', Pages.ProfileChangePage)
  .use('/password', Pages.ProfilePasswordPage)
  .start();

