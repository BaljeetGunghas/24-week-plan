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

// const fs = require("fs");

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

// let fileData = "";

// const getData = async () => {
//   console.log(1);

//    await fs.readFileSync("test.txt", "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return;
//     }
//     // fileData += data;
//     console.log("File content:", data);
//   });
// };
// getData();

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

// const fs = require("fs").promises; // Use the promises version

// const getData = async (fileName) => {
//   try {
//     // Now 'await' actually works because fs.readFile returns a Promise
//     const data = await fs.readFile(fileName, "utf8");

//     return data;
//   } catch (err) {
//     console.error("Error reading file:", err);
//   }
// };

// async function isAnagramUnicode() {
//   const s = await getData('test.txt');
//   const t = await getData("test copy.txt");
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

// const dataPass = async ()=>{
//     const result = await isAnagramUnicode()
//     console.log(result);

// }

// dataPass()

// However, your note about the 1,000+ lines of data is exactly where a Senior Engineer transitions from "Logic" to "Architecture."

// The 40 LPA Analysis: Memory vs. Scalability
// While 1,000 lines (roughly 50–100 KB) is small enough for your current code to handle easily, an interviewer will ask: "What happens if those files grow to 10 GB each?"

// 1. The Problem with fs.readFile (Your current way)
// Buffer Limit: fs.readFile loads the entire file into RAM before giving it to you.

// The Crash: If you have two 10 GB files, your Node.js process will try to grab 20 GB of RAM. Most servers will hit the heap limit and crash immediately.

// Blocking: While the OS is reading that huge file into memory, your Event Loop can become sluggish.

// 2. The Senior Solution: "Streaming" the Comparison
// Instead of loading everything, we process the file in "chunks" (remember the 16 bytes from yesterday?). We update our charMap as the bytes pass through, then discard those bytes immediately.

// Action Item: Architecture for the Stream-based Upload API
// Since your goal for today includes designing a Stream-based Upload API, let's look at how we would structure it to be "40 LPA Bulletproof."

// High-Level Design Components:
// The Request (Readable Stream): The req object in Express/Node is a stream. We don't wait for it to finish; we start processing as soon as the first byte arrives.

// The Parser (Transform Stream): Use a library like busboy or formidable. They are "Event-driven" parsers that emit a file event as soon as they detect a file starting in the upload.

// The Destination (Writable Stream): We pipe the data directly to its final home (S3 bucket or local disk).

// This is a great question. For a 35–40 LPA role, you aren't just expected to write code; you are expected to profile it. High-level engineers must know exactly how much stress their code puts on the CPU and RAM.

// To measure this in Node.js, we use performance.now() for time and process.memoryUsage() for RAM.

// 1. Measuring Time and Memory
// Here is your code wrapped with the necessary profiling tools:

// const fs = require("fs").promises;

// const getData = async (fileName) => {
//   try {
//     return await fs.readFile(fileName, "utf8");
//   } catch (err) {
//     console.error("Error reading file:", err);
//   }
// };

// async function isAnagramUnicode() {
//   const s = await getData('test.txt');
//   const t = await getData("test copy.txt");
//   if (s.length !== t.length) return false;

//   const charMap = new Map();
//   for (let char of s) {
//     charMap.set(char, (charMap.get(char) || 0) + 1);
//   }
//   for (let char of t) {
//     if (!charMap.has(char) || charMap.get(char) === 0) return false;
//     charMap.set(char, charMap.get(char) - 1);
//   }
//   return true;
// }

// const dataPass = async () => {
//     // --- Start Profiling ---
//     const startTime = performance.now();
//     const startMemory = process.memoryUsage().heapUsed / 1024 / 1024; // Convert to MB

//     const result = await isAnagramUnicode();

//     const endMemory = process.memoryUsage().heapUsed / 1024 / 1024;
//     const endTime = performance.now();
//     // --- End Profiling ---

//     console.log(`Result: ${result}`);
//     console.log(`Time Taken: ${(endTime - startTime).toFixed(2)} ms`);
//     console.log(`Memory Used (Approx): ${(endMemory - startMemory).toFixed(2)} MB`);
//     console.log(`Total Heap Memory: ${endMemory.toFixed(2)} MB`);
// };

// dataPass();

// top/24 week plan/week2 (master)
// $ node 01-05-2026.js
// Result: true
// Time Taken: 13678.86 ms
// Memory Used (Approx): 641.90 MB
// Total Heap Memory: 645.87 MB

// Those results are exactly why a 35–40 LPA interview exists. Look at that 641 MB jump for two 80 MB files. That is a massive memory overhead!

// Why is it using 641 MB for 160 MB of files?
// Buffer to String Conversion: When you readFile with utf8, Node.js creates a massive string in memory.

// String Iteration: The for...of loop creates many small string objects as it iterates.

// The Map: Storing millions of keys/values in a Map is memory-heavy.

// Garbage Collection: Node hasn't had time to "clean up" the old data while the function is running.

// The "Senior" Optimization: Streams
// To optimize this, we stop using fs.readFile (which is a "Buffer" approach) and move to fs.createReadStream (the "Stream" approach).

// The Strategy:

// Read File 1 in small chunks. Update a single frequency Map.

// Read File 2 in small chunks. Decrease the counts in the same Map.

// Memory Benefit: We only ever have a few kilobytes of the file in RAM at any given time.

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// The Optimized Code

// const fs = require("fs");

// const getFrequencyMap = (filePath) => {
//   return new Promise((resolve, reject) => {
//     const charMap = new Map();
//     // Create a stream - this only loads 64KB at a time by default
//     const stream = fs.createReadStream(filePath, { encoding: "utf8" });

//     stream.on("data", (chunk) => {
//       // Process the chunk and immediately let it be ready for Garbage Collection
//       for (let char of chunk) {
//         charMap.set(char, (charMap.get(char) || 0) + 1);
//       }
//     });

//     stream.on("end", () => resolve(charMap));
//     stream.on("error", reject);
//   });
// };

// async function optimizedAnagram(file1, file2) {
//   const startTime = performance.now();
//   const startMemory = process.memoryUsage().heapUsed / 1024 / 1024;

//   // Process File 1
//   const charMap = await getFrequencyMap(file1);

//   // Process File 2 and decrement
//   await new Promise((resolve, reject) => {
//     const stream = fs.createReadStream(file2, { encoding: "utf8" });
//     stream.on("data", (chunk) => {
//       for (let char of chunk) {
//         if (!charMap.has(char)) {
//           /* Early exit logic can go here */
//         }
//         charMap.set(char, charMap.get(char) - 1);
//       }
//     });
//     stream.on("end", resolve);
//     stream.on("error", reject);
//   });

//   // Final Check
//   let isAnagram = true;
//   for (let count of charMap.values()) {
//     if (count !== 0) {
//       isAnagram = false;
//       break;
//     }
//   }

//   const endMemory = process.memoryUsage().heapUsed / 1024 / 1024;
//   const endTime = performance.now();

//   console.log(`Result: ${isAnagram}`);
//   console.log(`Time Taken: ${(endTime - startTime).toFixed(2)} ms`);
//   console.log(`Memory Usage: ${(endMemory - startMemory).toFixed(2)} MB`);
//   console.log(`Total Heap Memory: ${endMemory.toFixed(2)} MB`);
// }

// optimizedAnagram("test.txt", "test copy.txt");

// You just dropped the memory consumption from 641 MB to 4.67 MB. In a real-world production environment, that is the difference between a server that crashes under load and one that stays rock-solid. That is "Senior Architect" level optimization.

// Now, let's talk about the Time Taken. Even though your memory is optimized, the time only dropped by about 4 seconds.

// Why the time hasn't dropped further
// Disk I/O Bottleneck: Reading 160MB from a physical disk takes a set amount of time regardless of how you process it.

// String Decoding: Turning raw bytes into UTF-8 characters is CPU-intensive.

// Iteration overhead: for...of on a string is convenient but slower than a standard for loop over a Buffer.

// The "Extreme" Time Optimization (40 LPA Level)
// To shave off those 9 seconds, we move from UTF-8 Strings to Raw Buffers. By skipping the conversion to a string, we save the CPU from doing heavy decoding work.

// Key Performance Tweaks:
// Uint8Array: We iterate over the raw byte values (0-255).

// Skip Decoding: Instead of encoding: 'utf8', we read raw bytes.

// Sequential vs Parallel: We can start reading the second file while the first is still processing (though with a single disk, this has diminishing returns).

const fs = require("fs");

const getFrequencyMap = (filePath) => {
  return new Promise((resolve, reject) => {
    // Use an Int32Array(256) if only ASCII, or a Map for full bytes
    const charMap = new Int32Array(256);
    const stream = fs.createReadStream(filePath); // No encoding = RAW BYTES

    stream.on("data", (chunk) => {
      // Processing raw buffer bytes is much faster than strings
      for (let i = 0; i < chunk.length; i++) {
        charMap[chunk[i]]++;
      }
    });

    stream.on("end", () => resolve(charMap));
    stream.on("error", reject);
  });
};

async function extremeOptimization(file1, file2) {
  const startTime = performance.now();
  const startMemory = process.memoryUsage().heapUsed / 1024 / 1024;
  // Process both files in a more optimized way
  const charMap = await getFrequencyMap(file1);

  await new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file2);
    stream.on("data", (chunk) => {
      for (let i = 0; i < chunk.length; i++) {
        charMap[chunk[i]]--;
      }
    });
    stream.on("end", resolve);
  });

  const isAnagram = charMap.every((count) => count === 0);
  const endTime = performance.now();
  const endMemory = process.memoryUsage().heapUsed / 1024 / 1024;

  console.log(`Result: ${isAnagram}`);

  console.log(`Time Taken: ${(endTime - startTime).toFixed(2)} ms`);
  console.log(`Memory Usage: ${(endMemory - startMemory).toFixed(2)} MB`);
  console.log(`Total Heap Memory: ${endMemory.toFixed(2)} MB`);
}

extremeOptimization("test.txt", "test copy.txt");

// The Architecture: Stream-based Upload API
// Now that you've seen how streams save memory and time, let's tie it into your May 01 Action Item.

// When building an upload API, you want to use the Stream approach because:

// Concurrency: You can handle 100 uploads at once with only 50MB of RAM.

// Latency: You can start processing the file (like calculating its hash or checking for viruses) before the user even finishes uploading it.

// The "Check"
// The optimization you just performed is exactly what a high-performance Stream API does.

// Does the idea of processing "Raw Bytes" instead of "Strings" to save time make sense?

// =========================================================



// $ node 01-05-2026.js 
// Result: true
// Time Taken: 9325.30 ms
// Memory Usage: 4.67 MB
// Total Heap Memory: 8.46 MB

// DELL@DESKTOP-HS7ACQ5 MINGW64 ~/Desktop/24 week plan/week2 (master)
// $ node 01-05-2026.js 
// Result: true
// Time Taken: 816.44 ms
// Memory Usage: 0.83 MB
// Total Heap Memory: 4.63 MB


// =========================================================



// Why the Time Dropped So Drastically
// No UTF-8 Decoding: By using raw Buffers and Uint8Array (or Int32Array), you bypassed the heavy CPU work of turning binary data into human-readable strings.

// Integer Access vs. String Iteration: Iterating over an array of numbers is significantly faster for a computer than iterating over complex string characters.

// Heap Management: Because you aren't creating millions of string objects, the Garbage Collector didn't have to pause your program to clean up memory.

// Action Item Part 1: Architecture for the Stream-based Upload API
// Now, let's take that "Stream logic" and apply it to a real-world system architecture. Imagine you are building the backend for a video platform.