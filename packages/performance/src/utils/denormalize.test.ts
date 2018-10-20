import denormalize from './denormalize';
import NPerformance from '../development';

it('should de-normalize performance data', () => {
  class NiceComponent {
    constructor() {
      NPerformance.reactComponent(this);
    }
    componentDidMount() {}
    render() {}
  }

  const fakeComponent = new NiceComponent();
  fakeComponent.componentDidMount();
  fakeComponent.render();
  fakeComponent.render();

  const fetchPostsPerformance = NPerformance.start('fetch-posts');
  const fetchCommentsPerformance = NPerformance.start('fetch-comments');

  fetchCommentsPerformance.stop();
  fetchPostsPerformance.stop();
  fakeComponent.render();

  fakeComponent.render();

  const data = denormalize(NPerformance.data);

  expect(Array.isArray(data)).toBe(true);

  // The Component performance
  const componentPerformance = data[0];
  expect(Array.isArray(componentPerformance.data)).toBe(true);
  expect(componentPerformance.name).toBe('NiceComponent');
  expect(Array.isArray(componentPerformance.data[0].timeline)).toBe(true);
  expect(componentPerformance.data[0].timeline.length).toBe(4);
  expect(componentPerformance.data[0].timeline[0].value).toBe(1);
  expect(componentPerformance.data[0].timeline[0].timing).toBeGreaterThanOrEqual(0);
})