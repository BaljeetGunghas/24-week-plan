

// Find the length of the longest substring without repeating characters.

// function lengthOfLongestSubstring(s) {
//   let maxLength = 0;
//   let left = 0;
//   let charSet = new Set();

//     for (let right = 0; right < s.length; right++) {
//     while (charSet.has(s[right])) {
//       charSet.delete(s[left]);
//       left++;
//     }
//     charSet.add(s[right]);
//     maxLength = Math.max(maxLength, right - left + 1);
//   }
//   return maxLength;
// }


// // time complexity will be O(N) because we are travesing the string only one time
// // space complexity will be O(min(N,M)) where N is the length of the string and M is the size of the character set (e.g., 26 for lowercase letters).

// const s = "pwwkew";
// console.log(lengthOfLongestSubstring(s));

// function lengthOfLongestSubstring(s) {
//   let maxLength = 0;
//     let left = 0;
//     let charMap = new Map();

//     for (let right = 0; right < s.length; right++) {
//     if (charMap.has(s[right]) && charMap.get(s[right]) >= left) {
//       left = charMap.get(s[right]) + 1;
//     }
//     charMap.set(s[right], right);
//     maxLength = Math.max(maxLength, right - left + 1);
//   }
//   return maxLength;
// }

// // time complexity will be O(N) because we are travesing the string only one time
// // space complexity will be O(min(N,M)) where N is the length of the string and M is the size of the character set (e.g., 26 for lowercase letters).

// const s = "pwwkew";
// console.log(lengthOfLongestSubstring(s));


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

// Next: Moving to Node.js "fs" and File Descriptors
// Now that your logic is sharp, let's talk about how the computer actually handles these strings when they come from a file.

// In Node.js, the fs (File System) module is your bridge to the hard drive.

// 1. What is a File Descriptor?

// When you use fs.open(), Node doesn't give you the "content" of the file immediately. It gives you a number (e.g., 22).

// Think of it like this: You go to a coat check at a hotel. You give them your coat (the file), and they give you a token number (the descriptor). You use that number to get your coat back or check its pockets.

// 2. Let's write a "Manual" Read
// Instead of fs.readFile (which loads everything into RAM), let's use a lower-level approach to see how chunks work.

// Try to run this in your local VS Code:

// const fs = require('fs');

// // We "Open" the file first to get the File Descriptor (fd)
// fs.open('test.txt', 'r', (err, fd) => {
//   if (err) throw err;

//   // We create a small "Bucket" (Buffer) of 16 bytes
//   const buffer = Buffer.alloc(16); 

//   // We read only 16 bytes from the file starting from position 0
//   fs.read(fd, buffer, 0, 16, 0, (err, bytesRead, data) => {
//     if (err) throw err;
    
//     console.log(`Bytes read: ${bytesRead}`);
//     console.log(`Data in buffer: ${data.toString()}`);

//     // Always close the descriptor when done!
//     fs.close(fd, (err) => {
//       if (err) throw err;
//     });
//   });
// });


// What this demonstrates:

// Memory Control: You decided to only use 16 bytes of RAM, regardless of whether the file is 10GB.

// Explicit Control: You are manually managing the open -> read -> close lifecycle.



// Explane What is a Stream?
// // A Stream is a powerful abstraction in Node.js that allows you to read or write data piece by piece, rather than all at once. This is especially useful for handling large files or data sources without consuming a lot of memory.

// // Think of a Stream like a water pipe. Instead of filling a bucket (Buffer) with water (data) all at once, you can turn on the tap and let the water flow in small, manageable amounts. This way, you can process the data as it arrives without needing to store it all in memory.

// What are the Types of Streams in Node.js?
// // 1. Readable Streams: These are used for reading data. Examples include fs.createReadStream() for files and http.IncomingMessage for HTTP requests.
// // 2. Writable Streams: These are used for writing data. Examples include fs.createWriteStream() for files and http.ServerResponse for HTTP responses.
// // 3. Duplex Streams: These can be both readable and writable. An example is a net.Socket, which can send and receive data over a network.
// // 4. Transform Streams: These are a type of duplex stream that can modify or transform the data as it is read or written. An example is zlib.createGzip() for compressing data.



// Output will be something like this when you run the above code:
// $ node 30-04-2026.js 
// Bytes read: 16
// Data in buffer: Explane What is


// That output confirms exactly what we discussed: your buffer was a 16-byte "bucket," so it only caught the first 16 characters of your file ("Explane What is"). The rest of the data is still waiting on your disk.

// Using fs.promises is the gold standard for modern Node.js development because it avoids "Callback Hell" and makes your code much more readable.

// The Async/Await Implementation
// Here is how a Senior Engineer would write that append script using the promises API:

// const fs = require('fs').promises;

// async function updateFile() {
//     try {
//         const contentToAppend = " - Processed by Baljeet";
        
//         // Using 'a' flag internally, appendFile adds to the end
//         await fs.appendFile('test.txt', contentToAppend);
        
//         console.log("File successfully updated!");
        
//         // Verification: Read the whole file now
//         const updatedData = await fs.readFile('test.txt', 'utf-8');
//         console.log("New File Content:", updatedData);
        
//     } catch (error) {
//         console.error("Error managing file:", error.message);
//     }
// }

// updateFile();


// Why this matters for your 35-40 LPA Journey
// Error Handling: Notice the try...catch. In high-salary roles, writing code that works is only 50% of the job; the other 50% is handling what happens when it fails (e.g., file permissions, disk full).

// Clean Code: await fs.appendFile is much cleaner than the nested callbacks we used in the fs.open example.

// UTF-8 Encoding: By passing 'utf-8' to readFile, you tell Node to convert the Buffer (raw bytes) into a human-readable String automatically.

// Summary of Tonight's Gains

// DSA: You mastered the Optimized Map-based Sliding Window. You can now solve "Longest Substring" problems in $O(n)$ time with zero unnecessary steps.

// Node.js: You moved from basic readFile to understanding File Descriptors, Buffers, and Flags (r, w, a).

// Productivity: You successfully ran low-level Node.js code on your local machine.


// This logic is exactly what happens inside Node.js when you use pipe().

// The "Chunk-by-Chunk" Challenge
// We will use a while loop to keep reading 16-byte chunks until the bytesRead comes back as 0.

// Run this in your 30-04-2026.js file:

const fs = require('fs');

fs.open('test.txt', 'r', (err, fd) => {
    if (err) throw err;

    const buffer = Buffer.alloc(16);
    let totalBytesRead = 0;

    function readNextChunk() {
        // Read 16 bytes, but start from where we last stopped (totalBytesRead)
        fs.read(fd, buffer, 0, 16, totalBytesRead, (err, bytesRead) => {
            if (err) throw err;

            // Stop condition: If no bytes were read, we hit the End of File (EOF)
            if (bytesRead === 0) {
                console.log("\n--- Finished reading file ---");
                return fs.close(fd, () => {});
            }

            // Convert only the bytes actually read to a string
            process.stdout.write(buffer.toString('utf8', 0, bytesRead));
            
            // Move our pointer forward
            totalBytesRead += bytesRead;

            // Recursively call to get the next 16 bytes
            readNextChunk();
        });
    }

    readNextChunk();
});

// What is happening here?
// totalBytesRead: This acts as our "bookmark." It tells the OS, "I already read the first 16 bytes, now give me the next 16 starting from this position."

// process.stdout.write: We use this instead of console.log because console.log adds a new line every time. stdout.write keeps everything on one line, so the text looks normal even though it's being printed in tiny 16-byte pieces.

// Recursion: We call readNextChunk() inside the callback. This ensures we don't try to read the second chunk until the first one is finished.


// Why this makes you a better Architect
// When you build a high-scale system (the 40 LPA kind), you might have to process a 5GB log file.

// If you use fs.readFile, your server will try to put 5GB into RAM and crash.

// If you use this Chunking method, your server only ever uses 16 bytes of RAM.

// You are now managing memory like a pro.

// Try running it! If your test.txt has a long sentence, you'll see it appear on your screen piece by piece (though it happens very fast!).