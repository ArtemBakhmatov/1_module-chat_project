/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
import Block from '../../core/Block';

import SidebarLink from './sidebarLink';

interface SidebarLeftProps {
  [key: string]: unknown;
}

export default class SidebarLeft extends Block {
  constructor(props: SidebarLeftProps) {
    super({
      ...props,
      SidebarLink: new SidebarLink({}),


    });
  }

  render(): string {
    return (
      `
        <div class="sidebarLeft">
          {{{ SidebarLink }}}
        </div>
      `
    );
  }
}


