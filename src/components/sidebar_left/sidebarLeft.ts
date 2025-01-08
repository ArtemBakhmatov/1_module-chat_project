/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
import Block from '../../core/Block';

import SidebarLink from './sidebarLink';

interface SidebarLeftProps {
  [key: string]: unknown;
  onClick?: () => void; // Modify this type according to the actual type of onClick
}

export default class SidebarLeft extends Block {
  constructor(props: SidebarLeftProps) {
    super({
      ...props,
      events: {
        click: props.onClick || (() => {}),
      },
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




