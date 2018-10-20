import * as React from 'react';
import { styled } from "styletron-react";
import * as CSSType from 'csstype';
import globalStyles from 'Common/Styles';

export const HEIGHT = '40px';

const FooterHolder = styled('div', {
  display: 'flex',
  width: '100%',
  backgroundColor: globalStyles.color.primary,
  height: HEIGHT,
  borderTop: `1px solid ${globalStyles.color.mediumDarkBlue}`,
  borderBottomRightRadius: globalStyles.mainBorderRadius,
  borderBottomLeftRadius: globalStyles.mainBorderRadius,
  alignItems: 'center',
  justifyContent: 'center',
} as CSSType.Properties);

export default () => (
  <FooterHolder>
  </FooterHolder>
);