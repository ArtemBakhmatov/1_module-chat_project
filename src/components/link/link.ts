/* eslint-disable linebreak-style */
import Block from '../../core/Block';

interface LinkProps {
  [key: string]: unknown;
}

class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return (
      `
          <a href="#" class={{ classLinkButton }} page={{ linkPage }}>
            {{ label }}
          </a>
        `
    );
  }
}

export default Link;


