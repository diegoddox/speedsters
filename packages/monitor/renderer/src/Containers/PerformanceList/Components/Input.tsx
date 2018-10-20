import * as CSSType from 'csstype';
import { styled } from 'styletron-react';
import globalStyles from 'Common/Styles';

const HEIGHT = '40px';

export default styled('input', {
  height: HEIGHT,
  backgroundColor: globalStyles.color.mediumBlue,
  border: `1px solid ${globalStyles.color.mediumBlue}`,
  fontSize: '0.9em',
  padding: '0 20px',
  color: 'white',
  borderRadius: HEIGHT,
  ':focus': {
    outline: 0,
  },
  '::placeholder': {
    color: globalStyles.color.lightBlue,
  },
} as CSSType.Properties);