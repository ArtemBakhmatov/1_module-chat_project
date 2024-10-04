import Handlebars from 'handlebars';

import * as Components from './components';
import * as Pages from './pages';

import './styles/style.scss';

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

const pages = {
  nav: [Pages.NavigatePage],
  login: [Pages.LoginPage],
  registration: [Pages.RegistrationPage],
  profile: [Pages.ProfilePage],
  404: [Pages.Error404Page],
  500: [Pages.Error500Page],
  chatList: [Pages.ChatListPage],
  profileChange: [Pages.ProfileChangePage],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  // @ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;

  if (source instanceof Object) {
    // eslint-disable-next-line no-shadow, new-cap
    const page = new source(context);
    container.innerHTML = '';
    container.append(page.getContent());
    // page.dispatchComponentDidMount();
    return;
  }
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', (e) => {
  // @ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

