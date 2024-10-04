/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import Block from '../../core/Block';

import { SidebarLeft, ProfileChangeWrapper } from '../../components';

export default class ProfileChange extends Block {
  constructor(props) {
    super({
      ...props,
      SidebarLeft: new SidebarLeft({}),
      ProfileWrapper: new ProfileChangeWrapper({}),

    });
  }

  protected render(): string {
    return (
      `
        <main class="profile">
          <div class="profile__wrapper">
            {{{ SidebarLeft }}}
            {{{ ProfileWrapper }}}
          </div>
        </main>
      `
    );
  }
}
