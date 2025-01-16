import { expect } from 'chai';
import EventBus from './EventBus';

describe('EventBus', () => {
  let eventBus: EventBus;
  let callback: () => void;

  beforeEach(() => {
    eventBus = new EventBus();
    callback = () => {};
  });

  it('should register event listener', () => {
    eventBus.on('test', callback);
    expect(eventBus.getListeners().test).to.include(callback);
  });

  it('should emit event', () => {
    let called = false;
    eventBus.on('test', () => {
      called = true;
    });
    eventBus.emit('test');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(called).to.be.true;
  });

  it('should remove event listener', () => {
    eventBus.on('test', callback);
    eventBus.off('test', callback);
    expect(eventBus.getListeners().test).to.not.include(callback);
  });

  it('should not throw error if emitting non-existing event', () => {
    expect(() => eventBus.emit('non-existing')).to.not.throw();
  });
});