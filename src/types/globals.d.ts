import { StoreEvents } from '../core/Store';

declare global {
  interface Window {
    router: {
      go: (path: string) => void;
    };
    store: {
      on(Updated: StoreEvents, onChangeStoreCallback: () => void): unknown;
      getState(): { [x: string]: unknown; };
      set: (data: Record<string, unknown>) => void;
    };
  }
}
  
export {};

