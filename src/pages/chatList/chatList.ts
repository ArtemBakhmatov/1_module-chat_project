/* eslint-disable linebreak-style */
import Block from '../../core/Block';

interface ProfileChangeProps {
  [key: string]: unknown;
}

import {
  ChatProfileItem,
  ChatMainProfile,
  ChatFormSearch,
  FormMessage,
} from '../../components';

export default class ProfileChange extends Block {
  constructor(props: ProfileChangeProps) {
    super({
      ...props,
      ChatProfileItem1: new ChatProfileItem({
        name: 'Андрей',
        message: 'Изображение',
        time: '10:49',
        numberMessages: '2',
        classNumberMessages: 'chat__profileLink_number',
      }),
      ChatProfileItem2: new ChatProfileItem({
        name: 'Киноклуб',
        message: 'Изображение',
        time: '10:49',
        numberMessages: '2',
        classNumberMessages: 'chat__profileLink_number',
      }),
      ChatProfileItem3: new ChatProfileItem({
        name: 'Киноклуб',
        myMessage: 'стикер',
        time: '12:00',
        numberMessages: '',
        classNumberMessages: 'chat__profileLink_number chat__profileLink_number__none',
        classMyMessage: 'myMessage_active',
      }),
      ChatProfileItem4: new ChatProfileItem({
        name: 'Илья',
        message: 'Друзья, у меня для вас особенный выпуск новостей!...',
        time: '15:12',
        numberMessages: '4',
        classNumberMessages: 'chat__profileLink_number',
      }),
      ChatProfileItem5: new ChatProfileItem({
        name: 'Вадим',
        myMessage: 'Круто!',
        time: 'Пт',
        numberMessages: '',
        classNumberMessages: 'chat__profileLink_number chat__profileLink_number__none',
        classMyMessage: 'myMessage_active',
        classProfileActive: 'chat__profileLink_active',
      }),
      ChatProfileItem6: new ChatProfileItem({
        name: 'Киноклуб',
        myMessage: 'стикер',
        time: '12:00',
        numberMessages: '',
        classNumberMessages: 'chat__profileLink_number chat__profileLink_number__none',
        classMyMessage: 'myMessage_active',
      }),
      ChatProfileItem7: new ChatProfileItem({
        name: 'тет-а-теты',
        message: 'И Human Interface Guidelines и Material Design рекомендуют...',
        time: 'Ср',
        numberMessages: '',
        classNumberMessages: 'chat__profileLink_number chat__profileLink_number__none',
      }),
      ChatProfileItem8: new ChatProfileItem({
        name: '1, 2, 3',
        message: 'Миллионы россиян ежедневно проводят десятки часов свое...',
        time: 'Пн',
        numberMessages: '',
        classNumberMessages: 'chat__profileLink_number chat__profileLink_number__none',
      }),
      ChatProfileItem9: new ChatProfileItem({
        name: 'Design Destroyer',
        message: 'В 2008 году художник Jon Rafman  начал собирать...',
        time: 'Пн',
        numberMessages: '',
        classNumberMessages: 'chat__profileLink_number chat__profileLink_number__none',
      }),
      ChatProfileItem10: new ChatProfileItem({
        name: 'Day.',
        message: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
        time: '1 Мая 2020',
        numberMessages: '',
        classNumberMessages: 'chat__profileLink_number chat__profileLink_number__none',
      }),
      ChatProfileItem11: new ChatProfileItem({
        name: 'Киноклуб',
        myMessage: 'стикер',
        time: '12:00',
        numberMessages: '',
        classNumberMessages: 'chat__profileLink_number chat__profileLink_number__none',
        classMyMessage: 'myMessage_active',
      }),
      ChatProfileItem12: new ChatProfileItem({
        name: 'Киноклуб',
        myMessage: 'стикер',
        time: '12:00',
        numberMessages: '',
        classNumberMessages: 'chat__profileLink_number chat__profileLink_number__none',
        classMyMessage: 'myMessage_active',
      }),
      ChatProfileItem13: new ChatProfileItem({
        name: 'Киноклуб',
        myMessage: 'стикер',
        time: '12:00',
        numberMessages: '',
        classNumberMessages: 'chat__profileLink_number chat__profileLink_number__none',
        classMyMessage: 'myMessage_active',
      }),
      ChatMainProfile: new ChatMainProfile({}),
      ChatFormSearch: new ChatFormSearch({}),
      FormMessage: new FormMessage({}),

    });
  }

  protected render(): string {
    return (
      `
        <main class="chat">
    <div class="chat__wrapper">
        <div class="chat__leftBlock">
            <div class="chatProfile">
              {{{ ChatMainProfile }}}
            </div>
            {{{  ChatFormSearch }}}
            <ul class="chat__profileList">
                {{{ ChatProfileItem1 }}}
                {{{ ChatProfileItem2 }}}
                {{{ ChatProfileItem3 }}}
                {{{ ChatProfileItem4 }}}
                {{{ ChatProfileItem5 }}}
                {{{ ChatProfileItem6 }}}
                {{{ ChatProfileItem7 }}}
                {{{ ChatProfileItem8 }}}
                {{{ ChatProfileItem9 }}}
                {{{ ChatProfileItem10 }}}
                {{{ ChatProfileItem11 }}}
                {{{ ChatProfileItem12 }}}
                {{{ ChatProfileItem13 }}}
            </ul>
        </div>
        <div class="chat__rightBlock">
            <div class="chat__rightBlock__position hide">
                <p class="chat__rightBlock__text">
                    Выберите чат чтобы отправить сообщение
                </p>
            </div>
            <div class="chat__infoTop">
                <div class="chat__person">
                    <div class="chat__person__avatar"></div>
                    <div class="chat__person__name">Вадим</div>
                </div>
                <button class="chat__person__btn chat__person__btn_active">
                    <div class="chat__person__circles">
                        <div class="chat__person__circle"></div>
                        <div class="chat__person__circle"></div>
                        <div class="chat__person__circle"></div>
                    </div>
                </button>
            </div>
            <div class="chat__personGroup">
                <div class="chat__personDate">19 июня</div>
                <div class="chat__personMessage">
                    Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
                    <br><br>
                    Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                    <span class="chat__personMessage__time">11:56</span>
                </div>
                <div class="chat__personMessage__img">
                    <img src="camera.jpg" alt="img">
                    <span class="chat__personMessage__time">11:56</span>
                </div>
            </div>
            <div class="chat__userContent">
                <div class="chat__userContent__wrapper">
                    <div class="chat__userContent__message">Круто!</div>
                    <div class="chat__userContent__sendingStatus">
                        <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="-0.5" x2="3.765" y2="-0.5" transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33313)" stroke="#3369F3"/>
                            <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.35828 5)" stroke="#3369F3"/>
                            <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5)" stroke="#3369F3"/>
                        </svg>
                    </div>
                    <div class="chat__userContent__time">12:00</div>
                </div>
            </div>
            <div class="chat__infoBottom">
                {{{ FormMessage }}}
            </div>
        </div>
    </div>
</main>


      `
    );
  }
}
