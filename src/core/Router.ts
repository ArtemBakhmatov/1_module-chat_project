import Route from './Route';

import AuthApi from '../api/auth';
const authApi = new AuthApi();

class Router {
  private static __instance: Router;

  private routes: Route[] = [];
  
  private _currentRoute: Route | null = null; // Объявляем свойство _currentRoute

  private history: History = window.history;


  private _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery;
    Router.__instance = this;

  }

  public use(pathname: string, block: any): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as Window | null;
      if (target) {
        void this._onRoute(target.location.pathname);
      }
    }).bind(this);
    void this._onRoute(window.location.pathname);
  }

  private async _onRoute(pathname: string): Promise<void> {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    /* // add code
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    // */

    //////////////////////////////////////////
    try {
      // Проверяем, авторизован ли пользователь
      const user = await authApi.me();
      if (user) {
        // Если пользователь авторизован
        if (pathname === '/' || pathname === '/sign-up') {
          this.go('/messenger');
          return;
        }
      } else {
        // Если пользователь не авторизован
        if (pathname === '/messenger') {
          this.go('/login');
          return;
        }
      }
    } catch (error) {
      console.error('Ошибка при проверке авторизации', error);
      if (pathname === '/messenger' || pathname === '/' || pathname === '/sign-up') {
        this.go('/login');
        return;
      }
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
  
    this._currentRoute = route;
    if (route !== null) {
      route.render();
    }
  }

  public go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    void this._onRoute(pathname);
  }

  public back(): void {
    this.history.back();
  }

  public forward(): void {
    this.history.forward();
  }

  private getRoute(pathname: string): Route | undefined {
    const existingRoute = this.routes.find(route => route.match(pathname));
    if (!existingRoute) {
      return this.routes.find(route => route.match('*'));
    }
    return existingRoute;
  }
}

export default Router;




