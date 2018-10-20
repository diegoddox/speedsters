import * as React from 'react'
import '../../Assets/icons.svg';

type IconTypes =
  'atom' |
  'stats-bars' |
  'flash' |
  'lightning-1' |
  'android-close' |
  'magnifying-glass' |
  'android-remove' |
  'caret-up' |
  'albums-outline' |
  'android-add' |
  'square-o' |
  'search' |
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