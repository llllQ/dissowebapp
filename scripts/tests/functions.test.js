const functions = require("../functions");

test("Adds 2 + 2 to equal 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});

//toBe test
test("Adds 2 + 2 to not equal 5", () => {
  expect(functions.add(2, 2)).not.toBe(5);
});

// toBeNull matches only null
// toBeUndefined matches only undefined
// toBeDefined is the opposite of toBeUndefined
// toBeTruthy matches anything that an if statement treats as true
// toBeFalsy matches anything that an if statement treats as false

//toBeNull test
test("Should be null", () => {
  expect(functions.isNull()).toBeNull();
});

//toBeFalsy test
test("Should be falsy", () => {
  expect(functions.checkValue(0)).toBeFalsy();
});

//toEqual test (as an Object is not a primitive)
test("User should be Matt Penlington Object", () => {
  expect(functions.createUser()).toEqual({
    firstName: "Matt",
    lastName: "Penlington"
  });
});
