import { StoreEvents } from '../../core/Store';
import isEqual from '../isEqual/isEqual';

type State = Record<string, unknown>; 
type Props = Record<string, unknown>; 

// type DispatchHandler = (dispatch: (nextState: State) => void, ...args: unknown[]) => void;

// interface Dispatchers {
//   [key: string]: DispatchHandler;
// }

// export function connect(mapStateToProps: (state: State) => Props, dispatch?: Dispatchers) {
//   return function (Component: new (props: Props) => unknown) {
// 		 // @ts-expect-error: Игнорируем ошибку Component
//     return class extends Component {
//       private onChangeStoreCallback: () => void;

//       constructor(props: Props) {
//         // @ts-expect-error: Игнорируем ошибку window.store
//         const store = window.store;
//         let state = mapStateToProps(store.getState());

//         super({ ...props, ...state });

//         const dispatchHandlers: Record<string, (args: unknown[]) => void> = {};
//         Object.entries(dispatch || {}).forEach(([key, handler]) => {
//           dispatchHandlers[key] = (...args: unknown[]) => handler(store.set.bind(store), ...args);
//         });

//         // @ts-expect-error: Игнорируем ошибку this.setProps
//         this.setProps({ ...dispatchHandlers });

//         this.onChangeStoreCallback = () => {
//           const newState = mapStateToProps(store.getState());
//           console.log('New state in connect:', newState); // Логирование для проверки

//           if (!isEqual(state, newState)) {
//             // @ts-expect-error: Игнорируем ошибку this.setProps
//             this.setProps({ ...newState });
//           }

//           state = newState;
//         };

//         store.on(StoreEvents.Updated, this.onChangeStoreCallback);
//       }

//       componentWillUnmount() {
//         super.componentWillUnmount();
//         // @ts-expect-error: Игнорируем ошибку window.store
//         window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
//       }
//     };
//   };
// }

export function connect(mapStateToProps: (state: State) => Props) {
  return function (Component: new (props: Props) => unknown) {
    // @ts-expect-error: Игнорируем ошибку Component
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props: Props) {
        // @ts-expect-error: Игнорируем ошибку window.store;
        const store = window.store;
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());
          console.log('New state in connect:', newState);

          if (!isEqual(state, newState)) {
            // @ts-expect-error: Игнорируем ошибку this.setProps({ ...newState });
            this.setProps({ ...newState });
          }

          state = newState;
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }
    };
  };
}

