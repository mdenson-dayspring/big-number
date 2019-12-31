import { BigNumber } from '@dayspringpartners/big-number';

const oneThousand = new BigNumber(1000);
const bigger = new BigNumber(123456789);

console.log(bigger.add(oneThousand).toNumber());
console.log(oneThousand.add(5).toNumber());
console.log(oneThousand.subtract(oneThousand).toNumber());
