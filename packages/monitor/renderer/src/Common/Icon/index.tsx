import * as React from 'react'
import '../../Assets/icons.svg';

type IconTypes =
  'flash' |
  'android-close' |
  'android-remove' |
  'android-add' |
  'fontawesome-webfont' |
  'square-o' |
  'trash-o' |
  'react-icon' |
  'magnifying-glass';

type Props = {
  name: IconTypes;
  className?: string;
  addTopSpace?: boolean;
}

export default (props: Props) => (
  <svg className={`icon icon-${props.name} ${props.className && props.className} ${props.addTopSpace && 'icon-top-space'}`}>
    <use xlinkHref={`#icons_icon-${props.name}`} />
  </svg>
);