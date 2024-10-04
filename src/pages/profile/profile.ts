/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import Block from '../../core/Block';

import { SidebarLeft } from '../../components';
import { ProfileWrapper } from '../../components/profileWrapper';

export default class Profile extends Block {
  constructor(props) {
    super({
      ...props,
      SidebarLeft: new SidebarLeft({}),
      ProfileWrapper: new ProfileWrapper({}),

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
