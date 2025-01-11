import Block from '../../core/Block';

import { SidebarLeft } from '../../components';
import { ProfileWrapper } from '../../components/profileWrapper';
import { Spinner } from '../../components';
import { connect } from '../../utils';
import { loadProfile } from '../../services/profile';

interface State {
  isLoading: boolean;
  profileError: string | null;
  profile: unknown; // Замените на точный тип
}

interface ProfilePageProps {
  isLoading: boolean;
  profileError: string | null;
  profileData: unknown; // Замените на точный тип
  [key: string]: unknown;
}

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super({
      ...props,
      SidebarLeft: new SidebarLeft({
        onClick: () => this.onClickMessengerPage(),
      }),
      ProfileWrapper: new ProfileWrapper({ profileData: props.profileData }), // Передача profileData,
      Spinner: new Spinner({}),
    });
    console.log('ProfilePage props:', props); // Отладка props
  }

  componentDidMount() {
    // Переместите вызов loadProfile сюда, если он не должен вызываться в конструкторе
    void loadProfile();
  }

  componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {
    // console.log('ProfilePage componentDidUpdate:', { oldProps, newProps });
    if (oldProps.profileData !== newProps.profileData) {
      this.children.ProfileWrapper.setProps({ profileData: newProps.profileData });
    }
    
    return true;
  }

  onClickMessengerPage() {
    (window.router as unknown as { go: (path: string) => void }).go('/messenger');
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

const mapStateToProps = ({ isLoading, profileError, profile }: State): ProfilePageProps => {
  // console.log('Mapping state to props:', { profile });
  return {
    isLoading,
    profileError,
    profileData: profile, // Убедитесь, что profileData извлекается из profile
  };
};
// @ts-expect-error: Игнорируем ошибку connect(mapStateToProps)(ProfilePage)
export default connect(mapStateToProps)(ProfilePage);




