import { UppercaseCustomPipe } from './uppercase.pipe';

describe('UppercasePipe', () => {
  it('create an instance', () => {
    const pipe = new UppercaseCustomPipe();
    expect(pipe).toBeTruthy();
  });
});
