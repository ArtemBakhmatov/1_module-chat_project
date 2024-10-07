/* eslint-disable linebreak-style */

import Block from '../../core/Block';

import { ProfileAvatar, FormProfile } from '..';

interface ProfileWrapperProps {
  [key: string]: unknown;
}

export default class ProfileWrapper extends Block {
  constructor(props: ProfileWrapperProps) {
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


