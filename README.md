Big Integer library module
==========================

A library providing a arbitrary length integer implementation for Node and browser javascript coding.  
This library was put together as an implementation of [Programming Praxis "Big Number" exercises in 2011](https://programmingpraxis.com/2011/05/31/big-numbers-addition-subtraction-and-multiplication/).

`
@dayspringpartners/big-number
`

# Installation

    npm install @dayspringpartners/big-number --save

# Usage

In Typescript
```
import { BigNumber } from '@dayspringpartners/big-number';

const oneThousand = new BigNumber(1000);
const bigger = new BigNumber(123456789);

console.log(bigger.add(oneThousand).toNumber());
console.log(oneThousand.add(5).toNumber());
console.log(oneThousand.subtract(oneThousand).toNumber());
```

In Javascript
```
const BigNumber = require('@dayspringpartners/big-number').BigNumber;

var oneThousand = new BigNumber(1000);
var bigger = new BigNumber(123456789);

console.log(bigger.add(oneThousand).toNumber());
console.log(oneThousand.add(5).toNumber());
console.log(oneThousand.subtract(oneThousand).toNumber());
```

## Methods

### toNumber()
### toString()

### isZero()
### isNeg()
### isPos()
### isEven()
### isOdd()

### compareTo()
### eq()
### ne()
### lt()
### gt()
### le()
### ge()

### abs()
### neg()
### sign()
### add()
### subtract()
### multiply()

# Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Install for development
```
$ git clone ....
$ npm install
```

## Start testing with watch
```
$ npm run test:watch
```

## Test, Lint and format
```
$ npm run test
$ npm run lint
$ npm run format
```

## increment version (up-to-date working directory)
```
$ npm verion patch|minor|major
```

## publish new version to npm
```
# have an up-to-date working directory
$ npm verion patch|minor|major
$ npm login
$ npm publish
```

# Release History

* 1.0.1 Third Release 

    Changed implementation to be be in Typescript. Updated to a hosted npm package.

* 0.2.0 Second Release 

    Completed Programming Praxis excercise "Big Numbers: Addition, 
    Subtraction, And Multiplication": May 31, 2011

* 0.1.0 First Release 

    Completed Programming Praxis excercise "Big Numbers: 
    Getting Started": May 24, 2011
