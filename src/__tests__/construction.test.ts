import { BigNumber } from '../index';

describe('BigNumber construction', () => {
  beforeEach(() => {
    BigNumber.TEST_BI_BASE(10);
  });
  describe('zero value', () => {
    it('toNumber()', () => {
      expect(new BigNumber().toNumber()).toEqual(0);
    });
    it('toString(0)', () => {
      expect(new BigNumber().toString(0)).toEqual('0');
    });
  });

  describe('pass positive Array value', () => {
    it('toNumber()', () => {
      expect(new BigNumber([2, 5, 7]).toNumber()).toEqual(75);
    });
    it('toString(0)', () => {
      expect(new BigNumber([2, 5, 7]).toString(0)).toEqual('2,5,7');
    });
  });
  describe('pass negetive Array value', () => {
    it('toNumber()', () => {
      expect(new BigNumber([-2, 5, 7]).toNumber()).toEqual(-75);
    });
    it('toString(0)', () => {
      expect(new BigNumber([-2, 5, 7]).toString(0)).toEqual('-2,5,7');
    });
  });
  describe('pass positive integer value', () => {
    it('toNumber()', () => {
      expect(new BigNumber(75).toNumber()).toEqual(75);
    });
    it('toString(0)', () => {
      expect(new BigNumber(75).toString(0)).toEqual('2,5,7');
    });
  });
  describe('pass negetive integer value', () => {
    it('toNumber()', () => {
      expect(new BigNumber(-75).toNumber()).toEqual(-75);
    });
    it('toString(0)', () => {
      expect(new BigNumber(-75).toString(0)).toEqual('-2,5,7');
    });
  });
  describe('from blank string', () => {
    it('constructor', () => {
      expect(new BigNumber('').toNumber()).toEqual(0);
    });
    it('parseString', () => {
      expect(BigNumber.parseString('').toString(0)).toEqual('0');
    });
  });
  describe('from decimal string', () => {
    it('constructor', () => {
      expect(new BigNumber('9').toNumber()).toEqual(9);
      expect(new BigNumber('-9').toNumber()).toEqual(-9);
    });
    it('parseString', () => {
      expect(BigNumber.parseString('9').toString(0)).toEqual('1,9');
      expect(BigNumber.parseString('999').toString(0)).toEqual('3,9,9,9');
      expect(BigNumber.parseString('-999').toString(0)).toEqual('-3,9,9,9');
    });
  });
  describe('from hexadecimal string', () => {
    it('parseString', () => {
      expect(BigNumber.parseString('16#FF').toNumber()).toEqual(255);
      expect(BigNumber.parseString('16#999').toString(0)).toEqual('4,7,5,4,2');
      expect(BigNumber.parseString('16#FFFFFFFFFFFFFFFFFFF').toString(0)).toEqual(
        '23,5,3,1,9,1,4,3,2,3,4,1,9,5,2,7,3,6,8,7,5,5,5,7'
      );
      expect(BigNumber.parseString('16#-999').toString(0)).toEqual('-4,7,5,4,2');
    });
  });
});
