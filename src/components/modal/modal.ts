import Block from '../../core/Block';

interface ModalProps {
  onClick: () => void;
  onSubmit: (file: File) => void;
}

export default class Modal extends Block {
  constructor(props: ModalProps) {
    super({
      ...props,
      events: {
        submit: (e) => {
          e.preventDefault();
          const input = this.getContent().querySelector('input[type="file"]') as HTMLInputElement;
          if (input.files && input.files[0]) {
            console.log('Selected file:', input.files[0]);
            props.onSubmit(input.files[0]);
          } else {
            console.error('No file selected');
          }
        },
        click: (e) => {
          if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
            props.onClick();
          }
        },
      },
    });
  }

  render(): string {
    return `
      <div class="modal-overlay">
        <div class="modalImg">
          <form class="modalImg__form">
            <p class="modalImg__title">Загрузите файл</p>
            <label class="modalImg__file">
              <input type="file" accept="image/*" required />
              <span>Выбрать файл на компьютере</span>
            </label>
            <button type="submit" class="button button__primary button__width">Поменять</button>
          </form>
        </div>
      </div>
    `;
  }
}

