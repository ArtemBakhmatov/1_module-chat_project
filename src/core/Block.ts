/* eslint-disable @typescript-eslint/no-unused-vars */
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

  private _meta: { tagName: string } | null = null;

  private _eventListeners: { eventName: string; handler: (event: Event) => void }[] = [];

  private eventBus: () => EventBus;

  protected props: Props;

  protected children: { [key: string]: Block };

  constructor(propsWithChildren: Props = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    // this._meta = { tagName };
    this.eventBus = () => eventBus;
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

  // @ts-expect-error: игнорируем предупреждение о неиспользуемом методе
  private _createResources() {
    if (this._meta) {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    } else {
      throw new Error('Meta information is not initialized');
    }
  }

  private _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
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
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // @ts-expect-error: Игнорируем ошибку window.store 
  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    //console.log('Component did update:', { oldProps, newProps }); // Логирование для проверки
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
    // console.log('Props set:', this.props); // Логирование для проверки
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, nextProps);
  }

  public get element() {
    return this._element;
  }

  private _render() {
    // console.log('Start rendering');
    this._removeEvents();
    const propsAndStubs = { ...this.props };
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const childrenProps: Block[] = [];
    Object.entries(propsAndStubs).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        propsAndStubs[key] = value.map((item) => {
          if (item instanceof Block) {
            childrenProps.push(item);
            return `<div data-id="${item._id}"></div>`;
          }

          return item;
        }).join('');
      }
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    const newElement = fragment.content.firstElementChild as HTMLElement;

    // Object.values(this.children).forEach((child) => {
    //   const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
    //   const childContent = child.getContent();
    //   if (stub && childContent) {
    //     stub.replaceWith(child.getContent());
    //   }
    // });

    [...Object.values(this.children), ...childrenProps].forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      
      stub?.replaceWith(child.getContent());
    });

    if (this._element) {
      newElement.style.display = this._element.style.display;
      this._element.replaceWith(newElement);
    }
    this._element = newElement;

    this._addEvents();
  }

  protected render() {
    
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
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
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



