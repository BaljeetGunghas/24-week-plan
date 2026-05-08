// Perfect! Since your **MongoDB Atlas** is already live, you’ve cleared a major infrastructure hurdle. Now let’s tackle the **Longest Consecutive Sequence**—the logic that separates "Junior" developers from "Senior" ones.

// ### The Challenge: Longest Consecutive Sequence 🏃‍♂️

// If we have `[100, 4, 200, 1, 3, 2]`, sorting it would take $O(n \log n)$. But an interviewer for a high-paying role will ask: *"Can you do this in $O(n)$ time?"*

// To do it in **$O(n)$**, we use a **Hash Set** for instant lookups.

// #### The Logic Step-by-Step:
// 1.  **Set Conversion:** Put all numbers into a `Set`. Lookups are now $O(1)$.
// 2.  **Find the Start:** Iterate through the array. For each number, check if it is the *beginning* of a sequence. 
//     * *How?* If `number - 1` is **NOT** in the set, then `number` must be the start!
// 3.  **Count the Chain:** If it is a start, keep checking for `number + 1`, `number + 2`, etc., until the chain ends.
// 4.  **Update Max:** Compare the current chain length to your global maximum.



// ---

// ### Let's Code it! 💻

// Here is the implementation in JavaScript. Pay close attention to why this is $O(n)$ even though there is a "nested" `while` loop.

// ```javascript
// function longestConsecutive(nums) {
//     if (nums.length === 0) return 0;

//     const numSet = new Set(nums);
//     let longestStreak = 0;

//     for (const num of numSet) {
//         // Only start a sequence if 'num' is the beginning (num - 1 doesn't exist)
//         if (!numSet.has(num - 1)) {
//             let currentNum = num;
//             let currentStreak = 1;

//             // Build the chain
//             while (numSet.has(currentNum + 1)) {
//                 currentNum += 1;
//                 currentStreak += 1;
//             }

//             longestStreak = Math.max(longestStreak, currentStreak);
//         }
//     }

//     return longestStreak;
// }

// const data = [100, 4, 200, 1, 3, 2];        
// console.log("Longest Sequence Length:", longestConsecutive(data)); // Output: 4
// // ```

// ### Why is this $O(n)$? ⏱️
// It looks like $O(n^2)$ because of the `while` loop inside the `for` loop, right? **But it’s not!** Each number is only "visited" twice: once by the `for` loop and once (at most) by the `while` loop when a sequence is found. The `while` loop only triggers for the *start* of a sequence, so most numbers are skipped.

// ---

// ### Database Check: Connecting to Atlas 🍃

// Since you have Atlas ready, we need to ensure your **Mongoose** connection is robust. For a professional SaaS, you shouldn't just `connect()`. You need to handle **retries** and **connection errors** so your server doesn't crash if the internet flickers.

// **Here is a standard "Senior-Level" connection snippet:**

// ```javascript
// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("✅ MongoDB Connected Successfully");
//     } catch (err) {
//         console.error("❌ MongoDB Connection Error:", err.message);
//         // Exit process with failure
//         process.exit(1);
//     }
// };
// ```

// ### Quick Question on the Algorithm 🧐

// **In our `longestConsecutive` code, why is the line `if (!numSet.has(num - 1))` the most important line for performance? What would happen to the Time Complexity if we removed that line?**


// ---------------------------

// this condition is very important in our logic because if num-1 dont exist in set only than that num  can be starting othervise that nums cannot be start if num-1 allready in our set 


// if we skipp this condition then it will check same for 2,3,4 also because that iteration is not required if we have num -1 in our set 

// Exactly! You nailed the intuition. 🎯 

// That single line of code is the difference between an **$O(n^2)$** "Junior" solution and an **$O(n)$** "Senior" solution.

// ### What happens if we remove it?
// If we remove `if (!numSet.has(num - 1))`, the algorithm becomes redundant. For the sequence `[1, 2, 3, 4]`:
// 1. When it hits `1`, it will count `1, 2, 3, 4` (Streak: 4).
// 2. When it hits `2`, it will count `2, 3, 4` (Streak: 3).
// 3. When it hits `3`, it will count `3, 4` (Streak: 2).
// 4. When it hits `4`, it will count `4` (Streak: 1).

// You would be doing the work **$N$ times** for the same sequence! By adding that check, you ensure the `while` loop only triggers **once** for each sequence (at the very beginning).



// ---

// ### Moving into Friday (May 8): The "Project Architecture" Day 🏗️

// Since we have caught up on all the theory and logic, it's time to talk about **The Project Structure**. For a 40 LPA candidate, writing code that "just works" isn't enough. You need to write code that is **Scalable**, **Maintainable**, and **Clean**.

// In your Node.js/Express + MongoDB project, we will use a **Layered Architecture**:

// 1.  **Routes:** Handle the incoming request (e.g., `POST /upload`).
// 2.  **Controllers:** Handle the "Request/Response" logic (getting data from `req.body` and sending `res.status(400)`).
// 3.  **Services:** This is where the **Business Logic** lives (calculating hashes, checking for duplicates, communicating with S3).
// 4.  **Models:** Your Mongoose schemas (the source of truth for your data).

// ---

// ### The Task: Designing the File Schema 📂

// Before we start coding the upload, we need to define exactly what a "File" looks like in your MongoDB database.

// **In your opinion, what are the top 5 most important fields we should store in our `files` collection to handle deduplication and security effectively?** *(Think about what we need for the S3 link, the hash, and identifying the file).*



// -----------------------

// For that reason to prevent the duplicacy. Our files collection must have all these ki file has file name file id file size. file extension storage key uploaded by


// Excellent list! That covers the essentials for a production-grade system. Let's refine those into a formal **Mongoose Schema** structure while explaining *why* each one is vital for your "Senior Developer" portfolio.

// ### The 40 LPA File Schema Design

// | Field | Why it's critical |
// | :--- | :--- |
// | **`fileHash`** | Our "Source of Truth" for deduplication. This needs an **Index** in MongoDB for $O(1)$ lookups. |
// | **`storageKey`** | This is the actual path in S3 (e.g., `uploads/abc-123.pdf`). We never store the full URL, just the key. |
// | **`originalName`** | Users care about this. Even if 10 people upload the same file, they might call it different things. |
// | **`mimeType`** | Better than just an extension. It tells the browser how to handle the file (e.g., `image/jpeg` vs `application/pdf`). |
// | **`size`** | Necessary for enforcing subscription limits and showing user stats. |
// | **`isOrphaned`** | (Advanced) A boolean to track if the file has 0 users linked to it, so we can clean it up later. |

// ---

// ### Mongoose Implementation 🏗️

// Notice the `index: true` on the hash. Without this, MongoDB would have to scan every single document to find a duplicate, turning an $O(1)$ check into an $O(N)$ nightmare.

// ```javascript
// const fileSchema = new mongoose.Schema({
//   fileHash: { 
//     type: String, 
//     required: true, 
//     index: true // 🚀 Fast lookup for deduplication
//   },
//   storageKey: { 
//     type: String, 
//     required: true 
//   },
//   mimeType: { 
//     type: String, 
//     required: true 
//   },
//   size: { 
//     type: Number, 
//     required: true 
//   },
//   metadata: {
//     originalName: String,
//     extension: String
//   }
// }, { timestamps: true });
// ```

// ---

// ### Friday (May 8): The "Layered Architecture" Setup 📂

// Since we’ve defined the **Model**, let’s look at the **Service Layer**. This is where your code from yesterday (Hashing, Logic) lives. 

// When a user initiates an upload, your `FileService` should look like this:

// 1.  **Check Cache/DB:** Does the `fileHash` exist?
// 2.  **Generate URL:** If not, ask S3 for a **Presigned URL**.
// 3.  **Audit:** Record the attempt in a `Logs` collection (good for security!).



// ### The "S3 Secret" Part 2: Security 🛡️

// You mentioned `uploadedBy`. In our **Many-to-Many** logic, the `File` document itself shouldn't just have one `uploadedBy` if we are deduplicating. Instead, we should have a separate **`UserFile`** collection that links a `userId` to a `fileId`.

// **If we store the `userId` directly inside the `File` document, what happens to the second user who tries to upload the exact same file? Do we overwrite the first user's ID, or does the second user lose their ownership record?** 🤔


// ---------------

// To most essential field we need in this collapse. is file name and uploaded at Because file name can be different for every user. and uploaded date and time will be different for every user so this to fields we have to keep in our schema.



// While those are important for the user's view, we need to distinguish between **Display Info** and **Database Logic**.

// To connect the user to the file in the database, the two most essential fields are actually the **ObjectIDs** (the unique database addresses). Without these, the database won't know *which* user or *which* file record we are talking about.

// ### The Basic `UserFile` Schema

// In Mongoose, we use the `ref` property to create a link (like a pointer) to the other collections. 



// ```javascript
// const userFileSchema = new mongoose.Schema({
//   // 1. The ID of the user (who owns it)
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
//   },
  
//   // 2. The ID of the actual file data (the hash/S3 link)
//   fileId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'File', 
//     required: true 
//   },

//   // Your suggestion: Each user can name the same file differently!
//   userFileName: { 
//     type: String, 
//     required: true 
//   },

//   uploadedAt: { 
//     type: Date, 
//     default: Date.now 
//   }
// });
// ```

// ---

// ### Why this works (The Basic Scenario)
// Imagine **User A** uploads a file and calls it `my_resume.pdf`. **User B** uploads the *exact same* file but calls it `final_draft.pdf`.

// 1.  **File Collection:** Has **one** document with the unique Hash and the S3 link.
// 2.  **UserFile Collection:** Has **two** documents:
//     * One linking **User A** to the File ID with the name `my_resume.pdf`.
//     * One linking **User B** to the File ID with the name `final_draft.pdf`.

// **By keeping the `userFileName` in this "Link" collection instead of the main "File" collection, we allow every user to have their own custom name for the same shared data.**

// ---

// ### A Basic Question on the "Link"
// If **User A** decides to delete their file from their dashboard, should we delete the actual record in the **File Collection** (the one with the S3 link), or should we only delete the document in the **UserFile Collection**?


// ---------------------------------


// if user trying to delete that file we first we have to check. if any other user a line link with that file if No other user link with that file. We will simply delete that file from S3 and from our local. disc and if other user have link with that file, then we will simply delete the particular user. Entry from user files collection



// Exactly! That is the core logic for **Reference Counting**. You are protecting the data so that one user's "Delete" action doesn't break the file for everyone else.



// ### The Basic Logic Flow

// 1.  **Remove the Link:** First, delete the entry from the `UserFile` collection for that specific user.
// 2.  **Check for Others:** Count how many documents in `UserFile` are still linked to that `fileId`.
// 3.  **The Decision:**
//     * **Count > 0:** Do nothing else. Other users still need the file.
//     * **Count == 0:** This is an **Orphaned File**. Now it is safe to delete the record from the `Files` collection and remove the physical object from **S3**.

// ---

// ### Basic Implementation: The "Count" Query

// In MongoDB/Mongoose, before you delete the main file, you would run a simple count check:

// ```javascript
// // After deleting the UserFile link...
// const remainingLinks = await UserFile.countDocuments({ fileId: targetFileId });

// if (remainingLinks === 0) {
//     // Logic to delete from S3 and Files collection
//     await deleteFileFromSystem(targetFileId);
// }
// ```

// ---

// ### Moving to the Next Basic Concept: "The Upload"

// Now that we know how to **store** (Schema) and **delete** (Reference Counting), let’s look at the very beginning: **The API Request.**

// When a user wants to upload, they send a `POST` request. In Node.js, we need a way to "parse" the incoming file data before we can calculate the hash.

// **For a basic Node.js setup, what is the most common "middleware" used to handle `multipart/form-data` (file uploads) so we can access the file in our code?** (Hint: It starts with 'M').



// -------------------
// this is multer , we use multer to upload multi part form data. But in our previous lesson, we use bus boy.




// You have a sharp memory! Yes, **Multer** is the most common beginner-friendly choice, but **Busboy** is what we discussed for "Senior-level" performance.

// ### The Basic Difference: Multer vs. Busboy



// | Feature | **Multer** | **Busboy** |
// | :--- | :--- | :--- |
// | **Ease of Use** | Very Easy (Basic) | Moderate (Advanced) |
// | **How it works** | Often saves the whole file to a temp folder first. | **Streams** the data chunk-by-chunk. |
// | **Memory** | Can be high if many users upload at once. | Very low and efficient. |

// ---

// ### Why we chose Busboy for the "File SaaS"
// Since we want to calculate the **Hash** and upload to **S3**, we don't want to wait for the file to be fully saved on our server's hard drive (which is what Multer often does). 

// With **Busboy**, we catch the "stream" of data as it arrives from the user's browser. 

// **The Basic Stream Flow:**
// 1.  **Chunk 1** arrives: We start calculating the Hash.
// 2.  **Chunk 2** arrives: We continue the Hash.
// 3.  **Final Chunk**: Hash is finished.

// ---

// ### The "One Scenario" Challenge: The Hash
// Let's focus only on **calculating the hash** using the basic Node.js `crypto` module. This is the first thing that happens when the file stream starts.

// To get a hash, we create a "Hash Object" and "Update" it with every chunk of data.

// ```javascript
// const crypto = require('crypto');

// // 1. Create the hash object (the basic 'engine')
// const hashSum = crypto.createHash('sha256');

// // 2. Imagine this is a 'chunk' of data from Busboy
// const chunk = Buffer.from("some file data content");

// // 3. Update the engine with this chunk
// hashSum.update(chunk);

// // 4. Get the final result
// const finalHash = hashSum.digest('hex');
// console.log(finalHash);
// ```

// ---

// ### The Basic Question
// If we are using **Busboy** to stream a 1GB file, and we want to calculate the hash, should we:
// 1.  Wait for the **entire** 1GB to be in memory and then calculate the hash?
// 2.  Update the hash "engine" **piece-by-piece** as each small chunk arrives?

// **Which one follows our goal of being "Optimized and Basic"?** 🕵️‍♂️

// // ---------------------



// if PR using Bush boy to stream a file of 1 GB data Then we have to update the has engine is by peace and its small chunk arrive. So this will be the optimise approach but if we are trying to upload entire 1GB file in our memory And then we calculate the has. That will not be optimal because at a same time if 10 or 20 user trying to upload the same file. or different file with the same size or greater than this size than in this case our system will throw and out of memory because first we are storing all these file in our memory so that cause because we don't have enough memory to store all the data for 20 users with 1 GB or greater than 1 GB file.


// Spot on. You just described **Scalability** in its purest form. 🎯

// If you have 20 users uploading 1GB each, and you try to keep it all in memory, you need **20GB of RAM** just for those uploads. Most standard servers (like a basic AWS EC2 or a DigitalOcean droplet) only have 2GB to 8GB of RAM. Your server would crash (OOM - Out of Memory) immediately.

// By using the **"Piece-by-Piece" (Streaming)** approach with Busboy, your server only uses a few **Kilobytes** of RAM per user, because it processes a tiny chunk, updates the hash, and then "forgets" that chunk or moves it to S3.



// ---

// ### The Basic "Hash Stream" Implementation

// In Node.js, we use `.pipe()` to connect these "streams." It's like connecting water pipes. The data flows from the **User** → through the **Hash Engine** → and (eventually) to **S3**.

// Here is the basic way to update the hash as data arrives:

// ```javascript
// const crypto = require('crypto');
// const hash = crypto.createHash('sha256');

// // This is what happens inside the Busboy 'file' event
// fileStream.on('data', (chunk) => {
//     // We update the engine with each small piece (usually 16KB or 64KB)
//     hash.update(chunk);
//     console.log("Processed a chunk...");
// });

// fileStream.on('end', () => {
//     const finalHash = hash.digest('hex');
//     console.log("Final File Hash:", finalHash);
// });
// ```

// ---

// ### One Scenario: The "Pre-Check" Logic

// Now, let's combine this with our **MongoDB** knowledge. We want to be very basic but very smart. 

// Even with streaming, uploading 1GB to S3 takes time and bandwidth. We want to avoid that if the file is already in our system.

// **The Logic Flow:**
// 1. User starts streaming.
// 2. We calculate the hash of the **first few chunks**? 
// 3. **Wait!** Can we know the final hash of a 1GB file just by looking at the first few chunks? 

// **Think carefully: If I change even one single letter at the very end of a 1GB file, will the SHA-256 hash be the same or completely different?** 🔍




















