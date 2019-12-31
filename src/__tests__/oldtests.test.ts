import { BigNumber } from '../index';

describe('#factory BigNumber()', () => {
  beforeEach(() => {
    BigNumber.TEST_BI_BASE(1000);
  });
  it('null input', () => {
    expect(new BigNumber().toString()).toEqual('0');
  });
  it('BigNumber input', () => {
    expect(new BigNumber(new BigNumber(1)).toString()).toEqual('1,1');
  });
  it('javascript numbers input', () => {
    expect(new BigNumber(0).toString()).toEqual('0');
    expect(new BigNumber(1).toString()).toEqual('1,1');
    expect(new BigNumber(-1).toString()).toEqual('-1,1');
    expect(new BigNumber(100).toString()).toEqual('1,100');
    expect(new BigNumber(-100).toString()).toEqual('-1,100');
    expect(new BigNumber(999).toString()).toEqual('1,999');
    expect(new BigNumber(-999).toString()).toEqual('-1,999');
    expect(new BigNumber(1000).toString()).toEqual('2,0,1');
    expect(new BigNumber(-1000).toString()).toEqual('-2,0,1');
    expect(new BigNumber(123456789).toString()).toEqual('3,789,456,123');
  });
});

describe('#conversion', () => {
  it('to javascript numbers', () => {
    expect(new BigNumber(0).toNumber()).toEqual(0);
    expect(new BigNumber(1).toNumber()).toEqual(1);
    expect(new BigNumber(-1).toNumber()).toEqual(-1);
    expect(new BigNumber(100).toNumber()).toEqual(100);
    expect(new BigNumber(-100).toNumber()).toEqual(-100);
    expect(new BigNumber(999).toNumber()).toEqual(999);
    expect(new BigNumber(-999).toNumber()).toEqual(-999);
    expect(new BigNumber(1000).toNumber()).toEqual(1000);
    expect(new BigNumber(-1000).toNumber()).toEqual(-1000);
    expect(new BigNumber(123456789).toNumber()).toEqual(123456789);
  });
});

describe('#methods', () => {
  it('abs', () => {
    expect(new BigNumber(0).abs().toNumber()).toEqual(0);
    expect(new BigNumber(1).abs().toNumber()).toEqual(1);
    expect(new BigNumber(-1).abs().toNumber()).toEqual(1);
    expect(new BigNumber(123456789).abs().toNumber()).toEqual(123456789);
    expect(new BigNumber(-123456789).abs().toNumber()).toEqual(123456789);
  });
  it('neg', () => {
    expect(new BigNumber(0).neg().toNumber()).toEqual(0);
    expect(new BigNumber(1).neg().toNumber()).toEqual(-1);
    expect(new BigNumber(-1).neg().toNumber()).toEqual(1);
    expect(new BigNumber(123456789).neg().toNumber()).toEqual(-123456789);
    expect(new BigNumber(-123456789).neg().toNumber()).toEqual(123456789);
  });
  it('sign', () => {
    expect(new BigNumber(0).sign()).toEqual(0);
    expect(new BigNumber(1).sign()).toEqual(1);
    expect(new BigNumber(1000).sign()).toEqual(1);
    expect(new BigNumber(-1).sign()).toEqual(-1);
    expect(new BigNumber(-1000).sign()).toEqual(-1);
  });
  it('add - positive addends', () => {
    expect(new BigNumber(1234).add(1834).toNumber()).toEqual(3068);
    expect(new BigNumber(234).add(1834).toNumber()).toEqual(2068);
    expect(new BigNumber(1234).add(834).toNumber()).toEqual(2068);
    expect(new BigNumber(234).add(834).toNumber()).toEqual(1068);
    expect(new BigNumber(1234).add(0).toNumber()).toEqual(1234);
    expect(new BigNumber(0).add(999).toNumber()).toEqual(999);
  });
  it('add - negative addends', () => {
    expect(new BigNumber(-1234).add(-1834).toNumber()).toEqual(-3068);
    expect(new BigNumber(-234).add(-1834).toNumber()).toEqual(-2068);
    expect(new BigNumber(-1234).add(-834).toNumber()).toEqual(-2068);
    expect(new BigNumber(-234).add(-834).toNumber()).toEqual(-1068);
    expect(new BigNumber(-1234).add(0).toNumber()).toEqual(-1234);
    expect(new BigNumber(0).add(-999).toNumber()).toEqual(-999);
  });
  it('add - mixed sign addends', () => {
    expect(new BigNumber(-1).add(1).toNumber()).toEqual(0);

    expect(new BigNumber(-1).add(1834).toNumber()).toEqual(1833);
    expect(new BigNumber(-234).add(1834).toNumber()).toEqual(1600);
    expect(new BigNumber(-999).add(2000).toNumber()).toEqual(1001);

    expect(new BigNumber(1).add(-1834).toNumber()).toEqual(-1833);
    expect(new BigNumber(234).add(-1834).toNumber()).toEqual(-1600);
    expect(new BigNumber(999).add(-2000).toNumber()).toEqual(-1001);

    expect(new BigNumber(-999999).add(1000000).toString()).toEqual('1,1');
    expect(new BigNumber(999).add(-1000).toString()).toEqual('-1,1');
  });
  it('subtract', () => {
    expect(new BigNumber(1).subtract(1).toNumber()).toEqual(0);

    expect(new BigNumber(1834).subtract(1).toNumber()).toEqual(1833);
    expect(new BigNumber(1834).subtract(234).toNumber()).toEqual(1600);
    expect(new BigNumber(2000).subtract(999).toNumber()).toEqual(1001);

    expect(new BigNumber(1).subtract(1834).toNumber()).toEqual(-1833);
    expect(new BigNumber(234).subtract(1834).toNumber()).toEqual(-1600);
    expect(new BigNumber(999).subtract(2000).toNumber()).toEqual(-1001);

    expect(new BigNumber(1000000).subtract(999999).toString()).toEqual('1,1');
    expect(new BigNumber(999).subtract(1000).toString()).toEqual('-1,1');

    // check that synonym exists
    expect(new BigNumber(1).sub(1).toNumber()).toEqual(0);
  });
  it('multiply', () => {
    expect(new BigNumber(0).multiply(1000).toNumber()).toEqual(0);
    expect(new BigNumber(1000).multiply(0).toNumber()).toEqual(0);
    expect(new BigNumber(1).multiply(1).toNumber()).toEqual(1);
    expect(new BigNumber(-1).multiply(-1).toNumber()).toEqual(1);
    expect(new BigNumber(-1).multiply(1).toNumber()).toEqual(-1);
    expect(new BigNumber(1).multiply(-1).toNumber()).toEqual(-1);
    expect(new BigNumber(400).multiply(2).toString()).toEqual('1,800');
    expect(new BigNumber(500).multiply(2).toString()).toEqual('2,0,1');
    expect(new BigNumber(999).multiply(999).toString()).toEqual('2,1,998');
    expect(new BigNumber(999999).multiply(999999).toString()).toEqual('4,1,0,998,999');

    // check that synonyms exists
    expect(new BigNumber(0).mul(1000).toNumber()).toEqual(0);
    expect(new BigNumber(0).times(1000).toNumber()).toEqual(0);
  });
});

describe('#comparison', () => {
  it('compareTo(BigNumber)', () => {
    expect(new BigNumber(0).compareTo(new BigNumber(0))).toEqual(0);
    expect(new BigNumber(1).compareTo(new BigNumber(0))).toEqual(1);
    expect(new BigNumber(0).compareTo(new BigNumber(1))).toEqual(-1);

    expect(new BigNumber(1).compareTo(new BigNumber(1))).toEqual(0);
    expect(new BigNumber(2).compareTo(new BigNumber(1))).toEqual(1);
    expect(new BigNumber(1).compareTo(new BigNumber(2))).toEqual(-1);

    expect(new BigNumber(1000).compareTo(new BigNumber(1000))).toEqual(0);
    expect(new BigNumber(1000).compareTo(new BigNumber(1))).toEqual(1);
    expect(new BigNumber(1).compareTo(new BigNumber(1000))).toEqual(-1);

    expect(new BigNumber(-1000).compareTo(new BigNumber(-1000))).toEqual(0);
    expect(new BigNumber(-1001).compareTo(new BigNumber(-1000))).toEqual(1);
    expect(new BigNumber(-1000).compareTo(new BigNumber(-1001))).toEqual(-1);

    expect(new BigNumber(-1).compareTo(new BigNumber(1))).toEqual(-1);
    expect(new BigNumber(1).compareTo(new BigNumber(-1))).toEqual(1);

    expect(new BigNumber(123456789).compareTo(new BigNumber(987654321))).toEqual(-1);
    expect(new BigNumber(121111111).compareTo(new BigNumber(111111111))).toEqual(1);
    expect(new BigNumber(111121111).compareTo(new BigNumber(111111111))).toEqual(1);
    expect(new BigNumber(111111121).compareTo(new BigNumber(111111111))).toEqual(1);
    expect(new BigNumber(111111111).compareTo(new BigNumber(121111111))).toEqual(-1);
    expect(new BigNumber(111111111).compareTo(new BigNumber(111121111))).toEqual(-1);
    expect(new BigNumber(111111111).compareTo(new BigNumber(111111121))).toEqual(-1);
  });
  it('compareTo(int)', () => {
    expect(new BigNumber(0).compareTo(0)).toEqual(0);
    expect(new BigNumber(1).compareTo(0)).toEqual(1);
    expect(new BigNumber(0).compareTo(1)).toEqual(-1);

    expect(new BigNumber(1).compareTo(1)).toEqual(0);
    expect(new BigNumber(2).compareTo(1)).toEqual(1);
    expect(new BigNumber(1).compareTo(2)).toEqual(-1);

    expect(new BigNumber(1000).compareTo(1000)).toEqual(0);
    expect(new BigNumber(1000).compareTo(1)).toEqual(1);
    expect(new BigNumber(1).compareTo(1000)).toEqual(-1);

    expect(new BigNumber(-1000).compareTo(-1000)).toEqual(0);
    expect(new BigNumber(-1001).compareTo(-1000)).toEqual(1);
    expect(new BigNumber(-1000).compareTo(-1001)).toEqual(-1);

    expect(new BigNumber(-1).compareTo(1)).toEqual(-1);
    expect(new BigNumber(1).compareTo(-1)).toEqual(1);

    expect(new BigNumber(123456789).compareTo(987654321)).toEqual(-1);
    expect(new BigNumber(121111111).compareTo(111111111)).toEqual(1);
    expect(new BigNumber(111121111).compareTo(111111111)).toEqual(1);
    expect(new BigNumber(111111121).compareTo(111111111)).toEqual(1);
    expect(new BigNumber(111111111).compareTo(121111111)).toEqual(-1);
    expect(new BigNumber(111111111).compareTo(111121111)).toEqual(-1);
    expect(new BigNumber(111111111).compareTo(111111121)).toEqual(-1);
  });
  it('eq and ne', () => {
    expect(new BigNumber(0).eq(0)).toEqual(true);
    expect(new BigNumber(1).eq(0)).toEqual(false);
    expect(new BigNumber(0).eq(1)).toEqual(false);

    expect(new BigNumber(0).ne(0)).toEqual(false);
    expect(new BigNumber(1).ne(0)).toEqual(true);
    expect(new BigNumber(0).ne(1)).toEqual(true);
  });
  it('lt and le', () => {
    expect(new BigNumber(0).lt(0)).toEqual(false);
    expect(new BigNumber(1).lt(0)).toEqual(false);
    expect(new BigNumber(0).lt(1)).toEqual(true);

    expect(new BigNumber(0).le(0)).toEqual(true);
    expect(new BigNumber(1).le(0)).toEqual(false);
    expect(new BigNumber(0).le(1)).toEqual(true);
  });
  it('gt and ge', () => {
    expect(new BigNumber(0).gt(0)).toEqual(false);
    expect(new BigNumber(1).gt(0)).toEqual(true);
    expect(new BigNumber(0).gt(1)).toEqual(false);

    expect(new BigNumber(0).ge(0)).toEqual(true);
    expect(new BigNumber(1).ge(0)).toEqual(true);
    expect(new BigNumber(0).ge(1)).toEqual(false);
  });
});

describe('#predicates', () => {
  it('isZero', () => {
    expect(new BigNumber(0).isZero()).toEqual(true);
    expect(new BigNumber(1).isZero()).toEqual(false);
  });
  it('isNeg', () => {
    expect(new BigNumber(0).isNeg()).toEqual(false);
    expect(new BigNumber(1).isNeg()).toEqual(false);
    expect(new BigNumber(-1).isNeg()).toEqual(true);
  });
  it('isPos', () => {
    expect(new BigNumber(0).isPos()).toEqual(false);
    expect(new BigNumber(1).isPos()).toEqual(true);
    expect(new BigNumber(-1).isPos()).toEqual(false);
  });
  it('isEven', () => {
    expect(new BigNumber(0).isEven()).toEqual(true);
    expect(new BigNumber(1).isEven()).toEqual(false);
    expect(new BigNumber(-1).isEven()).toEqual(false);
    expect(new BigNumber(2).isEven()).toEqual(true);
    expect(new BigNumber(-2).isEven()).toEqual(true);
  });
  it('isOdd', () => {
    expect(new BigNumber(0).isOdd()).toEqual(false);
    expect(new BigNumber(1).isOdd()).toEqual(true);
    expect(new BigNumber(-1).isOdd()).toEqual(true);
    expect(new BigNumber(2).isOdd()).toEqual(false);
    expect(new BigNumber(-2).isOdd()).toEqual(false);
  });
});
