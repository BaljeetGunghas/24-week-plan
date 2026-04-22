// Challenge 1: Write a function that takes an array and an index, removes the element at that index, and shifts everything else left without using built-in methods.

const removeIndexNumber = (arr, n) => {
  if (n > arr.length) {
    return "invalid input number";
  }
  arr.length = arr.length - 1;
  for (i = n; i <= arr.length; i++) {
    if (i < arr.length) {
      if (i === arr.length) {
        arr[i] = arr[i];
      } else {
        arr[i] = arr[i + 1];
      }
    }
  }

  return arr;
};

const array1 = [1, 2, 3];
const deleteItem1 = 4;

// console.log(removeIndexNumber(array1, deleteItem1));

// =======================================================================

const getPrefixSum = (arr) => {
  if (arr.length < 1) {
    return "provide a valid array";
  }
  if (arr.length === 1) {
    return arr;
  }
  const prefArray = [];
  prefArray[0] = arr[0];
  for (let i = 1; i < arr.length; i++) {
    prefArray[i] = prefArray[i - 1] + arr[i];
  }

  return prefArray;
};

// Time complexity will be O(N)
// Space complexity will be O(N)
const array2 = [1, 2, 3, 4, 5];

// console.log(getPrefixSum(array2));

// =======================================================================

// Implement the Second Largest number logic we discussed. Remember to handle the edge case where the current number is between the max and the secondMax.

function getSecondMax(arr) {
  if (arr.length < 2) {
    return "please provide valid array";
  }

  let max = arr[0];
  let secondmax = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const item = arr[i];
    if (item > max) {
      secondmax = max;
      max = item;
    } else if (item > secondmax) {
      secondmax = item;
    }

    // to handle duplicate
    //  if (item > max) {
    //   secondmax = max;
    //   max = item;
    // } else if (item > secondmax && item !== max) {
    //   secondmax = item;
    // }
  }

  return secondmax;
}

// Time complexity will be O(N)
// Space complexity will be O(1)
// console.log(array2);

// console.log(getSecondMax(array2));
// console.log("_______________________");
// const array3 = [23,43,35,74,75,34,65,64,74,33,55,75,65,33]
// console.log(getSecondMax(array3));

// =======================================================================

function moveZeroAtLast(arr) {
  if (arr.length === 1) {
    return arr;
  }
  let s = 0;
  let e = arr.length - 1;

  while (s < e) {
    if (arr[s] === 0) {
      const temp = arr[s];
      arr[s] = arr[e];
      arr[e] = temp;
      s++;
      e--;
    } else {
      s++;
    }
  }

  return arr;
}

// Time complexity will be O(N)
// Space complexity will be O(1)

const array4 = [0, 1, 0, 3, 12];

console.log(array4);

console.log(moveZeroAtLast(array4));
