import { expect } from 'chai';
import EventBus from './EventBus';

describe('EventBus', () => {
  let eventBus: EventBus;
  let callback: () => void;

  beforeEach(() => {
    eventBus = new EventBus();
    callback = () => {};
  });

  it('должен зарегистрировать слушатель события', () => {
    eventBus.on('test', callback);
    expect(eventBus.getListeners().test).to.include(callback);
  });

  it('должен вызвать событие', () => {
    let called = false;
    eventBus.on('test', () => {
      called = true;
    });
    eventBus.emit('test');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(called).to.be.true;
  });

  it('должен удалить слушатель события', () => {
    eventBus.on('test', callback);
    eventBus.off('test', callback);
    expect(eventBus.getListeners().test).to.not.include(callback);
  });

  it('не должен вызывать ошибку, если событие не зарегистрировано', () => {
    expect(() => eventBus.emit('non-existing')).to.not.throw();
  });
});

