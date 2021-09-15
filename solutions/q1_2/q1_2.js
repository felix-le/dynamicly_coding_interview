/* ********************** 
  QUESTION 1
  The function below takes in 2 arguments:  
  - items, an Array of Objects with the fields `name` (a String) and `value` (a Number); 
  - targetName, a String 
  Please rewrite this function so its body fits on a single line.
********************** */

/**
 * Represent a sum of all elements in an array of objects
 * @param {Array} items - an array of objects with the fields `name` (a String) and `value` (a Number)
 * @param {String} targetName - a name of the target object
 * @returns {Number} - the sum of all elements' value in the array
 * @example testArr for items
 */
function sumAllElementsByName(items, targetName) {
  let result = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].name === targetName) {
      result += items[i].value;
    }
  }
  return result;
}

// ES6 - reduce method

const testArr = [
  { name: 'a', value: 1 },
  { name: 'b', value: 2 },
  { name: 'c', value: 3 },
  { name: 'a', value: 4 },
  { name: 'b', value: 5 },
  { name: 'c', value: 6 },
];
/**
 * Represent a sum of all elements in an array of objects in single line
 * @param {Array} items - an array of objects - {Object.<string, number>} - an object with the fields `name` (a String) and `value` (a Number)
 * @param {String} targetName - a name of the target object
 * @returns {Number} - the sum of all elements in the array
 * @method {function reduce(total,currentValue, index,arr)} - reduce method
 */
function sumAllElementsByNameSingleLine(items, targetName) {
  return items.reduce(
    (acc, curr) => (curr.name === targetName ? acc + curr.value : acc),
    0
  );
}
const resultSingleLine = sumAllElementsByNameSingleLine(testArr, 'a');
/* ********************** 
  QUESTION 2

  Please rewrite the function from Question (1) so that, 
  instead of the sum of the `value` fields for items where `name` matches `targetName`, 
  it returns the average of the `value` fields for items where `name` matches `targetName`. 
********************** */
/**
 *
 * @param {Array} items
 * @param {string} targetName
 * @returns {Number} - the average of the `value` fields for items where `name` matches `targetName`.
 */
function averageAllElement(items, targetName) {
  return (
    sumAllElementsByNameSingleLine(items, targetName) /
    items.filter((item) => item.name === targetName).length
  );
}

console.log(averageAllElement(testArr, 'a'));

/* ********************** 
  QUESTION 3

  Please write JSDoc-compatible function documentation on the functions you wrote in Questions 1 & 2
********************** */
