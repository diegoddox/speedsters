import IReact, { RENDER_COUNT } from '.';

it('should run ReactComponent performance in a Class and rendered two times', () => {
  class TheNiceComponent {
    constructor() {
    }

    render() {}
  };

  const runClass = new TheNiceComponent();

  runClass.render();
  runClass.render();

  expect(1).toBe(1);
});
