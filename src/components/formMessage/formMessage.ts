/* eslint-disable linebreak-style */
import Block from '../../core/Block';
import { TextareaMessageWrapper } from '../textareaMessage';

interface FormMessageProps {
  [key: string]: unknown;
}

export default class FormMessage extends Block {
  constructor(props: FormMessageProps) {
    super({
      ...props,
      events: {
        submit: (e: Event) => {
          console.log('hello!');
          e.preventDefault();
          this.onMessage();
        },
      },
      TextareaMessageWrapper: new TextareaMessageWrapper({
        name: 'message',
        placeholder: 'Сообщение',
        classInputError: 'input__error__message',
        onBlur: (e: FocusEvent) => this.onChangeMessage(e),
      }),
    });
  }

  onChangeMessage(e: FocusEvent) {
    const inputValue = (e.target as HTMLInputElement).value;

    if (inputValue.length === 0) {
      this.children.TextareaMessageWrapper.setProps({
        error: true,
        errorText: 'Поле не должно быть пустым!',
      });
      return;
    }
    this.children.TextareaMessageWrapper.setProps({ error: false, errorText: null });

    this.setProps({ message: inputValue });
  }

  onMessage() {
    const messageSubmit = this.props.message;

    if (messageSubmit === undefined) {
      this.children.TextareaMessageWrapper.setProps({
        error: true,
        errorText: 'поле пустое',
      });
      return;
    }
    this.children.TextareaMessageWrapper.setProps({ error: false, errorText: null });

    console.log({
      message: messageSubmit,
    });
  }

  protected render(): string {
    return (
      `
        <form action="#" method="post" class="chat__sendingForm">
          <div class="chat__sendingForm__file">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z" fill="#999999"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70067 16.0141L17.2768 8.43793L18.2196 9.38074L10.6435 16.9569L9.70067 16.0141Z" fill="#999999"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z" fill="#999999"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8708L25.1335 16.2946L26.0763 17.2374L18.5002 24.8136L17.5574 23.8708Z" fill="#999999"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z" fill="#999999"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48303 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z" fill="#999999"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z" fill="#999999"/>
            </svg>
          </div>
            {{{ TextareaMessageWrapper }}}
            <button type="submit" class="chat__sendingForm__btn">
              <svg 
                class="chat__sendingForm__svg"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
              </svg>
            </button>
        </form>
      `
    );
  }
}

