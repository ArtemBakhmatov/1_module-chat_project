/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Block from '../../core/Block';
import { changeAvatar } from '../../services/avatar';

class AvatarModal extends Block {
  private selectedFile: File | null = null;

  constructor() {
    super({
      errorMessage: '',
      successMessage: '',
      fileName: '',
      isFileSelected: false,
      events: {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        submit: (e: Event) => this.uploadAvatar(e),
        change: (e: Event) => this.handleFileChange(e),
        click: (e: Event) => this.handleCloseClick(e),
      },
    });
  }

  handleCloseClick(e: Event) {
    const target = e.target as HTMLElement;
    const form = this.getContent().querySelector('.avatarModal__form');

    // @ts-expect-error: игнорируем ошибку
    if (target !== form && !form.contains(target)) {
      this.hide(); // Закрыть модальное окно, если клик не по форме
    }
    if (target && target.classList.contains('avatarModal__close')) {
      this.hide();
    }
  }

  handleFileChange(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    // if (file) {
    //   this.selectedFile = file;
    //   this.setProps({ fileName: file.name, isFileSelected: true, errorMessage: '', successMessage: '' });
    // } else {
    //   this.selectedFile = null;
    //   this.setProps({ fileName: '', isFileSelected: false, errorMessage: 'Нужно выбрать файл', successMessage: '' });
    // }

    if (file) {
      const validExtensions = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (validExtensions.includes(file.type)) {
        this.selectedFile = file;
        this.setProps({ fileName: file.name, isFileSelected: true, errorMessage: '', successMessage: '' });
      } else {
        this.selectedFile = null;
        this.setProps({ fileName: '', errorMessage: 'Можно загружать только изображения', successMessage: '' });
      }
    } else {
      this.selectedFile = null;
      this.setProps({ fileName: '', isFileSelected: false, errorMessage: 'Нужно выбрать файл', successMessage: '' });
    }
  }

  async uploadAvatar(e: Event) {
    e.preventDefault();

    if (!this.selectedFile) {
      this.setProps({ errorMessage: 'Нужно выбрать файл', successMessage: '' });
      return;
    }

    const formData = new FormData();
    formData.append('avatar', this.selectedFile);

    try {
      await changeAvatar(formData);
      this.setProps({ successMessage: 'Файл загружен', errorMessage: '', fileName: '', isFileSelected: false });

      setTimeout(() => {
        this.hide(); // Закрываем модальное окно после успешной загрузки
      }, 2000);
    } catch (error) {
      console.error('Ошибка при загрузке аватара:', error);
      this.setProps({ errorMessage: 'Ошибка, попробуйте ещё раз', successMessage: '' });
    }
  }

  render() {
    const { errorMessage, successMessage, fileName, isFileSelected } = this.props;

    return `
      <div class="avatarModal">
        <form class="avatarModal__form">
          ${ successMessage ? '<button type="button" class="avatarModal__close"></button>' : '<button type="button" class="avatarModal__close">&times;</button>'}
          
          
          ${isFileSelected || successMessage ? `<p class="avatarModal__title">${successMessage ? 'Файл загружен' : 'Файл добавлен'}</p>` : '<p class="avatarModal__title">Загрузите файл</p>' }
          

          ${successMessage || isFileSelected ? '' : '<label class="avatarModal__file"><input type="file" accept="image/*" required /><span>Выбрать файл на компьютере</span></label>' }

          <p class="${isFileSelected ? 'avatarModal__nameImg_active' : 'avatarModal__nameImg'}">${fileName ? `${fileName}` : ''}</p>
          ${successMessage ? '' : '<button type="submit" class="button button__primary button__width">Поменять</button>'}
          <p class="avatarModal__errorMessage">${errorMessage}</p>
          
        </form>
      </div>
    `;
  }
}

export default AvatarModal;

// <p class="avatarModal__title">Загрузите файл</p>
// ${successMessage || isFileSelected ? '' : '<input type="file" name="avatar" accept="image/*" />'}
// ${ successMessage ? '' : '<p class="avatarModal__title"></p>'}