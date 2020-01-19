import { BigNumber } from '../index';

describe('BigNumber arithmetic', () => {
  beforeEach(() => {});
  describe('all positive numbers', () => {
    it('division 0 / 2', () => {
      testBases(0, 2, 0, 0);
    });
    it('division 41 / 1', () => {
      testBases(41, 1, 41, 0);
    });
    it('division -41 / 1', () => {
      testBases(-41, 1, -41, 0);
    });
    it('division 41 / -1', () => {
      testBases(41, -1, -41, 0);
    });
    it('division -41 / -1', () => {
      testBases(-41, -1, 41, 0);
    });
    it('division 41 / 2', () => {
      testBases(41, 2, 20, 1);
    });
    it('division 40 / 2', () => {
      testBases(40, 2, 20, 0);
    });
    it('division -40 / 2', () => {
      testBases(-40, 2, -20, 0);
    });
    it('division 40 / -2', () => {
      testBases(40, -2, -20, 0);
    });
    it('division -40 / -2', () => {
      testBases(-40, -2, 20, 0);
    });
    it('division 41 / 20', () => {
      testBases(41, 20, 2, 1);
    });
    it('division 50 / 20', () => {
      testBases(50, 20, 2, 10);
    });
    it('division 50025 / 20', () => {
      testBases(50025, 20, 2501, 5);
    });
    it('division 30 / 15', () => {
      testBases(30, 15, 2, 0);
    });
    it('division 998001 / 999', () => {
      BigNumber.TEST_BI_BASE(5000);
      expect(new BigNumber(998001).divide(999)[0].toString(0)).toEqual('1,999');
    });
  });
});

const testBases = (numerator: number, denominator: number, expQuotient: number, expRemainder: number) => {
  let q: BigNumber;
  let r: BigNumber;

  BigNumber.TEST_BI_BASE(4);
  [q, r] = new BigNumber(numerator).divide(new BigNumber(denominator));
  expect(q.toNumber()).toEqual(expQuotient);
  expect(r.toNumber()).toEqual(expRemainder);
  expect(r).toEqual(new BigNumber(expRemainder));

  BigNumber.TEST_BI_BASE(8);
  [q, r] = new BigNumber(numerator).divide(new BigNumber(denominator));
  expect(q.toNumber()).toEqual(expQuotient);
  expect(r.toNumber()).toEqual(expRemainder);
  expect(r).toEqual(new BigNumber(expRemainder));

  BigNumber.TEST_BI_BASE(10);
  [q, r] = new BigNumber(numerator).divide(new BigNumber(denominator));
  expect(q.toNumber()).toEqual(expQuotient);
  expect(r.toNumber()).toEqual(expRemainder);
  expect(r).toEqual(new BigNumber(expRemainder));

  BigNumber.TEST_BI_BASE(16);
  [q, r] = new BigNumber(numerator).divide(new BigNumber(denominator));
  expect(q.toNumber()).toEqual(expQuotient);
  expect(r.toNumber()).toEqual(expRemainder);
  expect(r).toEqual(new BigNumber(expRemainder));

  BigNumber.TEST_BI_BASE(128);
  [q, r] = new BigNumber(numerator).divide(new BigNumber(denominator));
  expect(q.toNumber()).toEqual(expQuotient);
  expect(r.toNumber()).toEqual(expRemainder);
  expect(r).toEqual(new BigNumber(expRemainder));
};
