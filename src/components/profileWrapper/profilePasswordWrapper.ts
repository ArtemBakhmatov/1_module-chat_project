import Block from '../../core/Block';
import { connect } from '../../utils';

import { FormProfilePassword } from '..';
import AvatarModal from '../avatarModal/avatarModal';


interface ProfilePasswordWrapperProps {
  avatarUrl: string;
  // onAvatarClick: () => void;
  onSubmit: (data: { oldPassword: string; newPassword: string }) => void;
  [key: string]: unknown;
  profileData: { first_name?: string | undefined; second_name?: string | undefined; display_name?: string | undefined; login?: string | undefined; email?: string | undefined; phone?: string | undefined; avatar?: string | undefined; } | undefined;
}

class ProfilePasswordWrapper extends Block {
  constructor(props: ProfilePasswordWrapperProps) {
    super({
      ...props,
      events: {
        click: (e) => {
          if ((e.target as HTMLElement).id === 'avatar') {
            this.openAvatarModal();
          }
        },
      },
      FormProfilePassword: new FormProfilePassword({
        // @ts-expect-error: Игнорируем ошибку profileData
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

  // componentDidUpdate(oldProps: ProfilePasswordWrapperProps): boolean {
  //   console.log('PasswordChangeWrapper componentDidUpdate called');
  //   console.log('Old avatarUrl:', oldProps.avatarUrl);
  //   console.log('New avatarUrl:', this.props.avatarUrl);

  //   if (oldProps.avatarUrl !== this.props.avatarUrl) {
  //     console.log('Updating Avatar props with src:', this.props.avatarUrl);
  //     this.children.Avatar.setProps({ src: this.props.avatarUrl });
  //   }

  //   return true;
  // }

  componentDidUpdate(oldProps: ProfilePasswordWrapperProps, newProps: ProfilePasswordWrapperProps): boolean {
    // console.log('ProfileWrapper componentDidUpdate:', { oldProps, newProps });
    // if (oldProps.profileData !== newProps.profileData) {
    //   this.children.FormProfile.setProps({ profileData: newProps.profileData });
    // }
    // return true;
  
    console.log('Old props:', oldProps); // Логируем старые пропсы
    console.log('New props:', newProps); // Логируем новые пропсы
  
    if (oldProps.profileData?.avatar !== newProps.profileData?.avatar) {
      console.log('Avatar changed:', newProps.profileData?.avatar); // Логируем изменение аватара
    
      this.children.FormProfilePassword.setProps({ profileData: newProps.profileData });
    
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
    // @ts-expect-error: Игнорируем ошибку window.router
    const avatarPath = window.store.getState().profile?.avatar;
    // @ts-expect-error: Игнорируем ошибку window.router
    const avatarUrl = avatarPath ? `https://ya-praktikum.tech/api/v2/resources${avatarPath}` : window.store.getState().avatarUrl;

    return (
      `
        <div class="profile__content">
          <div class="profile__information">
            <div class="profileAvatar">
              <div class="profile__avatarWrapper">
              <img src="${avatarUrl}" alt="Avatar" class="profile__avatar" id="avatar" />
              <div class="profile__avatarText">Поменять аватар</div>
            </div>
              <div class="profileAvatar__title">Поменять аватар</div>
            </div>
            {{{ FormProfilePassword }}}
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

// @ts-expect-error: Игнорируем ошибку connect(mapStateToProps)(ProfilePasswordWrapper);
export default connect(mapStateToProps)(ProfilePasswordWrapper);

