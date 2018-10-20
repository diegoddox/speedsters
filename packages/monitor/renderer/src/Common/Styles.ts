import * as CSSType from 'csstype';

export const ellipsis: CSSType.Properties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const preventUserSelection: CSSType.Properties  = {
  userSelect: 'none',
  cursor: 'default',
}

export default {
  color: {
    primary: '#2e3b4e',
    secondary: '#1f2a38',
    third: '#344256',
    darkBlue: '#202a38',
    mediumBlue: '#313f53',
    lightBlue: '#5d789e',
    softWhite: '#adbace',
    black: '#333',
    issue: '#fdd408',
    mediumDarkBlue: '#2a3648',
  },
  mainBorderRadius: '10px',
  tinySpace: '5px',
  smallSpace: '10px',
  mediumSpace: '20px',
  largeSpace: '40px',
}