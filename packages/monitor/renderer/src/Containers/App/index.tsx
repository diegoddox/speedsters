import * as React from 'react';
import { Provider } from 'react-redux';
import { Provider as StyletronProvider, styled } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import PerformanceList from '../PerformanceList';
import TitleBar from '../TitleBar';
import Footer from 'Common/Footer';
import configureStore from './configure-store';
import { connectSocketAction } from '../Socket/reducer';
import styles from 'Common/Styles';
import './base.css';

const store = configureStore();
const engine = new Styletron();

store.dispatch(connectSocketAction);

const Main = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  height: '100vh',
  backgroundColor: styles.color.primary,
  overflow: 'hidden',
});

export default () => (
  <Provider store={store}>
    <StyletronProvider value={engine}>
      <Main>
        <TitleBar />
        <PerformanceList />
        <Footer />
      </Main>
    </StyletronProvider>
  </Provider>
);