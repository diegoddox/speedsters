import * as React from 'react';
import Logo from 'Common/Logo';
import { styled } from 'styletron-react';
import * as CSSType from 'csstype';
import globalStyle, { preventUserSelection } from 'Common/Styles';

const Holder = styled('div', {
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

const NoConnection = () => (
  <>
    <Logo />
    <Holder>
      <Info>Looks like we're not able to connect to any @speedsters package, reload your application in order to re-connect</Info>
    </Holder>
  </>
);

export default NoConnection;