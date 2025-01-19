import { expect } from 'chai';
import Router from './Router';
import sinon from 'sinon';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router('#app');
  });

  it('должен зарегистрировать маршруты', () => {
    router.use('/test', () => {});
    expect(router.getRoutes()).to.have.lengthOf(1);
  });

  it('должен находить правильный маршрут', () => {
    const block = () => {};
    router.use('/test', block);
    const route = router.findRoute('/test');
    //eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(route).to.not.be.undefined;
  });

  it('должен перейти по заданному пути', () => {
    const stub = sinon.stub(router, 'go');
    router.go('/test');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(stub.calledWith('/test')).to.be.true;
    stub.restore();
  });

  it('должен обрабатывать неизвестные маршруты', () => {
    const block = () => {};
    router.use('*', block);
    const route = router.findRoute('/unknown');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(route).to.not.be.undefined;
  });
});

