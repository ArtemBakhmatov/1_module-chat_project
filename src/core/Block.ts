/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventBus'; // Предполагается, что у вас есть этот модуль

type Events = {
  [key: string]: (e: Event) => void;
};

type PropValue = unknown;

type Props = {
  events?: Events;
  [key: string]: PropValue;
};

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  private _element: HTMLElement | null = null;

  private _id: string = nanoid(6);

  private _eventListeners: { eventName: string; handler: (event: Event) => void }[] = [];

  private eventBus: EventBus;

  protected props: Props;

  protected children: { [key: string]: Block };

  constructor(propsWithChildren: Props = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy(props);
    this.children = children;
    this.eventBus = eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents() {
    const { events = {} } = this.props;
    this._eventListeners = [];
    Object.keys(events).forEach((eventName) => {
      const handler = events[eventName];
      if (this._element) {
        this._element.addEventListener(eventName, handler);
        this._eventListeners.push({ eventName, handler });
      }
    });
  }

  private _removeEvents() {
    if (this._element) {
      this._eventListeners.forEach(({ eventName, handler }) => {
        this._element!.removeEventListener(eventName, handler);
      });
      this._eventListeners = [];
    }
  }

  public remove() {
    this._removeEvents();
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._render();
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    console.log('Old Props:', oldProps);
    console.log('New Props:', newProps);
    return true;
  }

  private _getChildrenAndProps(propsAndChildren: Props) {
    const children: { [key: string]: Block } = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  public setProps(nextProps: Props) {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  }

  public get element() {
    return this._element;
  }

  private _render() {
    console.log('Start rendering');
    this._removeEvents();
    const propsAndStubs = { ...this.props };
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    const newElement = fragment.content.firstElementChild as HTMLElement;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      const childContent = child.getContent();
      if (stub && childContent) {
        stub.replaceWith(child.getContent());
      }
    });

    if (this._element) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;

    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  public getContent() {
    if (!this._element) {
      throw new Error('Element is not initialized');
    }

    if (this._element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this._element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }

    return this._element;
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  private _makePropsProxy(props: Props): Props {
    return new Proxy(props, {
      get: (target: Props, prop: string | symbol) => {
        const value = target[prop as keyof Props];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Props, prop: string | symbol, value: unknown) => {
        const oldTarget = { ...target };
        target[prop as keyof Props] = value;
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });
  }

  public show() {
    this.getContent().style.display = 'block';
  }

  public hide() {
    this.getContent().style.display = 'none';
  }
}


/// // это мой код //////////////
// import { nanoid } from 'nanoid';
// import Handlebars from 'handlebars';
// import EventBus from './EventBus';

// type TEvents = Values<typeof Block.EVENTS>

// export default class Block {
//   static EVENTS = {
//     INIT: 'init',
//     FLOW_CDM: 'flow:component-did-mount',
//     FLOW_CDU: 'flow:component-did-update',
//     FLOW_RENDER: 'flow:render',
//   } as const;

//   _element = null;

//   _meta = null;

//   _id = nanoid(6);


//   private _eventbus;

//   constructor(propsWithChildren = {}) {
//     const eventBus = new EventBus<TEvents>();
//     const { props, children } = this._getChildrenAndProps(propsWithChildren);
//     this.props = this._makePropsProxy({ ...props });
//     this.children = children;
//     this.name = '';

//     this.eventBus = () => eventBus;

//     this._registerEvents(eventBus);

//     eventBus.emit(Block.EVENTS.INIT);
//   }

//   _addEvents() {
//     const { events = {} } = this.props;
//     this._eventListeners = []; // Сохраняем ссылки на обработчики событий
//     Object.keys(events).forEach((eventName) => {
//       const handler = events[eventName];
//       this._element.addEventListener(eventName, handler);
//       this._eventListeners.push({ eventName, handler }); // Сохраняем обработчик
//       console.log(`Event ${eventName} added`); // Лог добавления события
//     });
//   }

//   _removeEvents() {
//     if (this._eventListeners) {
//       this._eventListeners.forEach(({ eventName, handler }) => {
//         this._element.removeEventListener(eventName, handler);
//         console.log(`Event ${eventName} removed`); // Лог удаления события
//       });
//       this._eventListeners = []; // Очищаем массив обработчиков
//     }
//   }

//   remove() {
//     this._removeEvents();
//     if (this._element) {
//       this._element.remove();
//       this._element = null;
//     }
//   }

//   _registerEvents(eventBus: EventBus<TEvents>) {
//     eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
//   }

//   _init() {
//     this.init();

//     this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//   }

//   init() {
//   }

//   _componentDidMount() {
//     this.componentDidMount();

//     Object.values(this.children).forEach((child) => {
//       child.dispatchComponentDidMount();
//     });
//   }

//   componentDidMount(oldProps) {}

//   dispatchComponentDidMount() {
//     this.eventBus().emit(Block.EVENTS.FLOW_CDM);
//   }

//   _componentDidUpdate(oldProps, newProps) {
//     console.log('CDU');
//     const response = this.componentDidUpdate(oldProps, newProps);
//     if (!response) {
//       return;
//     }
//     this._render();
//   }

//   componentDidUpdate(oldProps, newProps) {
//     return true;
//   }

//   _getChildrenAndProps(propsAndChildren) {
//     const children = {};
//     const props = {};

//     Object.entries(propsAndChildren).forEach(([key, value]) => {
//       if (value instanceof Block) {
//         children[key] = value;
//       } else {
//         props[key] = value;
//       }
//     });

//     return { children, props };
//   }

//   setProps = (nextProps) => {
//     if (!nextProps) {
//       return;
//     }

//     Object.assign(this.props, nextProps);
//   };

//   get element() {
//     return this._element;
//   }

//   _render() {
//     console.log('Start rendering'); // Лог начала рендеринга
//     this._removeEvents();
//     const propsAndStubs = { ...this.props };

//     Object.entries(this.children).forEach(([key, child]) => {
//       propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
//     });

//     const fragment = this._createDocumentElement('template');

//     if (this.name === 'LoginPage') {
//       console.log(this.render());
//       console.log(propsAndStubs);
//     }

//     fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
//     if (this.name === 'LoginPage') {
//       console.log(fragment.innerHTML);
//     }

//     const newElement = fragment.content.firstElementChild;

//     Object.values(this.children).forEach((child) => {
//       const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

//       stub?.replaceWith(child.getContent());
//     });

//     if (this._element) {
//       this._element.replaceWith(newElement);
//     }

//     this._element = newElement;

//     this._addEvents();
//     console.log('End rendering'); // Лог окончания рендеринга
//     if (this.name === 'LoginPage') {
//       console.log(newElement.innerHTML);
//     }
//   }

//   render() {}

//   getContent() {
//     // Хак, чтобы вызвать CDM только после добавления в DOM
//     if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
//       setTimeout(() => {
//         if (
//           this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
//         ) {
//           this.dispatchComponentDidMount();
//         }
//       }, 100);
//     }

//     return this._element;
//   }

//   _makePropsProxy(props) {
//     // Можно и так передать this
//     // Такой способ больше не применяется с приходом ES6+
//     const self = this;

//     return new Proxy(props, {
//       get(target, prop) {
//         const value = target[prop];
//         return typeof value === 'function' ? value.bind(target) : value;
//       },
//       set(target, prop, value) {
//         const oldTarget = { ...target };
//         target[prop] = value;

//         // Запускаем обновление компоненты
//         // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
//         self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
//         return true;
//       },
//       deleteProperty() {
//         throw new Error('Нет доступа');
//       },
//     });
//   }

//   _createDocumentElement(tagName) {
//     // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
//     return document.createElement(tagName);
//   }

//   show() {
//     this.getContent().style.display = 'block';
//   }

//   hide() {
//     this.getContent().style.display = 'none';
//   }
// }
