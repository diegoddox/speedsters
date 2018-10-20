import * as React from 'react';
import * as CSSType from 'csstype';
import { connect } from 'react-redux';
import { styled } from 'styletron-react';
import globalStyles from 'Common/Styles';
import Icon from 'Common/Icon';
import { toggleTopLeftMenuAction } from '../reducer';
import GlobalReduxState from 'Common/State';

const applicationMenuTopLeftPosition = '220px';

function getSize() {
  if (window.innerWidth > window.innerHeight) {
    return window.innerWidth;
  }
  return window.innerHeight;
}

export const applicationMenuButtonSize = '40px';

const ApplicationMenuButton = styled('button', (props: any) => ({
  width: applicationMenuButtonSize,
  height: applicationMenuButtonSize,
  borderRadius: applicationMenuButtonSize,
  backgroundColor: '#313f53',
  marginRight: '20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  border: `1px solid ${props.$isMenuActive ? 'white' : globalStyles.color.secondary}`,
  transition: 'all 400ms',
  zIndex: 2,
  ':focus': {
    outline: 0,
  },
  ':hover': {
    backgroundColor: globalStyles.color.secondary,
  },
} as CSSType.Properties & any));

const applicationMenuActiveSize = (getSize() * 1.5) + 'px';

const ApplicationMenuHolder = styled('div', (props: any) => ({
  backgroundColor: globalStyles.color.secondary,
  position: 'absolute',
  top: `-${applicationMenuTopLeftPosition}`,
  left: `-${applicationMenuTopLeftPosition}`,
  transition: 'all 0.8s',
  zIndex: 1,
  borderRadius: applicationMenuActiveSize,
  width: props.$isActive ? applicationMenuActiveSize : '10px',
  height: props.$isActive ? applicationMenuActiveSize : '10px',
}));

const Menu = styled('div', (props: any) => ({
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: applicationMenuTopLeftPosition,
  left: applicationMenuTopLeftPosition,
  transition: props.$isActive ? 'all 500ms ease 0.3s' : 'all 200ms',
  visibility: props.$isActive ? 'visible' : 'hidden',
  opacity: props.$isActive ? 1 : 0,
} as CSSType.Properties));

const TopMenuUl = styled('ul', {
  maxWidth: '60vw',
  margin: 'auto',
  paddingTop: '10%',
} as CSSType.Properties);

type Props = {
  openMenu: boolean;
  toggleMenu: () => void;
}

class TopLeftMenuButton extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <ApplicationMenuButton
          $isMenuActive={this.props.openMenu}
          onClick={this.props.toggleMenu}
        >
          {this.props.openMenu ? <Icon name="android-close" /> : <Icon name="flash" />}
        </ApplicationMenuButton>
        <ApplicationMenuHolder $isActive={this.props.openMenu}>
          <Menu $isActive={this.props.openMenu}>
            <TopMenuUl>
            </TopMenuUl>
          </Menu>
        </ApplicationMenuHolder>
      </div>
    )
  }
}

export default connect(
  (state: GlobalReduxState) => ({
    menuList: state.performance.applicationNames,
    openMenu: state.titleBar.openTopLeftMenu,
  }),
  (dispatch) => ({
    toggleMenu: () => dispatch(toggleTopLeftMenuAction)
  })
)(TopLeftMenuButton);