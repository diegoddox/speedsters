import NPerformance from '.';

it('should contain a key timer with typeof number', () => {
  NPerformance.clear();

  const track = NPerformance.start('timer');
  track.stop();

  expect(typeof NPerformance.data.timer.value).toBe('number');
});

it('should contain the-nice-group as a Group', () => {
  const group = 'the-nice-group';
  const track = NPerformance.start('fetch-data', group);
  track.stop();

  expect(typeof NPerformance.data[group]).toBe('object');
});

it('should contain the-nice-group with a key fetch-post greater than 0', (done) => {
  NPerformance.clear();

  const group = 'the-nice-group';
  const key = 'fetch-post'
  const track = NPerformance.start(key, group);

  const secondTrackKey = 'niceComponent';
  const trackTwo = NPerformance.start(secondTrackKey, group);

  setTimeout(() => {
    track.stop();
    trackTwo.stop();

    const data = NPerformance.data;

    expect(data[group][key].value).toBeGreaterThan(0);
    expect(data[group][secondTrackKey].value).toBeGreaterThan(0);
    done();
  }, 1000);
});

it('should stop a performance by calling NPerformance.stop', () => {
  NPerformance.clear();

  const firstKey = 'add-data-action';
  const group = 'gets';
  const secondKey = 'get-comments-performance';

  NPerformance.start(firstKey);
  NPerformance.stop(firstKey);

  NPerformance.start(secondKey, group);
  NPerformance.stop(secondKey, group);

  const data:any = NPerformance.data;

  expect(typeof data[group]).toBe('object');
  expect(data[group][secondKey].value).toBeGreaterThan(0);
  expect(data[firstKey].value).toBeGreaterThan(0);
});
