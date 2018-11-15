import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { styled } from "styletron-react";
import * as CSSType from 'csstype';
import globalStyles from 'Common/Styles';
import Icon from 'Common/Icon';
import { isWindows } from 'Utils';
import MacMenu from './Components/Menu/Mac';
import WindowsMenu from './Components/Menu/Windows';
import PerformancesMenu from './Components/PerformancesMenu';
import { toggleAvailableSpace } from './Components/Menu/helpers';
import State from 'Common/State';
import {
  closeQuickSearchAction,
  updateQuickSearchText
} from './reducer';

export const TITLE_BAR_HEIGHT = '55px';
export const TITLE_BAR_EXPANDED_HEIGHT = '100px';

type HolderProps = {
  $quickSearchIsOpen: boolean;
}

const Holder = styled('div', (props: HolderProps) => ({
  width: '100%',
  height: props.$quickSearchIsOpen ? TITLE_BAR_EXPANDED_HEIGHT : TITLE_BAR_HEIGHT,
  backgroundColor: globalStyles.color.secondary,
  position: 'relative',
  color: globalStyles.color.softWhite,
  transition: 'all 400ms',
  zIndex: 1,
} as CSSType.Properties));

/**
 * Adding the -webkit-app-region css on the Holder component
 * is preventing the user to click on any button that is
 * inside the Holder
 */

const DragArea = styled('div', {
  flex: 1,
  height: '100%',
  '-webkit-app-region': 'drag',
} as CSSType.Properties);

const ActionsHolder = styled('div', (props: HolderProps) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: TITLE_BAR_HEIGHT,
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  transition: 'all 400ms',
  transform: props.$quickSearchIsOpen ? 'translate3d(0, -100px, 0)' : 'translate3d(0, 0, 0)',
} as CSSType.Properties));

const LEFT_HOLDER_WITH = '90px';

const leftRightBaseMenuStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
}

const LeftMenuHolder = styled('div', {
  ...leftRightBaseMenuStyle,
  width: LEFT_HOLDER_WITH,
  paddingLeft: globalStyles.mediumSpace,
  '-webkit-app-region': 'drag',
} as CSSType.Properties);

const RIGHT_HOLDET_WITH = '100px';

const RightMenuHolder = styled('div', () => {
  const style = {
    ...leftRightBaseMenuStyle,
    width: RIGHT_HOLDET_WITH,
    paddingRight: globalStyles.mediumSpace,
  } as CSSType.Properties;

  if (!isWindows()) {
    // @ts-ignore
    style['-webkit-app-region'] = 'drag';
  }

  return style;
});

const MenuActionsHolder = styled('div', {
  display: 'flex',
  height: '100%',
  width: `calc((100% - ${LEFT_HOLDER_WITH}) - ${RIGHT_HOLDET_WITH})`,
} as CSSType.Properties);

const SearchAreaHolder = styled('div', (props: HolderProps) => ({
  width: '100%',
  height: TITLE_BAR_EXPANDED_HEIGHT,
  position: 'absolute',
  top: props.$quickSearchIsOpen ? 0: '-100px',
  left: 0,
  zIndex: 1,
  transition: 'all 300ms',
  transform: props.$quickSearchIsOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100px, 0)',
} as CSSType.Properties));

const Input = styled('input', {
  width: '85%',
  backgroundColor: 'transparent',
  border: 'none',
  height: '100%',
  color: globalStyles.color.softWhite,
  fontSize: '2em',
  padding: `0px ${globalStyles.mediumSpace}`,
  '::placeholder': {
    color: globalStyles.color.lightBlue,
  },
  ':focus': {
    outline: 0,
  },
  float: 'left'
} as CSSType.Properties);

const CloseSearchButton = styled('button', {
  width: '15%',
  height: '100%',
  background: 'none',
  border: 'none',
  position: 'relative',
  cursor: 'pointer',
  ':focus': {
    outline: 0,
  },
  appearance: 'none',
  float: 'left',
  textAlign: 'right',
  paddingRight: globalStyles.mediumSpace,
} as CSSType.Properties);

const CloseIcon = styled((props: any) => <Icon name="android-close" className={props.className} addTopSpace />, {
  fontSize: '4em',
  borderRadius: '50%',
  ':hover' : {
    backgroundColor: globalStyles.color.mediumBlue
  }
} as CSSType.Properties);


type Props = {
  menuList: string[];
  quickSearchIsOpen: boolean;
  dispatch: Dispatch;
  searchInputValue: string;
}

class TitleBar extends React.Component<Props, {}> {
  inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props: any) {
    super(props);

    this.handleEsc = this.handleEsc.bind(this);
    this.closeQuickSearch = this.closeQuickSearch.bind(this);
    this.handleSearchInputOnChange = this.handleSearchInputOnChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentDidUpdate() {
    if (this.props.quickSearchIsOpen) {
      this.inputRef.current.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc(e: KeyboardEvent) {
    const key = e.which || e.keyCode;
    if (key === 27) {
      this.closeQuickSearch();
    }
  }

  closeQuickSearch() {
    this.inputRef.current.blur();
    this.props.dispatch(closeQuickSearchAction);
    this.props.dispatch(updateQuickSearchText(''));
  }

  handleSearchInputOnChange(e: any) {
    this.props.dispatch(updateQuickSearchText(e.target.value));
  }

  render() {
    return (
      <Holder
        onDoubleClick={toggleAvailableSpace}
        $quickSearchIsOpen={this.props.quickSearchIsOpen}
      >
        <ActionsHolder $quickSearchIsOpen={this.props.quickSearchIsOpen}>
          <LeftMenuHolder>
            {!isWindows() && <MacMenu />}
          </LeftMenuHolder>
          <MenuActionsHolder>
            <DragArea />
            {!!this.props.menuList.length && <PerformancesMenu menuList={this.props.menuList}/>}
            <DragArea />
          </MenuActionsHolder>
          <RightMenuHolder>
            {isWindows() && <WindowsMenu />}
          </RightMenuHolder>
        </ActionsHolder>
        <SearchAreaHolder $quickSearchIsOpen={this.props.quickSearchIsOpen}>
          <Input
            $ref={this.inputRef}
            placeholder="Search"
            value={this.props.searchInputValue}
            onChange={this.handleSearchInputOnChange}
          />
          <CloseSearchButton onClick={this.closeQuickSearch}>
            <CloseIcon />
          </CloseSearchButton>
        </SearchAreaHolder>
      </Holder>
    );
  }
}

export default connect(
  (state: State) => ({
    menuList: state.performance.applicationNames,
    quickSearchIsOpen: state.titleBar.quickSearchIsOpen,
    searchInputValue: state.titleBar.quickSearchText,
  }),
)(TitleBar);