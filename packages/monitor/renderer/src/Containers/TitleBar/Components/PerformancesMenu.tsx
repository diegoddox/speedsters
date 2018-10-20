import * as React from 'react';
import * as CSSType from 'csstype';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { styled } from 'styletron-react';
import globalStyles, { preventUserSelection } from 'Common/Styles';
import { getValueFromPixel } from 'Utils';
import Icon from 'Common/Icon';
import GlobalReduxState from 'Common/State';
import { selectPerformance, ALL_PERFORMANCES } from '../../PerformanceList/reducer';
import {
  closePerformanceMenu,
  openPerformanceMenu,
  openQuickSearchAction,
} from '../reducer';

const SIZE = '30px';

const BASE_BUTTON_STYLES = {
  ...preventUserSelection,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: SIZE,
  height: SIZE,
  position: 'relative',
  zIndex: 1,
  marginLeft: globalStyles.tinySpace,
  marginRight: globalStyles.tinySpace,
  borderRadius: SIZE,
  border: `1px solid ${globalStyles.color.primary}`,
  ':hover': {
    color: globalStyles.color.issue,
  },
} as CSSType.Properties;

const MenuHolder = styled('div', {
  flex: 1,
  display: 'flex',
} as CSSType.Properties);

const PerformanceMenuHolder = styled('div', {
  width: SIZE,
  height: SIZE,
  marginLeft: globalStyles.tinySpace,
  marginRight: globalStyles.tinySpace,
  position: 'relative',
  ':hover': {
    color: globalStyles.color.issue,
  },
} as CSSType.Properties);

const PerformanceMenuButton = styled('div', {
  ...BASE_BUTTON_STYLES,
  marginLeft: 0,
  marginRight: 0,
} as CSSType.Properties);

type MenuType= {
  $active?: boolean;
}

const PerformanceMenu = styled('div', (props: MenuType) => ({
  width: '250px',
  position: 'absolute',
  left: '50%',
  top: '20px',
  marginLeft: '-125px',
  zIndex: props.$active ? 2 : 1,
  transform: props.$active ? 'translate3d(0, 0px, 0)' : 'translate3d(0, -25px, 0)',
  transition: 'all 250ms',
  opacity: props.$active ? 1 : 0,
  pointerEvents: props.$active ? 'auto' : 'none',
} as CSSType.Properties));

const PerformanceMenuContent = styled('div', {
  width: '100%',
  marginTop: '20px',
  position: 'relative',
  backgroundColor: globalStyles.color.secondary,
  borderRadius: globalStyles.tinySpace,
  boxShadow: '0px 5px 25px #222',
} as CSSType.Properties);

const BORDER_SIZE = '10px';
const BORDER_DEFAULT_VALUES = `${BORDER_SIZE} solid transparent`;

const MenuContentTriangle = styled('div', {
  width: 0,
  height: 0,
  borderTop: BORDER_DEFAULT_VALUES,
  borderBottom: `${BORDER_SIZE} solid ${globalStyles.color.secondary}`,
  borderLeft: BORDER_DEFAULT_VALUES,
  borderRight: BORDER_DEFAULT_VALUES,
  position: 'absolute',
  left: '50%',
  top: `-${(getValueFromPixel(BORDER_SIZE) * 2)}px`,
  marginLeft: `-${BORDER_SIZE}`,

} as CSSType.Properties);

type MenuItemType = {
  $active: boolean;
} 

const PerformanceMenuItem = styled('li', (props: MenuItemType) => ({
  padding: `10px ${globalStyles.mediumSpace}`,
  textAlign: 'center',
  color: props.$active ? globalStyles.color.issue : globalStyles.color.softWhite,
  cursor: 'pointer',
  opacity: props.$active ? 1 : 0.4,
  ':hover': {
    opacity: 1,
  },
  ...preventUserSelection,
} as CSSType.Properties & any));

const SearchButton = styled('div', {
  ...BASE_BUTTON_STYLES,
});

type OwnProps = {
  menuList: string[];
}

type Props = OwnProps & {
  selectedPerformance: string;
  displayPerformanceMenu: string;
  dispatch: Dispatch;
};

class PerformancesMenu extends React.PureComponent<Props, {}> {
  performancesMenuHolder: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.performancesMenuHolder = React.createRef();
    this.handlePerformanceMouseEnter = this.handlePerformanceMouseEnter.bind(this);
    this.handlePerformanceMouseLeave = this.handlePerformanceMouseLeave.bind(this);
    this.handleOpenQuickSearch = this.handleOpenQuickSearch.bind(this);
  }

  componentDidMount() {
    this.performancesMenuHolder.current.addEventListener('mouseenter', this.handlePerformanceMouseEnter);
    this.performancesMenuHolder.current.addEventListener('mouseleave', this.handlePerformanceMouseLeave);
  }

  componentWillUnmount() {
    this.performancesMenuHolder.current.removeEventListener('mouseenter', this.handlePerformanceMouseEnter);
    this.performancesMenuHolder.current.removeEventListener('mouseleave', this.handlePerformanceMouseLeave);
  }

  handlePerformanceMouseEnter() {
    this.props.dispatch(openPerformanceMenu);
  }

  handlePerformanceMouseLeave() {
    /**
     * Check if is open, it may be closed
     * before by @handleSelectPerformance
     */
    if (this.props.displayPerformanceMenu) {
      this.props.dispatch(closePerformanceMenu);
    }
  }

  handleSelectPerformance = (performance: string) => () => {
    this.props.dispatch(selectPerformance(performance));
    this.props.dispatch(closePerformanceMenu);
  }

  handleOpenQuickSearch() {
    this.props.dispatch(openQuickSearchAction);
  }

  render() {
    return (
      <MenuHolder>
        <PerformanceMenuHolder $ref={this.performancesMenuHolder}>
          <PerformanceMenuButton>
            <Icon name="flash" />
          </PerformanceMenuButton>
          <PerformanceMenu $active={this.props.displayPerformanceMenu}>
            <PerformanceMenuContent>
              <MenuContentTriangle />
              {[ALL_PERFORMANCES, ...this.props.menuList].map(item =>
                <PerformanceMenuItem
                  key={item}
                  $active={item === this.props.selectedPerformance}
                  onClick={this.handleSelectPerformance(item)}
                >
                  {item}
                </PerformanceMenuItem>
              )}
            </PerformanceMenuContent>
          </PerformanceMenu>
        </PerformanceMenuHolder>
        <SearchButton onClick={this.handleOpenQuickSearch}>
          <Icon name="magnifying-glass" />
        </SearchButton>
      </MenuHolder>
    );
  }
}

export default connect(
  (state: GlobalReduxState, ownProps: OwnProps) => ({
    menuList: ownProps.menuList,
    selectedPerformance: state.performance.selectedPerformance,
    displayPerformanceMenu: state.titleBar.displayPerformanceMenu,
  }),
)(PerformancesMenu);