/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import Block from '../../core/Block';
import { connect } from '../../utils';
import { loadProfile } from '../../services/profile';
import { updateProfile } from '../../services/profileChangeService';

import { SidebarLeft, ProfileChangeWrapper } from '../../components';
import { Spinner } from '../../components';
import { UserDTO } from '../../api/type';

interface State {
  isLoading: boolean;
  profileError: string | null;
  profile: any; // Убедитесь, что тип корректный
}

interface ProfileChangePageProps {
  isLoading: boolean;
  profileError: string | null;
  profileData: any; // Убедитесь, что тип корректный
  [key: string]: unknown;
}

class ProfileChangePage extends Block {
  constructor(props: ProfileChangePageProps) {
    super({
      ...props,
      SidebarLeft: new SidebarLeft({
        onClick: () => this.onClickProfilePage(),
      }),
      ProfileWrapper: new ProfileChangeWrapper({
        profileData: props.profileData,
        onSubmit: async (data: Partial<UserDTO>) => {
          await updateProfile(data);
          console.log('страница для редактирования');
          // @ts-expect-error: Suppress error related to router.go possibly not existing
          window.router.go('/profile');
        },
      }),
      Spinner: new Spinner({}),
    });
    void loadProfile();
  }

  componentDidUpdate(oldProps: ProfileChangePageProps, newProps: ProfileChangePageProps): boolean {
    // console.log('ProfilePage componentDidUpdate:', { oldProps, newProps });
    if (oldProps.profileData !== newProps.profileData) {
      this.children.ProfileWrapper.setProps({ profileData: newProps.profileData });
    }
    return true;
  }

  onClickProfilePage() {
    // @ts-expect-error: Suppress error related to router.go possibly not existing
    window.router.go('/profile');
  }

  protected render(): string {
    return (
      `
        <main class="profile">
          <div class="profile__wrapper">
            {{{ SidebarLeft }}}

            {{#if isLoading}}
              {{{ Spinner }}}
              {{else}}

              {{{ ProfileWrapper }}} 
              <div class="error-message">
                {{#if profileError}}
                  <p>{{ profileError }}</p>
                {{/if}}   
              </div>

            {{/if}}
          </div>
        </main>
      `
    );
  }
}

const mapStateToProps = ({ isLoading, profileError, profile }: State): ProfileChangePageProps => ({
  isLoading,
  profileError,
  profileData: profile,
});

// @ts-expect-error: Игнорируем ошибку connect(mapStateToProps)(EditProfilePage)
export default connect(mapStateToProps)(ProfileChangePage); 


