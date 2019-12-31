import { BigNumber } from '../index';

describe('BigNumber construction zero value', () => {
  let testValue: BigNumber;
  beforeEach(() => {
    BigNumber.TEST_BI_BASE(10);
    testValue = new BigNumber();
  });
  it('toNumber()', () => {
    expect(testValue.toNumber()).toEqual(0);
  });
  it('toString()', () => {
    expect(testValue.toString()).toEqual('0');
  });
});

describe('BigNumber construction pass positive Array value', () => {
  let testValue: BigNumber;
  beforeEach(() => {
    BigNumber.TEST_BI_BASE(10);
    testValue = new BigNumber([2, 5, 7]);
  });
  it('toNumber()', () => {
    expect(testValue.toNumber()).toEqual(75);
  });
  it('toString()', () => {
    expect(testValue.toString()).toEqual('2,5,7');
  });
});
describe('BigNumber construction pass negetive Array value', () => {
  let testValue: BigNumber;
  beforeEach(() => {
    BigNumber.TEST_BI_BASE(10);
    testValue = new BigNumber([-2, 5, 7]);
  });
  it('toNumber()', () => {
    expect(testValue.toNumber()).toEqual(-75);
  });
  it('toString()', () => {
    expect(testValue.toString()).toEqual('-2,5,7');
  });
});
describe('BigNumber construction pass positive integer value', () => {
  let testValue: BigNumber;
  beforeEach(() => {
    BigNumber.TEST_BI_BASE(10);
    testValue = new BigNumber(75);
  });
  it('toNumber()', () => {
    expect(testValue.toNumber()).toEqual(75);
  });
  it('toString()', () => {
    expect(testValue.toString()).toEqual('2,5,7');
  });
});
describe('BigNumber construction pass negetive integer value', () => {
  let testValue: BigNumber;
  beforeEach(() => {
    BigNumber.TEST_BI_BASE(10);
    testValue = new BigNumber(-75);
  });
  it('toNumber()', () => {
    expect(testValue.toNumber()).toEqual(-75);
  });
  it('toString()', () => {
    expect(testValue.toString()).toEqual('-2,5,7');
  });
});
