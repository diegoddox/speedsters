<h1 align="center">
<br>
  <a href="https://github.com/diegoddox/speedsters/releases">
    <img
      src="https://github.com/diegoddox/speedsters/blob/develop/docs/images/speedsters-128.png"
      alt="speedsters performance"
    />
  </a>
  <br />
  <br />
  Speedsters
  <br />
</h1>

## What is Speedsters?

A macOS, Windows, and Linux app for inspecting your javascript, [React JS](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/) performance.

## Motivation/Why?
While developing on a React-native application I notice that once the application becomes large the Chrome Devtools
starts to be very slowly and hard to debug the performance and the rendering of each view, so I decided to create a Desktop
Application that could help with that, not to mention that testing on the emulator is fine but you should always test on a
real device and with this Application, you can connect via your network and see the performance of your react-native App

##### The Speedsters desktop app on the left, React Web-app in the middle and a React-Native App on the right
<img src="./docs/images/speedsters-demo-app.gif" alt="speedsters desktop app demo" width="100%" height="100%" />

## Documentation

* [Installing](./docs/instalation.md)
* Quick start for [React JS/React-Native](./packages/react)
* Quick start for [Javascript](./packages/performance)
* [Release Notes](https://github.com/reactotron/reactotron/releases)
* [Contributing](./docs/contributing.md)

## Built With
1. [Speedsters desktop App](./packages/monitor) build with Electron.
2. [@speedsters/core](./packages/core) dependence free.
3. [@speedsters/react](./packages/react) dependence free.
4. [@speedsters/performance](./packages/performance) dependence free.

## License
This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.
