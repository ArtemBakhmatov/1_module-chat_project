/* eslint-disable linebreak-style */
import Block from '../../core/Block';

interface TitleElementProps {
  [key: string]: unknown;
}

export default class TitleElement extends Block {
  constructor(props: TitleElementProps) {
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


