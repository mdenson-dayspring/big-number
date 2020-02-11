import { isArray, isString } from 'util';

export class BigNumber {
  public static TEST_BI_BASE = (val: number) => {
    BigNumber.BI_BASE = val;
  };

  public static parseString = (str: string): BigNumber => {
    let outValue = new BigNumber(0);
    const scanned = BigNumber.scanString(str);
    const radix = scanned.radix;
    const text = scanned.text;

    let sign = 1;
    if (text !== '') {
      [...text].forEach((char, ndx) => {
        const val = BigNumber.CHARS.indexOf(char.toUpperCase());
        if (ndx === 0 && val === -1 && char === '-') {
          sign = -1;
        } else if (val >= 0) {
          outValue = outValue.multiply(radix).add(val);
        }
      });
    }
    if (sign === -1) {
      outValue = outValue.neg();
    }
    return outValue;
  };

  private static BI_BASE = 0x4000000; // 2^26 so there is not overflow in multiplication in the JS 2^53 ints
  private static CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private static scanString = (str: string): { radix: number; text: string } => {
    let radix = 10;
    const ndx = str.indexOf('#');
    if (ndx > -1) {
      radix = Number(str.substr(0, ndx));
    }
    return { radix, text: str.substr(ndx + 1) };
  };
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

  // Array of integer digits plus a sign
  //  [+/- length, least significant digit, ..., most significant digit]
  private value: number[];

  constructor(inVal?: string | number | number[] | BigNumber) {
    if (inVal) {
      if (inVal instanceof BigNumber) {
        this.value = inVal.value.slice(0);
      } else if (isArray(inVal)) {
        this.value = inVal;
      } else if (isString(inVal)) {
        this.value = BigNumber.parseString(inVal).value;
      } else {
        this.value = BigNumber.parseInput(inVal);
      }
    } else {
      this.value = [0];
    }
  }

  /**
   * Right now this is outputing the default string output for the underlying array.
   */
  public toString(inRadix?: number, parsable?: boolean): string {
    let radix = inRadix;
    if (radix === undefined) {
      radix = 10;
    }
    let prefix = '';
    if (parsable !== undefined && parsable && radix !== 10) {
      prefix = String(radix) + '#';
    }

    if (radix === 0) {
      return this.value.toString();
    } else {
      let tmp = new BigNumber(this);
      let remainder: BigNumber;
      let ret: string = '';
      while (tmp.ne(0)) {
        [tmp, remainder] = tmp.divide(radix);
        ret = BigNumber.CHARS[remainder.toNumber()] + ret;
      }
      return prefix + ret;
    }
  }
  /**
   * Of course the danger is that this will overflow.
   */
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
        return new BigNumber(this.addAlg(thisv, otherv));
      } else {
        return new BigNumber(this.addAlg(otherv, thisv));
      }
    } else if (thisv[0] <= 0 && otherv[0] <= 0) {
      // Sum of two negative addends
      thisv[0] = -1 * thisv[0];
      otherv[0] = -1 * otherv[0];
      let sumv: number[];
      if (thisv[0] >= otherv[0]) {
        sumv = this.addAlg(thisv, otherv);
      } else {
        sumv = this.addAlg(otherv, thisv);
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
        diffv = this.subtractAlg(absthis.value, absother.value);
      } else {
        diffv = this.subtractAlg(absother.value, absthis.value);
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
        productv = this.multiplyAlg(multiplier, multiplicand);
      }
      if (this.sign() !== other.sign()) {
        productv[0] = -1 * productv[0];
      }
    }
    return new BigNumber(productv);
  }
  public divide(denominator: number | BigNumber): BigNumber[] {
    if (!(denominator instanceof BigNumber)) {
      denominator = new BigNumber(denominator);
    }

    let quotient: number[];
    let remainder: number[];
    if (this.eq(0)) {
      [quotient, remainder] = [[0], [0]];
    } else if (denominator.eq(0)) {
      [quotient, remainder] = [[NaN], [0]];
    } else if (denominator.abs().eq(1)) {
      [quotient, remainder] = [this.value.slice(0), [0]];
      quotient[0] = quotient[0] * denominator.sign();
    } else {
      [quotient, remainder] = this.divideAlg(this.abs().value.slice(0), denominator.abs().value.slice(0));
      if (this.sign() !== denominator.sign()) {
        quotient[0] = -1 * quotient[0];
      }
    }

    return [new BigNumber(quotient), new BigNumber(remainder)];
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
  private addAlg(addend1: number[], addend2: number[]): number[] {
    const sum: number[] = [];
    sum.push(addend1[0]);
    let carry = 0;
    for (let i = 1; i <= addend1[0]; i++) {
      const a1 = addend1[i];
      const a2 = addend2.length > i ? addend2[i] : 0;
      const s = a1 + a2 + carry;
      sum.push(s % BigNumber.BI_BASE);
      carry = s >= BigNumber.BI_BASE ? 1 : 0;
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
  private subtractAlg(minuend: number[], subtrahend: number[]): number[] {
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
  /**
   * Multiply using Algorithm M (Multiplication of nonnegative integers)
   *  from Volume 2: Seminumerical Algorithms,
   *       Chapter 4.3.1: Multiple-Precision Arithmetic : The Classical Algorithms
   *    of The Art of Computer Programming by Donald Knuth
   *
   *   Assume multiplicand is the longer array of digits
   * @param multiplier: number[] Array of digits [length, least sig digit, ..., most sig digit]
   * @param multiplicand: number[] Array of digits [length, least sig digit, ..., most sig digit]
   * @return number[]
   */
  private multiplyAlg(multiplier: number[], multiplicand: number[]): number[] {
    const m = multiplier[0];
    const n = multiplicand[0];
    // M0. [Initialize]
    const product: number[] = [m + n];
    for (let i = 1; i <= product[0]; i++) {
      product.push(0);
    }
    for (let j = 1; j <= m; j++) {
      // M2. [zero multiplier?]
      if (multiplier[j] === 0) {
        product[j] = 0;
      } else {
        // M3. [initialize i]
        let k = 0;
        for (let i = 1; i <= n; i++) {
          // M4. [Multiply and add]
          const t = multiplicand[i] * multiplier[j] + product[i + j - 1] + k;
          product[i + j - 1] = t % BigNumber.BI_BASE;
          k = Math.floor(t / BigNumber.BI_BASE); // 0 <= k <= b

          // M5. [loop on i]
        }
        product[n + j] = k;
      }

      // M6. [Loop on j]
    }

    // trim 0s in most common digits from representation
    for (let i = m + n; i > 0; i--) {
      if (product[i] === 0) {
        product[0]--;
        product.pop();
      } else {
        break;
      }
    }
    return product;
  }
  /**
   * Divide using Algorithm D (Division of nonnegative integers)
   *  from Volume 2: Seminumerical Algorithms,
   *       Chapter 4.3: Multiple-Precision Arithmetic
   *    of The Art of Computer Programming by Donald Knuth
   *
   * @returns Array with quotient in index 0 and remainder in index 1
   */
  private divideAlg(numerator: number[], denominator: number[]): number[][] {
    // D0. Define (not actually part of Knuth algorithm)
    let U = numerator;
    let V = denominator;
    let Q: number[] = [];
    let R: number[] = [];
    const B = BigNumber.BI_BASE;
    const n = V[0];
    const m = U[0] - n;
    Q.push(m + 1);
    for (let i = 0; i < m + 1; i++) {
      Q.push(0);
    }
    R.push(n);
    for (let i = 0; i < n; i++) {
      R.push(0);
    }

    // D1. Normalize
    const D = V[n] < B / 2 ? Math.trunc(B / 2 / V[n]) : 1;
    // const D = 4;
    U = this.multiplyAlg([1, D], U);
    if (U[0] < m + n + 1) {
      U.push(0);
    }
    V = this.multiplyAlg([1, D], V);

    // D2. initialize j / D7. loop on j
    for (let j = m + 1; j > 0; j--) {
      // D3. calculate Q' - Qprime
      const Num1 = U[n + j] * B + U[n - 1 + j];
      let Q1 = Math.trunc(Num1 / V[n]);
      let R1 = Num1 % V[n];

      while (R1 < B && (Q1 === B || (n - 1 > 0 && Q1 * V[n - 1] > R1 * B + U[n - 2 + j]))) {
        Q1 = Q1 - 1;
        R1 = R1 + V[n];
      }
      const Qfull = [j];
      for (let i = 1; i < j; i++) {
        Qfull.push(0);
      }
      Qfull.push(Q1);

      // D4. Multiply and subtract
      const midprod = this.multiplyAlg(V, Qfull);
      U = this.subtractAlg(U, midprod);
      for (let i = U[0] + 1; i <= m + n + 1; i++) {
        U.push(0);
      }

      // D5. Test remainder
      Q[j] = Q1;
    }

    // D8. Unnormalize
    let remainder = 0;
    for (let i = R[0]; i > 0; i--) {
      R[i] = Math.trunc((remainder * B + U[i]) / D);
      remainder = (remainder * B + U[i]) % D;
    }
    // trim zeros in most significant digits
    let end = 0;
    for (let i = R.length - 1; i >= 0; i--) {
      if (R[i] !== 0) {
        end = i;
        break;
      }
    }
    R = R.slice(0, end + 1);
    R[0] = R.length - 1;

    end = 0;
    for (let i = Q.length - 1; i >= 0; i--) {
      if (Q[i] !== 0) {
        end = i;
        break;
      }
    }
    Q = Q.slice(0, end + 1);
    Q[0] = Q.length - 1;

    return [Q, R];
  }
}
