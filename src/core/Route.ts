interface Block {
  getContent: () => HTMLElement;
  show: () => void;
  hide: () => void;
  componentDidMount: () => void;
}

interface Props {
  rootQuery: string;
}

type BlockConstructor = new (props: unknown) => Block;

class Route {
  private _pathname: string;

  private _blockClass: BlockConstructor;

  private _block: Block | null;

  private _props: Props;

  constructor(pathname: string, view: BlockConstructor, props: Props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }
  
  leave() {
    if (this._block) {
      // this._block.hide();
    }
  }
  
  match(pathname: string): boolean {
    return pathname === this._pathname;
  }
  
  _renderDom(query: string, block: Block):void {
    const root = document.querySelector(query);
    if (root) {
      root.innerHTML = '';
      root.append(block.getContent());
    }
    
  }
  
  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
    }
  
    this._renderDom(this._props.rootQuery, this._block);
    this._block.componentDidMount();
  }
}

export default Route;

