import * as React from 'react';
import * as CSSType from 'csstype';
import { styled } from 'styletron-react';
import {
  hasPerformanceIssue,
  millisecondsToSeconds,
  getValueFromPixel,
} from 'Utils';
import Icon from 'Common/Icon';
import { BasePerformance } from '../../';
import globalStyles, { ellipsis, preventUserSelection } from 'Common/Styles';

const ListHolder = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderBottom: '1px solid #344256',
  ...preventUserSelection,
} as CSSType.Properties);

export const LIST_VALUE_WIDTH = '35%';

const ListValueHolder = styled('div', {
  width: LIST_VALUE_WIDTH,
  padding: '25px 20px',
  textAlign: 'right',
  borderRight: `1px dashed ${globalStyles.color.third}`,
  alignItems: 'center',
  position: 'relative',
  ...ellipsis,
} as CSSType.Properties);

const ListValue = styled('span', (props: any) => ({
  padding: `${globalStyles.tinySpace} ${globalStyles.smallSpace}`,
  borderRadius: globalStyles.mediumSpace,
  color: props.$hasPerformanceIssue ? globalStyles.color.black : globalStyles.color.softWhite,
  backgroundColor: props.$hasPerformanceIssue ? globalStyles.color.issue : '',
} as CSSType.Properties));

const ListName = styled('div', {
  width: '65%',
  paddingLeft: '20px',
  color: globalStyles.color.lightBlue,
} as CSSType.Properties);

const RENDER_COUNT_HOLDER_HEIGHT = '160px';

const PerformanceHolder = styled('div', {
  display: 'flex',
  height: RENDER_COUNT_HOLDER_HEIGHT,
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  color: globalStyles.color.lightBlue,
} as CSSType.Properties);

const CountCircleHolder = styled('div', {
  display: 'flex',
  width: LIST_VALUE_WIDTH,
  height: RENDER_COUNT_HOLDER_HEIGHT,
  alignItems: 'center',
  justifyContent: 'flex-end',
  borderRight: '1px solid #344256',
} as CSSType.Properties);

const renderCountSize = '140px';

const CountCircle = styled('div', {
  float: 'right',
  display: 'flex',
  width: renderCountSize,
  height: renderCountSize,
  borderRadius: renderCountSize,
  border: `1px solid ${globalStyles.color.lightBlue}`,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
  marginRight: '20px',
} as CSSType.Properties);

const clearRenderHistoryButtonSize = '30px';

const ClearRenderHistoryButton = styled('button', {
  width: clearRenderHistoryButtonSize,
  height: clearRenderHistoryButtonSize,
  position: 'absolute',
  top: '50%',
  right: `-${(getValueFromPixel(clearRenderHistoryButtonSize) / 2)}px`,
  marginTop: `-${(getValueFromPixel(clearRenderHistoryButtonSize) / 2)}px`,
  backgroundColor: globalStyles.color.primary,
  borderRadius: '50%',
  border: `1px solid ${globalStyles.color.lightBlue}`,
  cursor: 'pointer',
  fontSize: '16px',
  color: globalStyles.color.softWhite,
  transition: 'all 250ms',
  ':hover': {
    backgroundColor: globalStyles.color.secondary,
    transform: 'rotate(15deg)',
  },
  ':active': {
    backgroundColor: 'black',
  },
  ':focus': {
    outline: 0,
  },
} as CSSType.Properties);

const CountList = styled('div', () => ({
  display: 'flex',
  flex: 1,
  height: RENDER_COUNT_HOLDER_HEIGHT,
  overflowX: 'auto',
  alignItems: 'center',
  '::-webkit-scrollbar': {
    width: 0,
    height: 0,
    background: 'transparent',
  },
} as CSSType.Properties));

const CountListItem = styled('div', {
  display: 'flex',
  flex: '0 0 auto',
  width: '100px',
  height: RENDER_COUNT_HOLDER_HEIGHT,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRight: '1px solid #344256',
  position: 'relative',
  ':last-child': {
    border: 'none',
  },
} as CSSType.Properties);

const CountListItemValue = styled('div', {
  marginBottom: '10px',
});

const CountListItemTiming = styled('small', (props: any) => ({
  backgroundColor: props.$hasPerformanceIssue ? globalStyles.color.issue : '',
  color: props.$hasPerformanceIssue ? globalStyles.color.black : '',
  padding: '5px 8px',
  borderRadius: '25px',
}));

const CountListItemMilliseconds = styled('small', {
  position: 'absolute',
  bottom: '10px',
} as CSSType.Properties);

const CountCircleH1 = styled('h1', {
  color: 'white',
});

const formatPerformanceValue = (value: number, milliseconds: number) => {
  if (!milliseconds) {
    return millisecondsToSeconds(value);
  }

  return `${millisecondsToSeconds(value)}/${millisecondsToSeconds(milliseconds)}`;
}

type ListItemProps = BasePerformance & {
  onClearClick: () => void;
}

const ListItem = (props: ListItemProps) => {
  if (props.name === 'renderCount') {
    return (
      <ListHolder>
        <PerformanceHolder>
          <CountCircleHolder>
            <CountCircle>
              <CountCircleH1>{props.value}</CountCircleH1>
              <small>render</small>
              <h6>{millisecondsToSeconds(props.timing)}</h6>
              <ClearRenderHistoryButton onClick={props.onClearClick}>
                <Icon name="trash-o" addTopSpace/>
              </ClearRenderHistoryButton>
            </CountCircle>
          </CountCircleHolder>
          <CountList>
            {props.timeline.map((item, i) => {
              const performanceIssue = item.milliseconds && hasPerformanceIssue(item.timing, item.milliseconds);
              return (
                <CountListItem key={i}>
                  <CountListItemValue>{(i + 1)}</CountListItemValue>
                  <CountListItemTiming $hasPerformanceIssue={performanceIssue}>{millisecondsToSeconds(item.timing)}</CountListItemTiming>
                  {
                    item.milliseconds && performanceIssue &&
                    <CountListItemMilliseconds>({millisecondsToSeconds(item.milliseconds)})</CountListItemMilliseconds>
                  }
                </CountListItem>
              )
            })}
          </CountList>
        </PerformanceHolder>
      </ListHolder>
    )
  }
  return (
    <ListHolder>
      <ListValueHolder>
        <ListValue $hasPerformanceIssue={props.milliseconds && hasPerformanceIssue(props.value, props.milliseconds)}>
          {props.value && <small>{formatPerformanceValue(props.value, props.milliseconds)}</small>}
        </ListValue>
      </ListValueHolder>
      <ListName>
        {props.name}
      </ListName>
    </ListHolder>
  );
}

export default ListItem;