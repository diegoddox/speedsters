# JSNP

A simple way of tracking your react/react-native render/methods speed.

#### SETUP
In your main/root react file import `@jsnp/react` and initiate the connection.

##### React-js
```tsx
...
import ReactDOM from 'react-dom';
import jsnpr from '@jsnp/react';

const connectionOptions = {
  name: 'My Application name',
};
jsnpr.connect(connectionOptions);

```

##### React-Native
```tsx
...
import { AppRegistry, Platform} from 'react-native';
import jsnpr from '@jsnp/react';

const connectionOptions = {
  name: 'My Application name',

  /*
   * Since emulator on Android runs on it's own
   * VM we need to change the default host name
   * for the connection.
   * 
   * NOTE:
   * If you're using Expo may need to change to
   * another host.
   */
  host: Platform.select({
    ios: 'localhost',
    android: '10.0.2.2',
  }),
};


jsnpr.connect(connectionOptions);
```

#### Tracking
Once you've connected you're now able to track the performance
of you react/react-native class

```jsx
import React from 'react';
import jsnpr from '@jsnp/react';

export default class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    /*
     * Add this line to the constructor
     * and you're ready to GO!
     */
    const options = {
      excludes: {
        // Exclude this method.
        handlePushViewButton: true,
      },
      /*
       * 16 frame per second is the best performance you
       * can get for an react-native app
       */
      milliseconds: 16;
    };

    jsnpr.component(this, options);

    /*
     * Because this method is been bind on the constructor 
     * it will be measure by the Jsnpr.component.
     * 
     * NOTE: Arrow function will not be measured.
     */
    this.handleChangeViewButton = this.handleChangeViewButton.bind(this);
    this.handlePushViewButton = this.handlePushViewButton.bind(this);
  }

  handleChangeViewButton() {
    ...
  }

  handlePushViewButton() {
    ...
  }

  // Will not be measured
  handleEditButton = () => {
    ...
  };
}
```

#### THAT'S IT
And you're ready to rock! open the jsnp desktop application reload your
react/react-native app and all your performance measurement will show there.