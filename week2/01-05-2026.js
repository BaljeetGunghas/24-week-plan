// function isAnagram(s, t) {
//   // Your O(n) logic here

//   if (s.length !== t.length) {
//     return false;
//   }

//   let array = new Array(26).fill(0);

//   // lets suppose we have only lowercase character in the sting

//   for (let i = 0; i < s.length; i++) {
//     let charNo = s[i].charCodeAt(0);
//     let smallLetterFirst = "a".charCodeAt(0);
//     array[charNo - smallLetterFirst] += 1;
//   }
//   for (let i = 0; i < t.length; i++) {
//     let charNo = t[i].charCodeAt(0);
//     let smallLetterFirst = "a".charCodeAt(0);
//     array[charNo - smallLetterFirst] -= 1;
//   }
//   let i = 0;
//   while (i < array.length) {
//     if (array[i] !== 0) return false;
//     i++;
//   }

//   return true;
// }

// // TC: O(N);
// // SC: O(1); // as we are occuping constant space of 26 char so space complexity will be order of 1 or constant
// console.log(isAnagram("abcddfgh", "acbefdhg"));

// 1. The Code Critique (Architect Level)
// Your current implementation has a few "Junior" markers that we should clean up:

// Hardcoded Alphabet Size: While 26 is correct for basic problems, a Senior dev considers if the input could be Unicode or mixed case.

// Variable Naming: array is a bit generic. freqMap or charCounts is more descriptive.

// Redundancy: You are calculating smallLetterFirst inside the loop every time. This is a micro-waste of CPU cycles.

// function isAnagram(s, t) {
//   // 1. Immediate exit (High efficiency)
//   if (s.length !== t.length) return false;

//   // 2. Use a typed array for better memory performance in Node.js
//   const counts = new Int32Array(26);
//   const OFFSET = "a".charCodeAt(0);

//   // 3. Single-pass logic (Cleaner & Faster)
//   for (let i = 0; i < s.length; i++) {
//     counts[s.charCodeAt(i) - OFFSET]++;
//     counts[t.charCodeAt(i) - OFFSET]--;
//   }

//   // 4. Check if all balances are zero
//   for (let count of counts) {
//     if (count !== 0) return false;
//   }

//   return true;
// }

// console.log(isAnagram("abcddfgh", "acbefdhg"));

// 2. The "Senior Interview" Questions You Must Expect
// If you submit your current code, a Lead Engineer will ask these three follow-up questions to see if you deserve the 40 LPA salary:

// "What if the input contains Unicode characters (emojis, Hindi characters, etc.)?"

// Your Answer: "My array-based solution is optimized for $O(1)$ space with English letters. For Unicode, I would switch to a Map() to handle the larger character set, keeping the time complexity at $O(n)$."

// "How would you handle extremely large strings that don't fit in memory?"

// Your Answer: "I would treat the strings as Streams. I would pipe the data through a transform stream that updates the frequency counts as chunks arrive, preventing the server from crashing."

// "Is charCodeAt the best way to handle strings in modern JS?"

// Your Answer: "For simple ASCII, yes. But for characters outside the Basic Multilingual Plane (like certain emojis), I would use codePointAt to ensure I don't split surrogate pairs."

// function isAnagramUnicode(s, t) {
//   if (s.length !== t.length) return false;

//   const charMap = new Map();

//   // Use for...of to correctly handle surrogate pairs (emojis)
//   for (let char of s) {
//     charMap.set(char, (charMap.get(char) || 0) + 1);
//   }

//   for (let char of t) {
//     if (!charMap.has(char) || charMap.get(char) === 0) return false;
//     charMap.set(char, charMap.get(char) - 1);
//   }

//   return true;
// }

// // Example: isAnagramUnicode("नमस्ते", "नमस्ते") -> true

// console.log(isAnagramUnicode("नमस्ते", "नस्तेम"));

const fs = require("fs");

// async function areFilesAnagrams(file1, file2) {
//   const counts = {};

//   // Helper to process a file stream chunk by chunk
//   const processStream = (path, increment) => {
//     return new Promise((resolve) => {
//       const stream = fs.createReadStream(path, { encoding: "utf8" });
//       stream.on("data", (chunk) => {
//         for (const char of chunk) {
//           counts[char] = (counts[char] || 0) + (increment ? 1 : -1);
//         }
//       });
//       stream.on("end", resolve);
//     });
//   };

//   // Process first file (increments) then second file (decrements)
//   await processStream(file1, true);
//   await processStream(file2, false);

//   // If all counts are zero, they are anagrams
//   return Object.values(counts).every((count) => count === 0);
// }

let fileData = "";

const getData = async () => {
  console.log(1);

   await fs.readFileSync("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    // fileData += data;
    console.log("File content:", data);
  });
};
getData();



// There are three major things going wrong in that snippet:

// 1. Mixing Sync with Await
// The function fs.readFileSync is Synchronous. It stops the entire Node.js process until the file is read.

// The Issue: await only works on Promises. Since readFileSync returns a string (the file content) and not a Promise, the await keyword does absolutely nothing here.

// The Senior Perspective: In a high-scale API, using a Sync method is dangerous because it blocks all other incoming requests while the file is being read.

// 2. readFileSync does not take a Callback
// You are passing a callback function (err, data) => { ... } to fs.readFileSync.

// The Issue: The synchronous version of this function only takes the path and options. It returns the data directly to a variable; it doesn't use a callback.

// 3. The Execution Order
// Because you used a Sync method but tried to treat it like an Async one, your console.log(1) will run, then the code will crash or behave unexpectedly because the arguments are wrong.

// How to fix it (The "40 LPA" Way)
// If you want to use async/await, you must use the Promises API from the fs module.





// console.log(fileData);

// async function readFileExample() {
//   try {
//     const data = await fs.readFile("test.txt", "utf8");
//     console.log("File content:", data);
//   } catch (err) {
//     console.error("Error reading file:", err);
//   }
// }

// readFileExample();
