import * as React from 'react';
import { styled } from 'styletron-react';
import Icon from 'Common/Icon';
import CSSType from 'csstype';
import globalStyle from 'Common/Styles';

const Flash = styled(Icon, {
  fontSize: '10em',
  color: globalStyle.color.softWhite,
  position: 'absolute',
  top: '30%',
  opacity: 0.03,
} as CSSType.Properties);

export default () => <Flash name="flash" />