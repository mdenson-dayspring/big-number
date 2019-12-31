import { BigNumber } from '../index';

describe('BigNumber predicates', () => {
  beforeEach(() => {
    BigNumber.TEST_BI_BASE(10);
  });
  it('negetive number', () => {
    const negNumber = new BigNumber(-636);
    expect(negNumber.sign()).toEqual(-1);
    expect(negNumber.isNeg()).toBeTruthy();
    expect(negNumber.isPos()).not.toBeTruthy();
    expect(negNumber.isZero()).not.toBeTruthy();
  });
  it('positive number', () => {
    const posNumber = new BigNumber(1636);
    expect(posNumber.sign()).toEqual(1);
    expect(posNumber.isNeg()).not.toBeTruthy();
    expect(posNumber.isPos()).toBeTruthy();
    expect(posNumber.isZero()).not.toBeTruthy();
  });
  it('zero', () => {
    const zeroNumber = new BigNumber(0);
    expect(zeroNumber.sign()).toEqual(0);
    expect(zeroNumber.isNeg()).not.toBeTruthy();
    expect(zeroNumber.isPos()).not.toBeTruthy();
    expect(zeroNumber.isZero()).toBeTruthy();
    expect(zeroNumber.isEven()).toBeTruthy();
    expect(zeroNumber.isOdd()).not.toBeTruthy();
  });

  it('even', () => {
    const evenNumber1 = new BigNumber(636);
    const evenNumber2 = new BigNumber(-67856);
    expect(evenNumber1.isEven()).toBeTruthy();
    expect(evenNumber1.isOdd()).not.toBeTruthy();
    expect(evenNumber2.isEven()).toBeTruthy();
    expect(evenNumber2.isOdd()).not.toBeTruthy();
  });
  it('odd', () => {
    const oddNumber1 = new BigNumber(635);
    const oddNumber2 = new BigNumber(-67851);
    expect(oddNumber1.isEven()).not.toBeTruthy();
    expect(oddNumber1.isOdd()).toBeTruthy();
    expect(oddNumber2.isEven()).not.toBeTruthy();
    expect(oddNumber2.isOdd()).toBeTruthy();
  });
});
