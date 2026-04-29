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

// let arr = [2, 3, 1, 2, 4, 3];
// let target = 7;

// function smallestSubarray(target, arr) {
//   let smallestSubArraylength = Infinity;
//   let windowSum = 0;
//   let left = 0;

//   for (let right = 0; right < arr.length; right++) {
//     windowSum += arr[right];

//     while (windowSum >= target) {
//       let windowLenght = right - left + 1;
//       smallestSubArraylength = Math.min(smallestSubArraylength, windowLenght);

//       windowSum -= arr[left];
//       left++;
//     }
//   }

//   return smallestSubArraylength === Infinity ? 0 : smallestSubArraylength;
// }

// // TC : O(N)
// // SC : O(1)
// console.log(smallestSubarray(target, arr));

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

// ---------------------------------------
// The goal for you:
//  Find the length of the Longest subarray whose sum is less than or equal to a target (e.g., target = 7).

// let arr = [1, 2, 3, 1, 2, 1];
// let arr = [1, 1, 1, 10, 1];
// let target = 5;

// function longestSubArray(target, arr) {
//   let maxSubArrayLength = -Infinity;
//   let windowSum = 0;
//   let left = 0;

//   for (let right = 0; right < arr.length; right++) {
//     windowSum += arr[right];

//     while (windowSum >= target) {
//       let windowLenght = right - left + 1;

//       maxSubArrayLength = Math.max(maxSubArrayLength, windowLenght);

//       windowSum -= arr[left];
//       left++;
//     }
//   }

//   return maxSubArrayLength === -Infinity ? 0 : maxSubArrayLength;
// }

// // // TC : O(N)
// // // SC : O(1)
// console.log(longestSubArray(target, arr));

// 2. while vs if: Why the loop is safer
// To answer your question: Yes, in many cases for "Longest" problems, an if might work, but a while is "Interview-Proof."

// Here is why:

// The "Multiple Elements" Problem: Imagine your target is 5 and your window sum is 4. You add a new element that is 10. Now your sum is 14.

// An if would only remove one element from the left. Your sum might still be 11 (still over the target!). The window is still "invalid."

// A while loop keeps shrinking until the window is guaranteed to be valid again.

// Professional Tip: Using while shows the interviewer you understand that one single "shrink" might not be enough to fix a broken constraint.


// 4. English & Communication
// When an interviewer asks: "Why use a while loop here?" You should say: > "I use a while loop to ensure the window remains valid according to the constraint. Even if a very large number enters the window, the while loop will continue to shrink the left boundary until the condition is met again, all while maintaining an $O(n)$ amortized time complexity."

// The Two Big Improvements
// 1. The Shrinking Condition
// In your code, you used while (windowSum >= target).
//
// Problem: This shrinks the window as soon as you hit the target. For "Longest," you want to keep growing as long as you are under or equal to the target.
//
// Fix: Only shrink when you break the rule (i.e., while (windowSum > target)).
//
// 2. Where to Measure the Length
// In your code, you measured the length inside the while loop.
//
// Problem: The while loop is for shrinking. You want to measure your "record-breaking" length when the window is valid and as large as possible.
//
// Fix: Measure the length after the while loop finishes.es.

// let arr = [1, 2, 3, 1, 2, 1]; // Let's use this test case
// let arr = [1, 1, 1, 10, 1];
// let target = 5;

// function longestSubArray(target, arr) {
//   let maxSubArrayLength = 0; // Start at 0
//   let windowSum = 0;
//   let left = 0;

//   for (let right = 0; right < arr.length; right++) {
//     windowSum += arr[right]; // 1. Expand

//     // 2. Shrink ONLY if we exceed the target
//     while (windowSum > target) {
//       windowSum -= arr[left];
//       left++;
//     }

//     // 3. Measure: Now the window [left...right] is valid and at its peak size
//     let currentWindowLength = right - left + 1;
//     maxSubArrayLength = Math.max(maxSubArrayLength, currentWindowLength);
//   }

//   return maxSubArrayLength;
// }

// console.log("Longest length is:", longestSubArray(target, arr)); 
// Output: 3 (Subarray [1, 2, 1] or [2, 1, 2])

// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
// .
//"Why is it better to use a Stream to read a 2GB CSV file instead of fs.readFile (which uses a Buffer)?"

// Using a stream for a 2GB CSV file is a better approach because it processes the data in small chunks rather than loading the entire file into memory at once, preventing application crashes and performance bottlenecks.


// Here is why streaming is superior to fs.readFile for large files:

// Memory Efficiency: fs.readFile attempts to load the full 2GB into your RAM. If your system or container has less than 2GB of available memory, or if you hit Node.js's default buffer limit, the application will throw an "Out of Memory" error and crash. Streams only keep a tiny "chunk" (typically 64KB) in memory at any given time.

// Time to First Byte: With fs.readFile, your code must wait for the entire 2GB to be read from the disk before you can start processing the first row. Streams allow you to start processing the data as soon as the first chunk is available, making the app feel much faster.


// Backpressure Handling:
//  Streams can handle "backpressure," meaning if your data processing (like saving to a database) is slower than the disk reading, the stream will automatically pause the read operation to prevent memory buildup.


//  Scalability: A streaming approach works exactly the same whether the file is 2MB, 2GB, or 200GB. fs.readFile is inherently unscalable because it is tied directly to the amount of physical RAM available.


// Using the popular csv-parser library (which is highly efficient for streaming), here is how you would process that 2GB file:
// const fs = require('fs');
// const csv = require('csv-parser');
// // 1. Create a readable stream for the 2GB file
// // This does NOT load the file into memory.
// const readStream = fs.createReadStream('large-file.csv');

// // 2. Pipe the read stream into the csv parser  
// readStream.pipe(csv())
//   .on('data', (row) => {
//     // This callback is called for each row of the CSV as it is read.
//     console.log('Received a new row:', row);
//     // You can process the row here (e.g., save to database)
//   })
//   .on('end', () => {
//     console.log('Finished processing the CSV file.');
//   })
//   .on('error', (err) => {
//     console.error('An error occurred:', err);
//   });

// Why this works in JavaScript:
// Event-Driven: The 'data' event fires every time a small piece of the file is ready. Your script "reacts" to the data rather than "holding" it.
// Garbage Collection: Once a row is processed in the 'data' callback and the function finishes, that object becomes eligible for garbage collection, keeping your RAM usage flat.
// Non-Blocking: Because it's asynchronous, your Node.js process can still handle other requests or tasks while the file is being read in the background.
