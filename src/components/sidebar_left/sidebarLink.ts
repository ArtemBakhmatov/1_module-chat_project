/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import Block from '../../core/Block';

import SidebarSvg from './sidebarSvg';

interface SidebarLinkProps {
  [key: string]: unknown;
}

export default class SidebarLink extends Block {
  constructor(props: SidebarLinkProps) {
    super({
      ...props,
      SidebarSvg: new SidebarSvg({}),
    });
  }

  protected render(): string {
    return (
      `
        <a href="#" class="sidebarLeft__linkCircleBlock" page="profile">
            {{{ SidebarSvg }}}
        </a>
      `
    );
  }
}


