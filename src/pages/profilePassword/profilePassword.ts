import Block from '../../core/Block';
import { connect } from '../../utils';
import { changePassword } from '../../services/passwordChange';

import { SidebarLeft } from '../../components';
import { ProfilePasswordWrapper } from '../../components';
import { Spinner } from '../../components';
import { loadProfile } from '../../services/profile';

interface ProfilePasswordPageProps {
  isLoading: boolean;
  passwordError: string | null;
  [key: string]: unknown;
}

class ProfilePasswordPage extends Block {
  // private modalVisible = false;

  constructor(props: ProfilePasswordPageProps) {
    super({
      ...props,
      SidebarLeft: new SidebarLeft({
        onClick: () => this.onClickProfilePage(),
      }),

      Spinner: new Spinner({}),
      
      PasswordWrapper: new ProfilePasswordWrapper({
        profileData: props.profileData,
        onSubmit: async (data: { oldPassword: string; newPassword: string }) => {
          await changePassword(data);
          // @ts-expect-error: Suppress error related to router.go possibly not existing
          window.router.go('/profile');
        },
      }),
    });
  }

  componentDidMount() {
    // Переместите вызов loadProfile сюда, если он не должен вызываться в конструкторе
    void loadProfile();
  }

  onClickProfilePage() {
    // @ts-expect-error: Suppress error related to router.go possibly not existing
    window.router.go('/profile');
  }

  componentDidUpdate(oldProps: ProfilePasswordPageProps, newProps: ProfilePasswordPageProps): boolean {

    if (oldProps.passwordError !== newProps.passwordError) {
      this.children.PasswordWrapper.setProps({ passwordError: newProps.passwordError });
    }

    if (oldProps.profileData !== newProps.profileData) {
      this.children.ProfileWrapper.setProps({ profileData: newProps.profileData });
    }

    return true;
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

              {{#if modalVisible}}
                <div class="modal-overlay" onclick="{{ toggleModal }}"></div>
                {{{ Modal }}}
              {{/if}}
              
              {{{ PasswordWrapper }}}
              <div class="error-message">
                {{#if passwordError}}
                  <p>{{ passwordError }}</p>
                {{/if}}   
              </div>

            {{/if}}
          </div>
        </main>
      `
    );
  }
}

const mapStateToProps = (state: { 
  isLoading: boolean; 
  passwordError: string | null; 
  profileData: unknown
}): ProfilePasswordPageProps => {
  console.log('State in connect:', state); // Логирование всего состояния
  return {
    isLoading: state.isLoading,
    passwordError: state.passwordError,
  };
};
// @ts-expect-error: Игнорируем ошибку connect(mapStateToProps)(ChangePasswordPage)
export default connect(mapStateToProps)(ProfilePasswordPage);

