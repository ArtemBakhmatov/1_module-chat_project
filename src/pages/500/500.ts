/* eslint-disable linebreak-style */
import Block from '../../core/Block';

interface Error500PageProps {
  [key: string]: unknown;
}

export default class Error500Page extends Block {
  constructor(props: Error500PageProps) {
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
              500
            </div>
            <div class="error__subtitle">
              Мы уже фиксим
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
