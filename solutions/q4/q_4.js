/* ********************** 
  QUESTION 4

  a) What is wrong in the method `concatenameFields` of class `A` ?  How would you fix it?
  b) Please fix the code in classes `A` and `B` so that testQuestion4() resolves to `true`
  c) Please add JSDoc-compatible documentation to all methods in classes `A` and `B`
********************** */

/**
 * Class representing a joining array into string
 * @constructor
 * @function concatenateString
 * @function save
 */
class A {
  constructor(someField) {
    this._someField = someField;
    this._separator = ' ';
  }

  concatenateString(values) {
    return values.join(this._separator);
  }

  async save(items) {
    try {
      const values = items.map((item) => item.name);
      const finalValue = await this.concatenateString(values);
      return 'THE RESULT IS: ' + finalValue;
    } catch (err) {
      console.log(err);
    }
  }
}

/**
 * @constructor
 * @augments A
 * @override
 */
class B extends A {
  constructor() {
    super();
    this._separator = '-';
  }

  concatenateString(...values) {
    return `[${super.concatenateString(...values)}]`;
  }
}
const testInput = [
  { name: 'this' },
  { name: 'test' },
  { name: 'is' },
  { name: 'fun' },
];

async function testQuestion4() {
  try {
    const a = new A('base A');
    const b = new B('base B');

    const aResult = await a.save(testInput);
    const bResult = await b.save(testInput);

    console.log('aResult', aResult);
    console.log('bResult', bResult);

    const aIsOK = aResult === 'THE RESULT IS: this test is fun';
    const bIsOK = bResult === 'THE RESULT IS: [this-test-is-fun]';
    console.log(aIsOK, bIsOK);
    return aIsOK && bIsOK;
  } catch (error) {
    console.log('🚀 ~ file: q_4.js ~ line 56 ~ testQuestion4 ~ error', error);
  }
}
testQuestion4();
