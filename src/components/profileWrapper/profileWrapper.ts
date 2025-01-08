/* eslint-disable linebreak-style */

import Block from '../../core/Block';
import { connect } from '../../utils';

import { FormProfile } from '..';
import AvatarModal from '../avatarModal/avatarModal';

interface ProfileWrapperProps {
  [key: string]: unknown;
  profileData: { first_name?: string | undefined; second_name?: string | undefined; display_name?: string | undefined; login?: string | undefined; email?: string | undefined; phone?: string | undefined; avatar?: string | undefined; } | undefined;
}

class ProfileWrapper extends Block {
  constructor(props: ProfileWrapperProps) {
    super({
      ...props,
      // ProfileAvatar: new ProfileAvatar({}),
      events: {
        click: (e) => {
          if ((e.target as HTMLElement).id === 'avatar') {
            this.openAvatarModal();
          }
        },
      },
      // @ts-expect-error: Игнорируем ошибку profileData
      FormProfile: new FormProfile({ profileData: props.profileData }), // Передача profileData
    });
    // console.log('ProfileWrapper props:', props); // Отладка props
  }

  openAvatarModal() {
    const modal = new AvatarModal();
    document.body.appendChild(modal.getContent());
    modal.show();
  }
  
  componentDidUpdate(oldProps: ProfileWrapperProps, newProps: ProfileWrapperProps): boolean {
    // console.log('ProfileWrapper componentDidUpdate:', { oldProps, newProps });
    // if (oldProps.profileData !== newProps.profileData) {
    //   this.children.FormProfile.setProps({ profileData: newProps.profileData });
    // }
    // return true;

    console.log('Old props:', oldProps); // Логируем старые пропсы
    console.log('New props:', newProps); // Логируем новые пропсы

    if (oldProps.profileData?.avatar !== newProps.profileData?.avatar) {
      console.log('Avatar changed:', newProps.profileData?.avatar); // Логируем изменение аватара
  
      this.children.FormProfile.setProps({ profileData: newProps.profileData });
  
      // @ts-expect-error: Игнорируем ошибку newProps.profileData.avatar
      const avatarUrl = `https://ya-praktikum.tech/api/v2/resources${newProps.profileData.avatar}`;
      const avatarElement = this.getContent().querySelector('#avatar');
      
      if (avatarElement) {
        avatarElement.setAttribute('src', avatarUrl);
      }
  
      return true;
    }
  
    return false;
  }

  render(): string {
    
    // @ts-expect-error: Игнорируем ошибку window.store 
    const avatarPath = window.store.getState().profile?.avatar;
    // @ts-expect-error: Игнорируем ошибку window.store 
    const avatarUrl = avatarPath ? `https://ya-praktikum.tech/api/v2/resources${avatarPath}` : window.store.getState().avatarUrl;
    return (
      `
        <div class="profile__content">
          <div class="profile__information">
            <div class="profile__avatarWrapper">
              <img src="${avatarUrl}" alt="Avatar" class="profile__avatar" id="avatar" />
              <div class="profile__avatarText">Поменять аватар</div>
            </div>
            
            {{{ FormProfile }}}
          </div>
        </div>
      `
    );
  }
}

// @ts-expect-error: Игнорируем ошибку state 
const mapStateToProps = (state) => ({
  // avatar: state.profile?.avatar || state.avatarUrl,
  profileData: state.profile,
});

// @ts-expect-error: Игнорируем ошибку connect(mapStateToProps)(ProfileWrapper);
export default connect(mapStateToProps)(ProfileWrapper);




