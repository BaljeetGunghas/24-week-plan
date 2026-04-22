// The Problem: "Find the maximum sum of 3 consecutive numbers in this array."
const nums = [2, 1, 5, 1, 3, 2];

function maxSubarraySum(arr, k) {
  if (arr.length < k) return null;

  let maxSum = 0;
  let tempSum = 0;

  for (let i = 0; i < k; i++) {
    maxSum += arr[i];
  }
  let s = 1;
  let e = k;

  while (e < arr.length) {
    tempSum = maxSum - arr[s - 1] + arr[e];
    console.log(maxSum , arr[s - 1] , arr[e],e);
    
    if (tempSum > maxSum) {
      maxSum = tempSum;
    }
    
    tempSum = 0;
    e++;
    s++;
}

  return maxSum;
}
// Time complexity will be O(N)
// Space complexity will be O(1)
console.log(maxSubarraySum(nums, 3));
