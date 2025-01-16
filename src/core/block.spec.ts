/* import { expect } from 'chai';
import Block from './Block';
import sinon from 'sinon';

describe('Block', () => {
  let PageComponent;

  before(() => {
    class Page extends Block {
      constructor(props) {
        super('div', props);
      }

      render() {
        return `<div>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </div>`;
      }
    }

    PageComponent = Page;
  });

  // написать тест на то что комопнент создается с переданными пропсами
  it('Должен создать компонент с состоянием из конструктора', () => {
    const text = '';
		
    const pageComponent = new PageComponent({ text });

    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  // проверить что реактивность у копонента работает
  it('Компонент должен иметь реактивное повдение', () => {
    const newValue = 'New value';
		
    const pageComponent = new PageComponent({ text: 'Hello' });

    pageComponent.setProps({ text: newValue });
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(newValue);
  });

  // проверить что комопнент навешивает события
  it('Компонент должен установить события на элемент', () => {
    // const clickhadnlerStub = sinon.stub();
    let isHandlerCliced = true;
    const clickhadnlerStub = () => { isHandlerCliced = false; };
    const pageComponent = new PageComponent({
      events: {
        click: clickhadnlerStub,
      },
    });

    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);

    // expect(clickhadnlerStub.calledOnce).to.be.true;
    expect(isHandlerCliced).to.be.true;
  });

  // // проверить что dispatchComponentDidMount отрабатывает когда элемент попал в дом
  // it('Компонент должен вызвать dispatchComponentDidMount метод', () => {
  //   const clock = sinon.useFakeTimers();
  //   const pageComponent = new PageComponent();

  //   const spyCDM = sinon.spy(pageComponent, 'componentDidMount');

  //   const element = pageComponent.getContent();
  //   clock.next();

  //   expect(spyCDM.calledOnce).to.be.true;
  // });
});  */

import { expect } from 'chai';
import Block from './Block';
import { JSDOM } from 'jsdom';

describe('Block', () => {
  before(() => {
    const { window } = new JSDOM('<!DOCTYPE html><body></body>');
    global.window = window as unknown as Window & typeof globalThis;
    global.document = window.document;
  });

  class TestBlock extends Block {
    render() {
      return '<div>Test Block</div>';
    }
  }

  it('should initialize with correct props', () => {
    const block = new TestBlock({ testProp: 'testValue' });
    expect(block.getProps().testProp).to.equal('testValue');
  });

  it('should update props and re-render', () => {
    const block = new TestBlock();
    block.setProps({ newProp: 'newValue' });
    expect(block.getProps().newProp).to.equal('newValue');
  });

  it('should show and hide element', () => {
    const block = new TestBlock();
    block.show();
    expect(block.getContent().style.display).to.equal('block');
    block.hide();
    expect(block.getContent().style.display).to.equal('none');
  });

  it('should return the content', () => {
    const block = new TestBlock();
    expect(block.getContent().outerHTML).to.include('Test Block');
  });
});

