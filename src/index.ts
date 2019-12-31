import { isArray } from 'util';

export class BigNumber {
  public static TEST_BI_BASE = (val: number) => {
    BigNumber.BI_BASE = val;
  };
  private static BI_BASE = 0x4000000; // 2^26 so there is not overflow in multiplication in the JS 2^53 ints
  private static parseInput = (invalue: number | BigNumber): number[] => {
    let outvalue: number[] = [];
    if (invalue instanceof BigNumber) {
      outvalue = invalue.value.slice(0);
    } else if (invalue === 0) {
      outvalue.push(0);
    } else {
      const negate = invalue < 0;
      if (negate) {
        invalue = -1 * invalue;
      }

      while (invalue > 0) {
        if (invalue < BigNumber.BI_BASE) {
          outvalue.push(invalue);
          invalue = 0;
        } else {
          outvalue.push(invalue % BigNumber.BI_BASE);
          invalue = Math.floor(invalue / BigNumber.BI_BASE);
        }
      }

      let count = outvalue.length;
      if (negate) {
        count = -1 * count;
      }
      outvalue.unshift(count);
    }
    return outvalue;
  };

  // some synonms
  public sub = this.subtract;
  public mul = this.multiply;
  public times = this.multiply;

  private value: number[];

  constructor(inVal?: number | number[] | BigNumber) {
    if (inVal) {
      if (isArray(inVal)) {
        this.value = inVal;
      } else {
        this.value = BigNumber.parseInput(inVal);
      }
    } else {
      this.value = [0];
    }
  }

  public toString(): string {
    return this.value.toString();
  }
  public toNumber(): number {
    if (this.value[0] === 0) {
      return 0;
    } else {
      let out = 0;
      for (let i = Math.abs(this.value[0]); i >= 1; i--) {
        out = out * BigNumber.BI_BASE + this.value[i];
      }

      if (this.value[0] < 0) {
        out = -1 * out;
      }
      return out;
    }
  }

  // simple predicates
  public isNeg(): boolean {
    return this.sign() < 0;
  }
  public isPos(): boolean {
    return this.sign() > 0;
  }
  public isZero(): boolean {
    return this.sign() === 0;
  }
  public isEven(): boolean {
    return this.sign() === 0 || this.value[1] % 2 === 0;
  }
  public isOdd(): boolean {
    return !this.isEven();
  }

  // comparison methods
  public sign(): number {
    if (this.value[0] < 0) {
      return -1;
    } else if (this.value[0] > 0) {
      return 1;
    } else {
      return 0;
    }
  }
  public compareTo(other: number | BigNumber): number {
    if (!(other instanceof BigNumber)) {
      other = new BigNumber(other);
    }
    let result = this.compareInts(this.value[0], other.value[0]);
    if (result === 0) {
      for (let i = Math.abs(this.value[0]); i >= 1 && result === 0; i--) {
        result = this.compareInts(this.value[i], other.value[i]);
      }
    }
    return result;
  }
  public eq(other: number | BigNumber): boolean {
    return this.compareTo(other) === 0;
  }
  public ne(other: number | BigNumber): boolean {
    return this.compareTo(other) !== 0;
  }
  public lt(other: number | BigNumber): boolean {
    return this.compareTo(other) < 0;
  }
  public le(other: number | BigNumber): boolean {
    return this.compareTo(other) <= 0;
  }
  public gt(other: number | BigNumber): boolean {
    return this.compareTo(other) > 0;
  }
  public ge(other: number | BigNumber): boolean {
    return this.compareTo(other) >= 0;
  }

  // simple math methods
  public abs(): BigNumber {
    const value = this.value.slice(0);
    value[0] = Math.abs(value[0]);
    return new BigNumber(value);
  }
  public neg(): BigNumber {
    const value = this.value.slice(0);
    value[0] = -1 * value[0];
    return new BigNumber(value);
  }

  // arithmetic methods
  public add(other: number | BigNumber): BigNumber {
    if (!(other instanceof BigNumber)) {
      other = new BigNumber(other);
    }

    const thisv = this.value.slice(0);
    const otherv = other.value.slice(0);

    if (thisv[0] >= 0 && otherv[0] >= 0) {
      // Sum of two positive addends
      if (thisv[0] >= otherv[0]) {
        return new BigNumber(this.sum(thisv, otherv));
      } else {
        return new BigNumber(this.sum(otherv, thisv));
      }
    } else if (thisv[0] <= 0 && otherv[0] <= 0) {
      // Sum of two negative addends
      thisv[0] = -1 * thisv[0];
      otherv[0] = -1 * otherv[0];
      let sumv: number[];
      if (thisv[0] >= otherv[0]) {
        sumv = this.sum(thisv, otherv);
      } else {
        sumv = this.sum(otherv, thisv);
      }
      sumv[0] = -1 * sumv[0];
      return new BigNumber(sumv);
    } else {
      // Sum of two addends with different signs
      const absthis = this.abs();
      const absother = other.abs();
      if (absother.eq(absthis)) {
        return new BigNumber(0);
      }

      const thisNeg = this.isNeg();
      const thisGT = absthis.gt(absother);

      let diffv: number[];
      if (thisGT) {
        diffv = this.diff(absthis.value, absother.value);
      } else {
        diffv = this.diff(absother.value, absthis.value);
      }

      if ((thisNeg && thisGT) || (!thisNeg && !thisGT)) {
        diffv[0] = -1 * diffv[0];
      }
      return new BigNumber(diffv);
    }
  }

  public subtract(other: number | BigNumber): BigNumber {
    if (!(other instanceof BigNumber)) {
      other = new BigNumber(other);
    }
    return this.add(other.neg());
  }

  public multiply(other: number | BigNumber): BigNumber {
    if (!(other instanceof BigNumber)) {
      other = new BigNumber(other);
    }

    let productv: number[] = [];
    if (this.eq(0) || other.eq(0)) {
      productv = [0];
    } else {
      const thisabs = this.abs();
      const otherabs = other.abs();

      if (thisabs.eq(1)) {
        productv = otherabs.value.slice(0);
      } else if (otherabs.eq(1)) {
        productv = thisabs.value.slice(0);
      } else {
        let multiplier: number[];
        let multiplicand: number[];
        if (thisabs.value[0] > otherabs.value[0]) {
          multiplier = otherabs.value.slice(0);
          multiplicand = thisabs.value.slice(0);
        } else {
          multiplier = thisabs.value.slice(0);
          multiplicand = otherabs.value.slice(0);
        }
        productv.push(0);
        for (let i = 1; i <= multiplier[0]; i++) {
          const tmp = [multiplicand[0] + (i - 1)];
          for (let p = 1; p < i; p++) {
            tmp.push(0);
          }
          for (let j = 1; j <= multiplicand[0]; j++) {
            tmp.push(multiplier[i] * multiplicand[j]);
          }
          productv = this.sum(tmp, productv);
        }
      }
      if (this.sign() !== other.sign()) {
        productv[0] = -1 * productv[0];
      }
    }
    return new BigNumber(productv);
  }

  private compareInts(thisv: number, otherv: number): number {
    if (thisv === otherv) {
      return 0;
    } else if (thisv < otherv) {
      return -1;
    } else {
      return 1;
    }
  }
  /*
   * assumes that the addends are positive
   * and that addend1 has the same or more digits
   */
  private sum(addend1: number[], addend2: number[]): number[] {
    const sum: number[] = [];
    sum.push(addend1[0]);
    let carry = 0;
    for (let i = 1; i < addend1[0] + 1; i++) {
      const a1 = addend1[i];
      const a2 = addend2.length > i ? addend2[i] : 0;
      const s = a1 + a2 + carry;
      sum.push(s % BigNumber.BI_BASE);
      carry = Math.floor(s / BigNumber.BI_BASE);
    }
    if (carry > 0) {
      sum[0]++;
      sum.push(carry);
    }
    return sum;
  }

  /*
   * assumes that the minuend is larger that the subtrahend
   */
  private diff(minuend: number[], subtrahend: number[]): number[] {
    const diff: number[] = [];
    diff.push(minuend[0]);
    let carry = 0;
    for (let i = 1; i < minuend[0] + 1; i++) {
      const m = minuend[i];
      const s = subtrahend.length > i ? subtrahend[i] : 0;
      const d = m - carry - s;
      if (d < 0) {
        diff.push(d + BigNumber.BI_BASE);
        carry = 1;
      } else {
        diff.push(d);
        carry = 0;
      }
    }
    for (let i = diff.length - 1; i >= 1 && diff[i] === 0; i--) {
      diff[0]--;
    }
    return diff.slice(0, diff[0] + 1);
  }
}
