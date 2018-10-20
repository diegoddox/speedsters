import * as React from 'react';
import { styled } from 'styletron-react';
import * as CSSType from 'csstype';

const Container = styled('div', {
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  flex: 1,
  zIndex: 0,
  position: 'relative',
} as CSSType.Properties);

export default ({ children }: any) => <Container>{children}</Container>;