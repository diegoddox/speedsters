import * as React from 'react';
import { connect } from 'react-redux';
import { styled } from 'styletron-react';
import Container from 'Common/Container';
import List from './Components/List';
import GlobalState from 'Common/State';
import { denormalize } from 'Utils';
import CSSType from 'csstype';
import globalStyle, { preventUserSelection } from 'Common/Styles';
import Logo from 'Common/Logo';
import filterPerformances from './filter-performances';
import checkPerformance from './check-performance';
import { ipcRenderer } from 'electron';

export type BasePerformance = {
  name: string;
  value: number;
  data?: Array<any>;
  isReactComponent?: boolean;
  timeline?: any[];
  timing?: number;
  milliseconds?: number;
}

type Props = {
  performances: any[];
  currentApplicationName: string;
  applicationsConnected: number;
  quickSearchIsOpen: boolean;
}

const InfoHolder = styled('div', {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...preventUserSelection,
} as CSSType.Properties);

const Info = styled('div', {
  width: '300px',
  textAlign: 'center',
  color: globalStyle.color.softWhite,
} as CSSType.Properties);

export class PerformanceList extends React.Component<Props, {}> {
  checkPerformanceTimeout: any = null;
  lastTotalIssues: number = 0;

  constructor(props: Props) {
    super(props);

    this.checkPerformanceAndNotify = this.checkPerformanceAndNotify.bind(this);
  }

  componentDidUpdate() {
    this.checkPerformanceAndNotify(this.props.performances);
  }

  checkPerformanceAndNotify(performances: any) {
    if (!performances.length) {
      return
    };

    if (this.checkPerformanceTimeout) {
      clearTimeout(this.checkPerformanceTimeout);
    }

    this.checkPerformanceTimeout = setTimeout(() => {
      checkPerformance(performances).then(resp => {
        const issues = resp.totalIssues - this.lastTotalIssues;
        this.lastTotalIssues = resp.totalIssues;

        if (resp && resp.totalIssues && resp.totalIssues > this.lastTotalIssues) {
          ipcRenderer.send('main-window-is-blur');

          ipcRenderer.on('main-window-is-blur:reply', (_: any, isBlur: boolean) => {
            if (isBlur) {
              const title = `You have ${issues} ${issues > 1 ? 'performances' : 'performance'} that didn't pass`;
              const issueNotification = new Notification(title, {
                body: 'Some of your performance didn\'t pass, you may wanna take a look at.'
              });

              issueNotification.onclick = () => ipcRenderer.send('focus-main-window');
            }
          });
        }
      });
    }, 2000);
  }

  render() {
    return (
      <Container>
        {!this.props.applicationsConnected ?
          <>
            <Logo />
            <InfoHolder>
              <Info>
                Looks like we're not able to connect to any @speedsters package, reload your application in order to re-connect
              </Info>
            </InfoHolder>
          </>
          :
          <List
            performances={this.props.performances}
            quickSearchIsOpen={this.props.quickSearchIsOpen}
          />
        }
      </Container>
    );
  }
}

export default connect((state: GlobalState) => {
  const quickSearchIsOpen = state.titleBar.quickSearchIsOpen;
  const performancesDenormalize = denormalize(state.performance.byName, state.performance.selectedPerformance);
  const performances = filterPerformances(performancesDenormalize, state.titleBar.quickSearchText, quickSearchIsOpen);

  return {
    performances,
    quickSearchIsOpen,
    applicationsConnected: state.performance.applicationNames.length,
    currentApplicationName: state.performance.selectedPerformance
  };
})(PerformanceList);