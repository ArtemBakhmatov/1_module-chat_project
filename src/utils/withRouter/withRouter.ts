interface Router {
  // Определите интерфейс для роутера, если он вам известен
  [key: string]: unknown; // Замените на конкретные свойства роутера
}

interface BlockProps {
  router?: Router; // Добавляем опциональное свойство router
  [key: string]: unknown; // Замените на конкретные типы, если известны
}

type BlockConstructor = new (props: BlockProps) => any;

declare global {
  interface Window {
    router: Router; // Укажите точный интерфейс для вашего роутера
  }
}

function withRouter(WrappedBlock: BlockConstructor): BlockConstructor {
  return class extends WrappedBlock {
    constructor(props: BlockProps) {
      super({ ...props, router: window.router });
    }
  };
}

export default withRouter;

