import { BigNumber } from '../index';

describe('BigNumber comparison', () => {
  beforeEach(() => {
    BigNumber.TEST_BI_BASE(10);
  });
  describe('eq() and ne()', () => {
    it('same sign - equal', () => {
      const left = new BigNumber(34);
      expect(left.compareTo(34)).toBe(0);
      expect(left.compareTo(new BigNumber(34))).toBe(0);
      expect(left.eq(34)).toBeTruthy();
      expect(left.ne(34)).not.toBeTruthy();
      expect(left.lt(34)).not.toBeTruthy();
      expect(left.le(34)).toBeTruthy();
      expect(left.gt(34)).not.toBeTruthy();
      expect(left.ge(34)).toBeTruthy();
    });
    it('same sign - not equal', () => {
      const left = new BigNumber(34);
      expect(left.compareTo(43)).toBe(-1);
      expect(left.compareTo(new BigNumber(43))).toBe(-1);
      expect(left.eq(43)).not.toBeTruthy();
      expect(left.ne(43)).toBeTruthy();
      expect(left.lt(43)).toBeTruthy();
      expect(left.le(43)).toBeTruthy();
      expect(left.gt(43)).not.toBeTruthy();
      expect(left.ge(43)).not.toBeTruthy();
    });
    it('different sign - not equal', () => {
      const left = new BigNumber(34);
      expect(left.compareTo(-34)).toBe(1);
      expect(left.compareTo(new BigNumber(-34))).toBe(1);
      expect(left.eq(-34)).not.toBeTruthy();
      expect(left.ne(-34)).toBeTruthy();
      expect(left.lt(-34)).not.toBeTruthy();
      expect(left.le(-34)).not.toBeTruthy();
      expect(left.gt(-34)).toBeTruthy();
      expect(left.ge(-34)).toBeTruthy();
    });
  });
});
