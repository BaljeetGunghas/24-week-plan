// You are also spot-on about Buffers.

// The Logic: You are right—a Buffer is for the computer because it handles raw binary (0s and 1s).

// The "Why": Strings are UTF-16 encoded, which is heavy. For things like images, videos, or network packets, we don't need "letters"—we need raw bytes. Using Buffers is much faster and more memory-efficient.


// Part 1: The Sliding Window Logic (English Check)Before you write the code, let's practice your "Architect Voice."How to explain Sliding Window in an interview:"The sliding window pattern allows us to track a subset of data within an array without re-calculating the entire sum at every step. By adding the 'new' element entering the window and subtracting the 'old' element leaving it, we reduce the time complexity from $O(n^2)$ to $O(n)$."


// Part 2: The Challenge Code
// Here is the problem again: Find the Maximum Sum of k consecutive elements.
// Input: [2, 1, 5, 1, 3, 2], k = 3

// Steps for you:

// Calculate the sum of the first k elements (this is your first window).

// Create a loop that starts from index k.

// In each step: currentSum = currentSum - arr[i - k] + arr[i].

// Keep track of the maxSum.

// function maxSum(arr, k) {
//   let sum = 0;

//   if (arr.length < k) {
//     return "Invalid Input";
//   }
//   for (let i = 0; i < k; i++) {
//     sum += arr[i];
//   }
//   let i = k;
//   let temp = sum;
//   while (i < arr.length - 1) {
//     temp = temp - arr[i - k] + arr[i ];
//     if (temp > sum) {
//       sum = temp;
//     }

//     i++;
//   }
//   return sum;
// }

// let arr = [2, 1, 5, 1, 3, 2];
// let k = 3;

// time complexity will be O(N)
// space complexity will be O(1)
// console.log("max sum of all the " + k + " element is : ", maxSum(arr, k));




// Part 3: Node.js Buffer Experiment
// Since you're ready for the "low-level" stuff, try this small experiment in your Node terminal:

// const buf = Buffer.from("Hi Navi");
// console.log(buf); 
// console.log(buf.toString());
// console.log(buf.toJSON());

// <Buffer 48 69 20 4e 61 76 69>
// Hi Navi
// {
//   type: 'Buffer',
//   data: [
//     72, 105,  32, 78,
//     97, 118, 105
//   ]
// }

// Questions for you:

// Can you write the maxSubarraySum function using the sliding window?

// What did the buf.toJSON() show you? (Look at the "data" array in the output).

const fs = require('fs');

// This creates a "Readable Stream"
const reader = fs.createReadStream('large_file.txt', {
  highWaterMark: 16 * 1024 // This is the "Window Size" (16KB)
});

reader.on('data', (chunk) => {
  console.log('--- Received a new chunk (Buffer) ---');
  console.log(chunk.length); // See the size of the "window"
});