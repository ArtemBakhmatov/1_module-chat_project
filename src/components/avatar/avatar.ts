import Block from '../../core/Block';

interface AvatarProps {
  src: unknown;
  onClick: () => void;
}

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  // componentDidUpdate(oldProps: AvatarProps, newProps: AvatarProps): boolean {
  //   // Обновляем аватарку, если изменился URL
  //   if (oldProps.src !== newProps.src) {
  //     this.getContent().querySelector('img')!.src = newProps.src;
  //   }
  //   return true;
  // }

  // @ts-expect-error: игнорируем ошибку
  componentDidUpdate(oldProps: AvatarProps): boolean {
    console.log('componentDidUpdate called');
    console.log('Old src:', oldProps.src);
    console.log('New src:', this.props.src);
  
    if (oldProps.src !== this.props.src) {
      console.log('Avatar URL has changed');
      const imgElement = this.getContent().querySelector('img');
      
      if (imgElement) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        imgElement.src = `${this.props.src}?timestamp=${Date.now()}`;
        console.log('Updated img src:', imgElement.src);
      }
      return true;
    }
    return false;
  }


  render(): string {
    return '<img src="{{ src }}" alt="Avatar" class="profileAvatar__img" name="avatar" />';
  }
}