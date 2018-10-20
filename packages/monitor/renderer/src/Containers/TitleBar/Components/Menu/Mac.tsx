import * as React from 'react';
import { styled } from "styletron-react";
import * as CSSType from 'csstype';
import Icon from 'Common/Icon';
import globalStyles from 'Common/Styles';
import * as menuHelpers from './helpers';

const BASE_BUTTON_SIZE = '12px';

const MacLeftMenuHolder = styled('div', {
  width: '65px',
} as CSSType.Properties);

type BaseButtonProps = {
  $bgColor: string;
  $marginLeft?: string;
};

const MacBaseMenuButton = styled('button', (props: BaseButtonProps) => ({
  width: BASE_BUTTON_SIZE,
  height: BASE_BUTTON_SIZE,
  borderRadius: BASE_BUTTON_SIZE,
  backgroundColor: props.$bgColor,
  border: 'none',
  cursor: 'default',
  marginLeft: props.$marginLeft ? props.$marginLeft : '',
  position: 'relative',
  padding: 0,
  ':focus': {
    outline: 0,
  }
} as CSSType.Properties));

const ICON_BASE_STYLE: CSSType.Properties = {
  width: '10px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  marginLeft: '-5px',
  marginTop: '-5px',
};

const CloseIcon = styled(Icon, ICON_BASE_STYLE);
const MinimizeIcon = styled(Icon, ICON_BASE_STYLE);
const ExpandIcon = styled(Icon, ICON_BASE_STYLE);

type MenuState = {
  mouseOverMenu: boolean;
}

export default class MacMenu extends React.PureComponent<{}, MenuState> {
  macLeftMenuHolderRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.state = {
      mouseOverMenu: false,
    };

    this.macLeftMenuHolderRef = React.createRef();
    this.handleMacLeftMenuHolderMouseEvent = this.handleMacLeftMenuHolderMouseEvent.bind(this);
    this.handleCloseButton = this.handleCloseButton.bind(this);
    this.handleMinimizeButton = this.handleMinimizeButton.bind(this);
    this.handleFillAvailableSpace = this.handleFillAvailableSpace.bind(this);
  }

  componentDidMount() {
    this.macLeftMenuHolderRef.current.addEventListener('mouseenter', this.handleMacLeftMenuHolderMouseEvent);
    this.macLeftMenuHolderRef.current.addEventListener('mouseleave', this.handleMacLeftMenuHolderMouseEvent);
  }

  componentWillUnmount() {
    this.macLeftMenuHolderRef.current.removeEventListener('mouseenter', this.handleMacLeftMenuHolderMouseEvent);
    this.macLeftMenuHolderRef.current.removeEventListener('mouseleave', this.handleMacLeftMenuHolderMouseEvent);
  }

  handleMacLeftMenuHolderMouseEvent() {
    this.setState({ mouseOverMenu: !this.state.mouseOverMenu });
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
    const { mouseOverMenu } = this.state;
    return (
      <MacLeftMenuHolder $ref={this.macLeftMenuHolderRef}>
        <MacBaseMenuButton
          $bgColor="#ee6a5f"
          onClick={this.handleCloseButton}
        >
          {mouseOverMenu && <CloseIcon name="android-close" />}
        </MacBaseMenuButton>
        <MacBaseMenuButton
          $bgColor="#f6be4f"
          $marginLeft={globalStyles.smallSpace}
          onClick={this.handleMinimizeButton}
        >
          {mouseOverMenu && <MinimizeIcon name="android-remove" />}
        </MacBaseMenuButton>
        <MacBaseMenuButton
          $bgColor="#62c555"
          $marginLeft={globalStyles.smallSpace}
          onClick={this.handleFillAvailableSpace}
        >
          {mouseOverMenu && <ExpandIcon name="android-add" />}
        </MacBaseMenuButton>
      </MacLeftMenuHolder>
    );
  }
}