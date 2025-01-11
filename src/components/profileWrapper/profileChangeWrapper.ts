/* eslint-disable @typescript-eslint/restrict-template-expressions */

import Block from '../../core/Block';
import { connect } from '../../utils';

import { FormProfileChange } from '..';
import AvatarModal from '../avatarModal/avatarModal';
import { UserDTO } from '../../api/type';

interface ProfileChangeWrapperProps {
  onSubmit: (data: Partial<UserDTO>) => void;
  profileData: { first_name?: string | undefined; second_name?: string | undefined; display_name?: string | undefined; login?: string | undefined; email?: string | undefined; phone?: string | undefined; avatar?: string | undefined; } | undefined;
  //[key: string]: unknown;
}

class ProfileChangeWrapper extends Block {
  constructor(props: ProfileChangeWrapperProps) {
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
      FormProfileChange: new FormProfileChange({
        profileData: props.profileData,
        onSubmit: props.onSubmit,
      }),
    });
  }

  openAvatarModal() {
    const modal = new AvatarModal();
    document.body.appendChild(modal.getContent());
    modal.show();
  }

  // @ts-expect-error: Игнорируем ошибку componentDidUpdate
  componentDidUpdate(oldProps: ProfileChangeWrapperProps, newProps: ProfileChangeWrapperProps): boolean {
    // console.log('ProfileWrapper componentDidUpdate:', { oldProps, newProps });
    if (oldProps.profileData !== newProps.profileData) {
      this.children.FormProfileChange.setProps({ profileData: newProps.profileData });
    }
    //return true;

    if (oldProps.profileData?.avatar !== newProps.profileData?.avatar) {
      console.log('Avatar changed:', newProps.profileData?.avatar); 
  
      this.children.FormProfileChange.setProps({ profileData: newProps.profileData });
      
      // @ts-expect-error: Игнорируем ошибку state
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
    // @ts-expect-error: Игнорируем ошибку window.router
    const avatarPath = window.store.getState().profile?.avatar;
    const avatarUrl = avatarPath ? `https://ya-praktikum.tech/api/v2/resources${avatarPath}` : window.store.getState().avatarUrl;

    return (
      `
        <div class="profile__content">
          <div class="profile__information">
            <div class="profile__avatarWrapper">
              <img src="${avatarUrl}" alt="Avatar" class="profile__avatar" id="avatar" />
              <div class="profile__avatarText">Поменять аватар</div>
            </div>
            {{{ FormProfileChange }}}
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

// @ts-expect-error: Игнорируем ошибку connect(mapStateToProps)(ProfileChangeWrapper);
export default connect(mapStateToProps)(ProfileChangeWrapper);




