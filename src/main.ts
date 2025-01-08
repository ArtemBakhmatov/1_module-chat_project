import Handlebars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages';

import Router from './core/Router';
import { Store } from './core/Store';
import './styles/style.scss';

import icon from './assets/icons/Union.png';

Object.entries(Components).forEach(([name, component]) => {
  // @ts-expect-error: Игнорируем ошибку типов, так как компоненты корректно регистрируются в Handlebars
  Handlebars.registerPartial(name, component);
});

const router = new Router('#app');
// @ts-expect-error: Игнорируем ошибку window.router 
window.router = router;

// @ts-expect-error: Игнорируем ошибку window.store 
window.store = new Store({
  isLoading: false,
  loginError: null,
  registrationError: null,
  profile: null, // Добавьте это для хранения данных профиля
  passwordError: null,
  avatarUrl: icon,
  chats: [],
  selectedChat: null,
  chatUsers: [], // Добавьте это для хранения пользователей чата
});

router.use('/', Pages.LoginPage)
  .use('/sign-up', Pages.RegistrationPage)
  //.use('/messenger', Pages.ChatListPage)
  .use('/messenger', Pages.ChatPage)
  .use('/login', Pages.LoginPage)
  .use('*', Pages.Error404Page)
  .use('/profile', Pages.ProfilePage)
  .use('/settings', Pages.ProfileChangePage)
  .use('/password', Pages.ProfilePasswordPage)
  .start();

