import {DurationPipe} from '../app/modules/core/pipes/duration.pipe';

describe('DurationPipeTitleCasePipe', () => {
  let pipe = new DurationPipe();

  it('transforms "30" to "30min"', () => {
    expect(pipe.transform(30)).toBe('30min');
  });

  it('transforms "60" to "1h"', () => {
    expect(pipe.transform(60)).toBe('1h');
  });

  it('transforms "601" to "1h 1min"', () => {
    expect(pipe.transform(601)).toBe('10h 1min');
  });
});
