// let i = 1;

// for (i;i <= 3; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }, 1000);
// }

const nums = [2, 7, 11, 15];
const target = 9;

function twoSumSorted(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  // since we have shorted array so we have idea we have to increase left or decrease right
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return null;
}

console.log(twoSumSorted(nums, target)); // Expected: [0, 1]
