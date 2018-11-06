# Speedsters

A simple way of tracking your react/react-native render/methods speed.

#### SETUP
In your main/root react file import `@speedsters/react` and initiate the connection.

##### React-js
```tsx
...
import ReactDOM from 'react-dom';
import sreact from '@speedsters/react';

const connectionOptions = {
  name: 'My Application name',
};
sreact.connect(connectionOptions);

```

##### React-Native
```tsx
...
import { AppRegistry, Platform} from 'react-native';
import sreact from '@speedsters/react';

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


sreact.connect(connectionOptions);
```

#### Tracking
Once you've connected you're now able to track the performance
of you react/react-native class

```jsx
import React from 'react';
import sreact from '@speedsters/react';

export default class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const options = {
      excludes: {
        // Exclude this method.
        handlePushViewButton: true,
      },
      // specify the performance that you wanna this component to have
      milliseconds: 16;
    };

    sreact.classComponent(this, options);

    /*
     * Because those methods are been bind in the constructor 
     * it will be measure by the sreact.classComponent.
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

  // Arrow function will not be measured.
  handleEditButton = () => {
    ...
  };
}
```

#### THAT'S IT
And you're ready to rock! open the speedsters desktop application reload your
react/react-native app and all your performance measurement will show there.