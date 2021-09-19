# dynamicly_coding_interview

Question 1:

- I used reducer for resolved the question

Question 2:

- I used reducer for resolved and dived the result

Question 3:

- I used [JSdoc](https://www.npmjs.com/package/jsdoc) for resolved the question (reference: https://www.npmjs.com/package/jsdoc)

Question 4:

- removed makeRequest function at the very beginning of the code (we don't have to use it for request api in this question)

**Class A**

- I changed the name of concatenameFields to concatenateString
- (function concatenateString) changed rest operator to value
- remove the static keyword before the function

**Class B**

- add supper() into constructor for extend properties from class A
- remove the static keyword before the function (this step - we cannot call the static concatenateString functon from other class)

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.distance; //undefined
p2.distance; //undefined

console.log(Point.distance(p1, p2)); // 7.0710678118654755
```

Question 5:

I have not used RxJS for coding before, so, I am not sure that my answer is correct. However, I tried to follow step by step from finding out its affect, then its cause and solution. I hope you would enjoy my answer. Thank you for giving me a reason to learn RxJS and understand more about observables, observer and subscription.
