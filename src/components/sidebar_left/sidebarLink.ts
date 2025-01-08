/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import Block from '../../core/Block';

import SidebarSvg from './sidebarSvg';

interface SidebarLinkProps {
  [key: string]: unknown;
  onClick?: () => void; // Modify this type according to the actual type of onClick
}

export default class SidebarLink extends Block {
  constructor(props: SidebarLinkProps) {
    super({
      ...props,
      SidebarSvg: new SidebarSvg({}),
      events: {
        click: props.onClick || (() => {}),
      },
    });
  }

  protected render(): string {
    return (
      `
        <button class="sidebarLeft__linkCircleBlock">
            {{{ SidebarSvg }}}
        </button>
      `
    );
  }
}


