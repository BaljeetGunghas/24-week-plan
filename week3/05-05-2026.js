// 3. Coding Challenge: Frequency Counting 📊
// To master this, let's solve a core interview problem: Top K Frequent Elements.

// The Scenario: You have a list of file extensions uploaded today: ['jpg', 'png', 'jpg', 'pdf', 'jpg', 'pdf']. You want to find the top 1 most frequent extension.

// The Step-by-Step Logic:

// Create a Map: Loop through the array.

// Count: If 'jpg' is in the map, increment its value. If not, set it to 1.

// Result: Your map should look like: { 'jpg': 3, 'png': 1, 'pdf': 2 }.

// If you had to write a loop to build this Map, what would be the very first thing you check inside the loop when you encounter an element? 🔍

// ----------------------------

// so if we have an array of list of extension And we have to create a map. with each Extension and their account So when we I trade through this array. the first thing I will check if array of I has in the map then we will increment The Count of that particular extension if that extension does not exist in that map, then we will simply. Set the count of that Extension 1. So that will be my approach.

// That is exactly how the **Frequency Counting** pattern works! 🎯 Your approach perfectly addresses the logic needed to build a representation of data in $O(n)$ time.

// By checking for the existence of the key first, you ensure that you don't try to increment a value that isn't there (which would result in `NaN` in JavaScript). 🛠️

// ### Why this is "40 LPA" Engineering
// In a high-scale SaaS, you might be processing millions of file uploads. Using a **Hash Map** (or a JS `Map` object) ensures that even if you have thousands of unique extensions, finding and updating the count remains **$O(1)$** (constant time). If you used a nested loop to count instead, your server would slow down exponentially as the list grew! 🚀

// ---

// ### Step 2: Finding the "Top K"
// Once we have our map, for example: `{ 'jpg': 3, 'png': 1, 'pdf': 2 }`, we need to find the most frequent ones.

// Common ways to do this include:
// 1.  **Sorting:** Converting the map to an array and sorting by the count (Value).
// 2.  **Max Variable:** Keeping track of the "leader" as you build the map.

// **If you had to find the single most frequent extension without sorting the whole list at the end, how could you use a simple variable to keep track of the "winner" while you are still looping through the array?** 🏆
// ------------------

// if we have to use a simple variable, then we can do a loop on map instead of sorting and creating and new array there we will I treat over this map with key and value. First we will check. We will create new variable with frequency and extension name. so when we I treat over this map the default value of these variable will be zero for frequency and empty string for extend son winner so when we encounter first key in our map then we will check the count of that particular key if that count is greater than frequency variable, then we will update that frequency variable to that count and update the extension winner to that particular key and we will do same all the array. At the last we will return that frequency. not frequency only extension winner variable that will be the name of the extension that okay largest time in that

// That is a perfect $O(n)$ strategy! 🎯 By maintaining a "leaderboard" variable while you iterate through the map, you avoid the overhead of sorting entirely. This is exactly the kind of optimization that distinguishes a high-level engineer.

// ### Why Your Approach Wins
// *   **Space Efficiency:** You aren't creating a whole new sorted array; you're just using two small variables (a string and a number). 💾
// *   **Time Efficiency:** Sorting takes $O(n \log n)$ time, but your single pass through the map takes only $O(n)$. For a massive dataset, that difference is huge. 🚀

// ----------------------

// ### Moving to API Validation: The "Security First" Layer 🛡️

// Since we are catching up on **Tuesday's** topic, let's talk about **API Validation**. In your SaaS, you can't just trust that the user is sending a valid "file name" or a proper "hash." If they send a 1GB string as a filename, they could crash your database or perform an injection attack.

// We use tools like **Zod** or **Joi** to create a "schema" that acts as a gatekeeper. Before your logic even touches the database, the validation layer checks:
// *   Is the `hash` exactly 64 characters (for SHA-256)?
// *   Is the `filename` less than 255 characters?
// *   Is the `user_id` a valid UUID?

// ### Integrating Zod with your Logic

// If a request fails validation, we don't even run the code to check for duplicates. We stop it immediately at the "gate."

// **If a user sends a request that fails this validation (e.g., they forgot to include the file hash), what HTTP status code should we return to tell them the *request* itself was malformed?** 🌐

// ----------------

// if user send a request that fails in the validation Then the status code we will send back to the user is 400 bed request.

// Spot on! **400 Bad Request** is the perfect choice for a validation failure 🛑. It tells the client that the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).

// By catching these errors early with a validation library like **Zod**, we protect our internal logic from dealing with "garbage" data.

// ---

// ### Tuesday's Topic: Frequency Counting & Top K 📊

// We've covered the logic of using a **Hash Map** to count frequencies in $O(n)$ time and using a variable to find the "winner" in $O(n)$ time. Now, let's look at the next level: **Top K Frequent Elements**.

// What if instead of just the *single* most frequent extension, the user wants the **Top 2** or **Top 3**?

// If our count map is `{ 'jpg': 10, 'pdf': 8, 'png': 5, 'txt': 2 }` and we want the **Top 2**:
// *   The answer would be `['jpg', 'pdf']`.

// There are a few ways to handle "K" elements:
// 1.  **Sort the Map:** Convert the map to an array of pairs and sort them by count.
// 2.  **Min-Heap:** Keep a "pool" of the K largest elements found so far.

// **Given that sorting takes $O(N \log N)$ and a Heap takes $O(N \log K)$, which approach do you think would be faster if we have 1,000,000 files ($N$) but we only want the Top 3 extensions ($K$)?** 🏎️

// Can you write a function that takes an array of strings and returns a Map where the keys are the strings and the values are their frequencies?

// function frequencyCounter(arr, k) {
//   if (arr.length === 0) {
//     return 0;
//   }
//   let freqMap = new Map();

//   for (let i = 0; i < arr.length; i++) {
//     let key = arr[i];
//     if (freqMap.has(key)) {
//       let value = freqMap.get(key);
//       freqMap.set(key, value + 1);
//     } else {
//       freqMap.set(key, 1);
//     }
//   }

//   let freqCount = 0;
//   let freqKey = "";

//   freqMap.forEach((v, k) => {

//     if (freqCount < v) {
//       freqCount = v;
//       freqKey = k;
//     }
//   });

//   return freqKey;
// }

// const extensions = ["jpg", "png", "jpg", "pdf", "jpg", "pdf"];
// console.log(frequencyCounter(extensions, 1));


// Y
// our code is solid! 🚀 You've correctly implemented the **Frequency Counting** pattern using a `Map` to track occurrences and a "leaderboard" variable to find the maximum in a single pass.

// ### Performance Analysis 📊

// *   **Time Complexity ($O(N)$):** You iterate through the array once to build the map ($O(N)$) and then iterate through the map once to find the winner ($O(N)$).
// *   **Space Complexity ($O(N)$):** In the worst case (where every extension is unique), your map will store $N$ entries.

// **Correction on Space Complexity:** You mentioned $O(N \log K)$. This is usually the time complexity for a **Heap**-based solution. For your current logic, since you store every unique element in a Map, the space complexity is simply $O(N)$.

// ---

// ### Handling the "Tie" Scenario 👔

// You asked what happens if every extension appears only once (a tie). Let's look at your `if` condition:

// ```javascript
// if (freqCount < v) {
//   freqCount = v;
//   freqKey = k;
// }
// ```

// Because you use the **Less Than** operator (`<`):
// 1.  The first element (e.g., "jpg") sets `freqCount` to 1.
// 2.  When the loop hits the next element (e.g., "png"), its value is also 1.
// 3.  Since `1 < 1` is **false**, the `freqKey` remains "jpg".

// **Result:** Your code will return the **first** element that reached that maximum frequency.

// ---

// ### Moving to "Top K" 🏆

// Your current function is hardcoded to return only the single most frequent element (Top 1). However, the problem often asks for the **Top K** elements (e.g., the top 2 or 3).

// To get the Top K using your current Map approach, you would need to:
// 1.  Convert the Map into an Array of entries: `[ ['jpg', 3], ['pdf', 2], ... ]`.
// 2.  Sort that array by the values in descending order.
// 3.  Slice the first `K` elements.



// **If we have to sort the entire map to get the Top K, how does that change the Time Complexity of our function?** ⏱️


// -----------------------------

// time complexity will be nlogn and space complexity will remain oN

// Exactly! Once you introduce that sorting step, the **Time Complexity** shifts from $O(N)$ to **$O(N \log N)$** ⏱️ because you have to compare the frequencies of all unique elements to put them in order.

// ### The "40 LPA" Optimization: The Heap Approach 🚀

// When we have millions of files ($N$) but only want the Top 3 ($K$), we can do better than $O(N \log N)$. 

// Imagine you are watching a race 🏃‍♂️. You don't need to rank every single runner to know who the Top 3 are. You just keep track of the three fastest people you've seen so far. If a new runner finishes faster than your current "3rd place" person, you swap them out.

// In coding, we use a **Min-Heap** of size $K$ to do this:
// 1.  **Count** frequencies with a Map: $O(N)$.
// 2.  **Maintain a Heap** of size $K$: $O(N \log K)$.



// Because $K$ is usually much smaller than $N$, $O(N \log K)$ is significantly faster than sorting everything.

// ---

// ### Final Polish for Today 💎

// You mentioned having "full energy" today, so let's wrap up with one quick logic check on **Zod Validation** (our Tuesday topic).

// In your file upload API, you want to ensure the `fileExtension` is only one of these: `['jpg', 'png', 'pdf']`. If a user tries to upload a `.exe` file, we should reject it.

// **Using your intuition, would it be more efficient to check the file extension inside your `frequencyCounter` loop, or should that be handled by the Zod validation layer before the frequency logic even starts?** 🛡️



// --------------


// Let's explore the **Heap**! It is a specialized tree-based data structure that is perfect for "Top K" problems because it excels at keeping track of the largest or smallest elements in a collection without needing to sort the whole thing. 🌳

// ### What is a Heap?
// Think of a heap as a **priority queue**. While a normal array is just a line of items, a heap organizes data so that the "most important" item is always at the very top (the root).

// There are two main types:
// 1.  **Max-Heap:** The largest value is always at the top. 🏔️
// 2.  **Min-Heap:** The smallest value is always at the top. 🧊

// ### Why use a Min-Heap for "Top K" Largest?
// This sounds counter-intuitive, right? If we want the *largest* items, why use a *Min-Heap*?

// Imagine we want the **Top 3** most frequent extensions. We create a Min-Heap and start adding elements. Once the heap size hits 4, we **remove the top element**. 
// *   Because it's a **Min-Heap**, the element at the top is the *smallest* of those 4.
// *   By kicking out the smallest, we are left with the **3 largest** elements found so far.



// ### Heap Operations
// In languages like C++ or Java, heaps are built-in. In JavaScript, we often have to implement them or use a library, but the logic remains the same:
// *   **Insert ($O(\log K)$):** Add an item and let it "bubble up" to its correct spot.
// *   **Extract Top ($O(\log K)$):** Remove the root and let the next smallest/largest "bubble up."
// *   **Peek ($O(1)$):** Look at the top element without removing it.

// ---

// ### Let's Plan the Logic
// Before we write the code, let's walk through the steps for your `frequencyCounter` using a Heap:

// 1.  **Phase 1:** Create your `freqMap` just like you did before ($O(N)$).
// 2.  **Phase 2:** Iterate through the entries of that Map. 
// 3.  **Phase 3:** Push each entry into a Min-Heap of size $K$.

// **If we are halfway through processing our Map and our Min-Heap (size 3) currently holds counts `[10, 15, 20]`, and the next extension in our Map has a count of `5`, should we add it to our "Top 3" heap?** 🤔






