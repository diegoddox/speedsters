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

class PerformanceList extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        {!this.props.applicationsConnected ?
          <>
            <Logo />
            <InfoHolder>
              <Info>
                Looks like we're not able to connect to any NPerformance, reload your application in order to re-connect
              </Info>
            </InfoHolder>
          </>
          :
          <List performances={this.props.performances} quickSearchIsOpen={this.props.quickSearchIsOpen}/>
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