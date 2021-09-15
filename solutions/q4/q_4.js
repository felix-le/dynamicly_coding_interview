// This function will have a side effect and return its input
const makeRequest = require('some-request-library');

class A {
  constructor(someField) {
    this._someField = someField;
    this._separator = ' ';
  }

  static concatenameFields(...values) {
    return [this._someField, ...values].join(this._separator);
  }

  async save(items) {
    const values = items.map({ name } => name);
    const finalValue = this.concatenameFields(values);
    const result = await makeRequest(finalValue);
    return `THE RESULT IS: ${result}`;
  }
}

class B extends A {
  constructor() {
    this._separator = '-';
  }

  static concatenameFields(...values) {
    return `[${super.concatenameFields(...values)}]`;
  }
}

async function testQuestion4() {
  const testInput = [
    { name: 'this' },
    { name: 'test' },
    { name: 'is' },
    { name: 'fun' },
  ];

  const a = new A('base A');
  const b = new B('base B');

  const aResult = await a.save(testInput);
  const bResult = await b.save(testInput);

  const aIsOK = aResult === 'THE RESULT IS: this test is fun';
  const bIsOK = bResult === 'THE RESULT IS: [this-test-is-fun]';

  return aIsOK && bIsOK;
}
