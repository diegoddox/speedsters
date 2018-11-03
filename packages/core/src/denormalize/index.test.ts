import denormalize from '.';
import sperformance from '@speedsters/performance';

it('should de-normalize performance data', () => {
  const fetchPostKey = 'fetch-post';
  sperformance.start(fetchPostKey);
  sperformance.stop(fetchPostKey);

  const denormalized = denormalize(sperformance.data);
  
  expect(Array.isArray(denormalized)).toBe(true);
  expect(denormalized[0].name).toBe(fetchPostKey);
  expect(denormalized[0].value).toBeGreaterThanOrEqual(0);
});