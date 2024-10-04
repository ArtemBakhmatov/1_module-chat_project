/* eslint-disable linebreak-style */

import Block from '../../core/Block';

import { ProfileAvatar, FormProfile } from '..';

export default class ProfileWrapper extends Block {
  constructor(props) {
    super({
      ...props,
      ProfileAvatar: new ProfileAvatar({}),
      FormProfile: new FormProfile({}),
    });
  }

  render(): string {
    return (
      `
        <div class="profile__content">
          <div class="profile__information">
            {{{ ProfileAvatar }}}
            {{{ FormProfile }}}
          </div>
        </div>
      `
    );
  }
}


