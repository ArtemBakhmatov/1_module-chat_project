import { StoreEvents } from '../../core/Store';
import isEqual from '../isEqual/isEqual';

type State = Record<string, unknown>; 
type Props = Record<string, unknown>; 

export function connect(mapStateToProps: (state: State) => Props) {
  return function (Component: new (props: Props) => unknown) {
    // @ts-expect-error: Игнорируем ошибку Component
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props: Props) {
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



