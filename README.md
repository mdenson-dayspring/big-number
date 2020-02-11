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

### constructor(number)
### constructor(string)
### constructor(BigNumber)

### BigNumber.parseString(string)

Scan the string number representation and return a BigNumber. The scanned string can have two forms 
based on the forms used for number literals in PostScript (but more relaxed). 

The first form is a string representing a decimal integer consisting of an optional sign followed by 
one or more decimal digits. The number is interpreted as a signed decimal integer and is converted 
to a BigNumber object. 

The second form is a string representing a radix number and takes the form _base_#_number_, where _base_ 
is a decimal integer in the range 2 through 36. The _number_ is then interpreted in this _base_; it must 
consist of an optional sign followed by digits ranging from 0 to _base_ - 1. Digits greater than 9 are 
represented by the letters A through Z (or a through z). The resulting number is treated as a signed integer 
and is converted to a BigNumber object. The notation is intended for specifying integers in a non-decimal 
radix, such as binary, octal, or hexadecimal.

### toNumber()
### toString(base, parsable)

Return text representation of the BigNumber object.

- _base_ is the base used to represent the integer value. _base_ is an integer in the range 2 through 36.
The default for _base_ is 10. 
- _parsable_ is an optional boolean value. If _parsable_ is true the output text representation will have 
the form _base_#_number_ (if _base_ != 10). If _parsable_ is false the output text representation will 
have the form _number_. The default for _parsable_ is false.

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
### divide()

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

* 1.0.2 Fourth Release 

    Completed implementation with division and string representation parsing and printing.

* 1.0.1 Third Release 

    Changed implementation to be be in Typescript. Updated to a hosted npm package.

* 0.2.0 Second Release 

    Completed Programming Praxis excercise "Big Numbers: Addition, 
    Subtraction, And Multiplication": May 31, 2011

* 0.1.0 First Release 

    Completed Programming Praxis excercise "Big Numbers: 
    Getting Started": May 24, 2011
