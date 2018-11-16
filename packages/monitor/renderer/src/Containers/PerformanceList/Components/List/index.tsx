import * as React from 'react';
import { styled } from 'styletron-react';
import ListItem from './ListItem';
import ListWithTitle from './ListWithTitle';
import * as CSSType from 'csstype';
import globalStyles, { preventUserSelection } from 'Common/Styles';
import { TITLE_BAR_HEIGHT, TITLE_BAR_EXPANDED_HEIGHT } from '../../../TitleBar'
import { getValueFromPixel } from 'Utils';

const Holder = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  overflowX: 'auto',
} as CSSType.Properties);

type ApplicationTitleType = {
  $index: number;
}

const ApplicationTitle = styled('div', (props: ApplicationTitleType) => ({
  display: 'flex',
  width: '100vw',
  height: '40px',
  padding: `0px ${globalStyles.mediumSpace}`,
  color: globalStyles.color.softWhite,
  backgroundColor: globalStyles.color.mediumDarkBlue,
  alignItems: 'center',
  zIndex: (props.$index + 1),
  position: 'relative',
  transition: 'all 300ms',
  ...preventUserSelection,
} as CSSType.Properties));

type Props = {
  performances: any[];
  quickSearchIsOpen: boolean;
}

class List extends React.Component<Props, {}> {
  holderRef: React.RefObject<HTMLDivElement>;
  performancesRefs: { [x: number]: HTMLDivElement; } = {};
  performanceTitleRefs: { [x: number]: HTMLDivElement; } = {};

  constructor(props: Props) {
    super(props);
    this.holderRef = React.createRef();

    this.isReferenceIntoView = this.isReferenceIntoView.bind(this);
    this.handlePerformancesRefs = this.handlePerformancesRefs.bind(this);
    this.handlePerformanceTitleRefs = this.handlePerformanceTitleRefs.bind(this);
    this.handleOnComponentHolderScroll = this.handleOnComponentHolderScroll.bind(this);
    this.updatePerformanceTitlePosition = this.updatePerformanceTitlePosition.bind(this);
  }

  componentDidMount() {
    this.holderRef.current.addEventListener('scroll', this.handleOnComponentHolderScroll);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.quickSearchIsOpen !== prevProps.quickSearchIsOpen) {
      this.updatePerformanceTitlePosition();
    }
  }

  componentWillUnmount() {
    this.holderRef.current.removeEventListener('scroll', this.handleOnComponentHolderScroll);
  }

  handleOnComponentHolderScroll() {
    this.props.performances.forEach((_, i) => this.isReferenceIntoView(i, this.props.quickSearchIsOpen));
  }

  updatePerformanceTitlePosition() {
    /**
     * In case the user exit/enter the quickSearch we need to update
     * any title that has position fixed.
     */
    Object.keys(this.performanceTitleRefs).forEach((key: any) => {
      const current: HTMLDivElement = this.performanceTitleRefs[key];
      if (current && current.style.position === 'fixed') {
        const titleBarHeight = this.props.quickSearchIsOpen ? TITLE_BAR_EXPANDED_HEIGHT : TITLE_BAR_HEIGHT;
        current.style.top = titleBarHeight;
      }
    });
  }

  isReferenceIntoView(index: number, quickSearchIsOpen: boolean) {
    const currentPerformanceHolder = this.performancesRefs[index];
    const currentTitle = this.performanceTitleRefs[index];

    const { top, bottom } = currentPerformanceHolder.getBoundingClientRect();

    const hasClassFixed = currentTitle.style.position === 'fixed';
    const titleBarHeight = quickSearchIsOpen ? TITLE_BAR_EXPANDED_HEIGHT : TITLE_BAR_HEIGHT;
    
    const offset = getValueFromPixel(titleBarHeight);
    
    if (
      top < offset &&
      bottom > offset &&
      !hasClassFixed
    ) {
      currentPerformanceHolder.style.paddingTop = '40px';
      currentTitle.style.cssText = `
        position: fixed;
        top: ${titleBarHeight};
        left: 0;
      `;

    } else if (
      top >= offset &&
      bottom >= offset &&
      hasClassFixed
    ) {
      currentPerformanceHolder.style.paddingTop = '0px';
      currentTitle.style.cssText = '';
    }
  }

  handlePerformancesRefs(index: number) {
    return (ref: HTMLDivElement) =>{
      this.performancesRefs[index] = ref;
    };
  }

  handlePerformanceTitleRefs(index: number) {
    return (ref: HTMLDivElement) => {
      this.performanceTitleRefs[index] = ref;
    };
  }

  render() {
    return (
      <Holder $ref={this.holderRef}>
        {this.props.performances.map((performance, i) => {
          const { applicationName } = performance;
          return (
            <div
              key={applicationName}
              ref={this.handlePerformancesRefs(i)}
            >
              <ApplicationTitle $index={i} $ref={this.handlePerformanceTitleRefs(i)}>
                {applicationName}
              </ApplicationTitle>
              <ul>
                {performance.data.map((x: any, i: number) => {
                  if (x.data && Array.isArray(x.data)) {
                    return (
                      <ListWithTitle
                        key={i}
                        {...x}
                        applicationName={applicationName}
                      />
                    );
                  } else {
                    return <ListItem key={i} {...x} />;
                  }
                })}
              </ul>
            </div>
          );
        })}
      </Holder>
    )
  }
}

export default List;