import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'Updated',
}

interface State {
  [key: string]: unknown; // Используем 'unknown' вместо 'any'
}

export class Store extends EventBus {
  private static __instance: Store;
	
  private state: State = {};

  constructor(defaultState: State = {}) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState(): State {
    return this.state;
  }

  public set(nextState: State): void {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };
  
    this.emit(StoreEvents.Updated, prevState, nextState);

    console.log('Store updated:', this.state); // Логирование для проверки
  }
}




