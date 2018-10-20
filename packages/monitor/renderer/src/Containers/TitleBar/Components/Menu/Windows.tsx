import * as React from 'react';
import { styled } from "styletron-react";
import * as CSSType from 'csstype';
import Icon from 'Common/Icon';
import globalStyles from 'Common/Styles';
import * as menuHelpers from './helpers';

const WindowsMenuHolder = styled('div', {
  display: 'flex',
  justifyContent:'flex-end',
  paddingLeft: globalStyles.mediumSpace,
  paddingRight: globalStyles.mediumSpace,
} as CSSType.Properties);

const ICON_SIZE = '20px';

const BaseIcon = styled(Icon, {
  width: ICON_SIZE,
  height: ICON_SIZE,
})

const BaseButtonStyle: CSSType.Properties & {[x: string]: any} = {
  height: '100%',
  border: 'none',
  color: 'white',
  backgroundColor: 'transparent',
  ':focus': {
    outline: 0,
  }
};

type WindowsBaseButton = {
  $marginRight?: string;
}

const WindowsBaseButton = styled('button', (props: any) => ({
  ...BaseButtonStyle,
  marginRight: props.$marginRight ? props.$marginRight : '',
}))

export default class WindowsMenu extends React.PureComponent {
  constructor(props: any) {
    super(props);

    this.handleCloseButton = this.handleCloseButton.bind(this);
    this.handleMinimizeButton = this.handleMinimizeButton.bind(this);
    this.handleFillAvailableSpace = this.handleFillAvailableSpace.bind(this);
  }

  handleCloseButton(e: any) {
    e.preventDefault();
    menuHelpers.close();
  }

  handleMinimizeButton(e: any) {
    e.preventDefault();
    menuHelpers.minimize();
  }

  handleFillAvailableSpace(e: any) {
    e.preventDefault();
    menuHelpers.fillAvailableSpace();
  }

  render() {
    return (
      <WindowsMenuHolder>
        <WindowsBaseButton
          $marginRight={globalStyles.smallSpace}
          onClick={this.handleMinimizeButton}
        >
          <BaseIcon name="android-remove" />
        </WindowsBaseButton>
        <WindowsBaseButton
          $marginRight={globalStyles.smallSpace}
          onClick={this.handleFillAvailableSpace}
        >
          <BaseIcon name="square-o" />
        </WindowsBaseButton>
        <WindowsBaseButton
          $marginRight={globalStyles.smallSpace}
          onClick={this.handleCloseButton}
        >
          <BaseIcon name="android-close" />
        </WindowsBaseButton>
      </WindowsMenuHolder>
    );
  }
}