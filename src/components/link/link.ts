/* eslint-disable linebreak-style */
import Block from '../../core/Block';

class Link extends Block {
  constructor(props) {
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
