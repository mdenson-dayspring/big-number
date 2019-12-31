import { BigNumber } from '../index';

describe('BigNumber unary math', () => {
  beforeEach(() => {
    BigNumber.TEST_BI_BASE(10);
  });
  it('negetive number', () => {
    const negNumber = new BigNumber(-636);
    expect(negNumber.abs().toNumber()).toEqual(636);
    expect(negNumber.neg().toNumber()).toEqual(636);
    expect(negNumber.abs()).not.toBe(negNumber);
    expect(negNumber.neg()).not.toBe(negNumber);
  });
  it('positive number', () => {
    const posNumber = new BigNumber(636);
    expect(posNumber.abs().toNumber()).toEqual(636);
    expect(posNumber.neg().toNumber()).toEqual(-636);
    expect(posNumber.abs()).not.toBe(posNumber);
    expect(posNumber.neg()).not.toBe(posNumber);
  });
  it('zero number', () => {
    const zeroNumber = new BigNumber(0);
    expect(zeroNumber.abs().toNumber()).toEqual(0);
    expect(zeroNumber.neg().toNumber()).toEqual(0);
    expect(zeroNumber.abs()).not.toBe(zeroNumber);
    expect(zeroNumber.neg()).not.toBe(zeroNumber);
  });
});
