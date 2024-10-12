/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */

import Block from '../../core/Block';

import { ProfileAvatar, FormProfileChange } from '..';

interface ProfileChangeWrapperProps {
  [key: string]: unknown;
}

export default class ProfileChangeWrapper extends Block {
  constructor(props: ProfileChangeWrapperProps) {
    super({
      ...props,
      ProfileAvatar: new ProfileAvatar({}),
      FormProfileChange: new FormProfileChange({}),
    });
  }

  render(): string {
    return (
      `
        <div class="profile__content">
          <div class="profile__information">
            {{{ ProfileAvatar }}}
            {{{ FormProfileChange }}}
          </div>
        </div>
      `
    );
  }
}


