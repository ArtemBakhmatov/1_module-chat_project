/* eslint-disable linebreak-style */
import Block from '../../core/Block';

interface Error404PageProps {
  [key: string]: unknown;
}

export default class Error404Page extends Block {
  constructor(props: Error404PageProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return (
      `
        <main class="error">
          <div class="error__content">
            <div class="error__title">
              404
            </div>
            <div class="error__subtitle">
              Не туда попали
            </div>
            <a href="#" class="error__link">
              Назад к чатам
            </a>
          </div>
        </main>
      `
    );
  }
}
