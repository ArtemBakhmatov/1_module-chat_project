/* eslint-disable linebreak-style */
import Block from '../../core/Block';

export default class TitleElement extends Block {
  constructor(props) {
    super({
      ...props,
    });
  }

  render(): string {
    return (
      `
        <h1 class="title {{ classTitleName }}">
          {{ label }}
        </h1>
      `
    );
  }
}


