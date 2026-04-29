// The Task: Find the length of the smallest subarray where the sum is $\ge 7$.

// Input: arr = [2, 3, 1, 2, 4, 3], target = 7

// Write the code for smallestSubarray(target, arr) below.

// let arr = [2, 3, 1, 2, 4, 3];
// let target = 7;

// function smallestSubarray(target, arr) {
//   let smallestSubArraylength = arr.length;

//   for (let i = 0; i < arr.length - 1; i++) {
//     let tempsum = arr[i];
//     let k = i + 1;

//     while (k < arr.length) {
//       tempsum += arr[k];

//       if (tempsum >= target) {
//         break;
//       }
//       k++;
//     }

//     let subArrayLength = k - i + 1;

//     if (subArrayLength < smallestSubArraylength) {
//       smallestSubArraylength = subArrayLength;
//     }
//   }

//   return smallestSubArraylength;
// }

// // TC : O(N2)
// // SC : O(1)
// console.log(smallestSubarray(target, arr));

// 3. Node.js Connection: The "HighWaterMark"
// You mentioned handling API integration at work. When you use fs.createReadStream, Node.js uses a "fixed window" called the highWaterMark (usually 64KB) to read chunks.

// But imagine if you were building a Search API that looks for a specific keyword in a giant text file. You would use a Variable Window logic to read the stream and only "keep" the data in memory until you find the keyword.

// Better approch

let arr = [2, 3, 1, 2, 4, 3];
let target = 7;

function smallestSubarray(target, arr) {
  let smallestSubArraylength = Infinity;
  let windowSum = 0;
  let left = 0;

  for (let right = 0; right < arr.length; right++) {
    windowSum += arr[right];

    while (windowSum >= target) {
      let windowLenght = right - left + 1;
      smallestSubArraylength = Math.min(smallestSubArraylength, windowLenght);

      windowSum -= arr[left];
      left++;
    }
  }

  return smallestSubArraylength === Infinity ? 0 : smallestSubArraylength;
}

// TC : O(N)
// SC : O(1)
console.log(smallestSubarray(target, arr));

// Why this is better:
// Time Complexity: $O(n)$. Even though there is a while inside a for, the left pointer and right pointer each only travel the array once.
// Space Complexity: $O(1)$.


// AI Tokens & The Variable Window
// You asked about the cost of tokens in AI. This is actually a very "Senior Developer" topic!

// The Concept:
// AI models (like the ones you use at the office) have a Context Window (a limit on how many tokens they can "read" at once). Every token costs money.

// The Problem: If a user has a very long chat history, sending all of it to the AI is expensive and might exceed the limit.

// The Variable Window Solution: You can use a sliding window to only send the most recent or relevant "chunks" of the conversation.

// The "Target": Instead of a sum of numbers, your "target" is the Maximum Token Limit.

// The "Shrink": As the user sends a new message (expanding the window), you remove the oldest message from the top (shrinking the window) to keep the total token count under the limit.

// This saves money (token cost) and keeps the AI fast!


// Homework for your 15-minute Micro-learning tomorrow:
// Look up the difference between:

// Readable Streams (e.g., Reading a file)

// Writable Streams (e.g., Writing to a database)

// Pipe (e.g., Connecting a file read directly to a network response)