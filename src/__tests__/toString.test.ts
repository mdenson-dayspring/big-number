import { BigNumber } from '../index';

describe('BigNumber toString', () => {
  beforeEach(() => {});
  describe('Simple test', () => {
    it('radix 10', () => {
      expect(new BigNumber(1).toString()).toEqual('1');
      expect(new BigNumber(11).toString()).toEqual('11');
      expect(new BigNumber('1234567890123456789').toString()).toEqual('1234567890123456789');
    });
    it('radix 16', () => {
      expect(new BigNumber(1).toString(16)).toEqual('1');
      expect(new BigNumber(11).toString(16)).toEqual('B');
      expect(BigNumber.parseString('16#1234567890abcdef').toString(16)).toEqual('1234567890ABCDEF');
      expect(new BigNumber('1234567890123456789').toString(16)).toEqual('112210F47DE98115');
      expect(new BigNumber('16#112210F47DE98115').toString(10)).toEqual('1234567890123456789');
      expect(new BigNumber('1234567890123456789').toString(16, true)).toEqual('16#112210F47DE98115');
      expect(BigNumber.parseString('16#112210F47DE98115').toString(10)).toEqual('1234567890123456789');
      expect(BigNumber.parseString('16#112210F47DE98115').toString(10, true)).toEqual('1234567890123456789');
    });
    it('radix 36', () => {
      expect(new BigNumber(1).toString(36)).toEqual('1');
      expect(new BigNumber(1).toString(36, true)).toEqual('36#1');
      expect(new BigNumber(11).toString(36, false)).toEqual('B');
      expect(new BigNumber(11).toString(36, true)).toEqual('36#B');
      expect(new BigNumber(35).toString(36)).toEqual('Z');
      expect(new BigNumber(36).toString(36)).toEqual('10');
      expect(new BigNumber(37).toString(36)).toEqual('11');
      expect(BigNumber.parseString('36#1234 5678 90ab cdef').toString(36)).toEqual('1234567890ABCDEF');
      expect(new BigNumber('1,234,567,890,123,456,789').toString(36)).toEqual('9DO1SJ396NF9');
      expect(BigNumber.parseString('36#9DO1SJ396NF9').toString(10)).toEqual('1234567890123456789');
    });
  });
});
