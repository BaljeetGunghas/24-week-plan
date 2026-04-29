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

