//check to see if it's empty or not!!
//the validator isEmpty(str) method
//just checks to see if a string is empty.
//this one here is for an object (json)

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export default isEmpty;
