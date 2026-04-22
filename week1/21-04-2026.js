// Your goal is to move the zeroes to the end without swapping from both ends.The Goal: Input [0, 1, 0, 3, 12] $\rightarrow$ Output [1, 3, 12, 0, 0].

function moveZeroAtLast(arr) {
  if (arr.length === 1) {
    return arr;
  }
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      const temp = arr[count];
      arr[count] = arr[i];
      arr[i] = temp;

      count++;
    }
  }
  console.log("::::::::::::::::::");
  console.log(arr);

  return arr;
}

// Time complexity will be O(N)
// Space complexity will be O(1)

const array4 = [0, 1, 0, 3, 12];

// console.log(array4);

// console.log(moveZeroAtLast(array4));

// Challenge 1: Write a function that takes an array and an index, removes the element at that index, and shifts everything else left without using built-in methods.

// const removeIndexNumber = (arr, n) => {
//   if (n >= arr.length) {
//     return "invalid input number";
//   }
//   let count = n;
//   for (i = n + 1; i < arr.length; i++) {
//     const temp = arr[count];
//     arr[count] = arr[i];
//     arr[i] = temp;
//     count++;
//   }
//   arr.length = arr.length - 1;
//   return arr;
// };

// const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const deleteItem1 = 4;

// console.log(removeIndexNumber(array1, deleteItem1));

//==========================================================================
// 1. The Call Stack (The "To-Do" List)
// JavaScript is single-threaded, meaning it can only do one thing at a time. The Call Stack is the mechanism the JS engine uses to keep track of its place in a script that calls multiple functions.

// LIFO Principle: It follows Last-In, First-Out.

// When you call a function, it is pushed onto the stack.

// When the function finishes, it is popped off the stack.

// Scenario:

// JavaScript
// function greet() {
//   console.log("Hello!");
// }

// function start() {
//   greet();
// }

// start();
// start() is pushed to the stack.

// Inside start, greet() is pushed on top of start.

// greet executes, prints "Hello!", and is popped off.

// start finishes and is popped off. The stack is now empty.

// 2. Hoisting (The "Magic" Lift)
// Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope before code execution.

// Navi's Critical Note: Only the declarations are hoisted, NOT the initializations.

// A. Variable Hoisting
// var: Hoisted and initialized as undefined. This is why you can console.log a var before defining it without an error (but you get undefined).

// let & const: Hoisted but not initialized. They stay in a "Temporal Dead Zone" (TDZ). If you try to access them before the line they are defined, you get a ReferenceError.

// B. Function Hoisting
// Function Declarations: Completely hoisted. You can call the function before it is written in the code.

// Function Expressions (using var/let/const): Follow the rules of variable hoisting.

// 3. The "Interview" Question
// What happens here?

// JavaScript
// console.log(name);
// var name = "Baljeet";

// sayHi();
// function sayHi() {
//   console.log("Hi Navi!");
// }
// Answer:

// undefined is logged (because var name is hoisted but the value "Baljeet" is not).

// "Hi Navi!" is logged (because the whole function was hoisted).
//.
//.
//.
//.
//.
//.
//.
//.

// The Correction: Initialization vs. Assignment
// The Temporal Dead Zone (TDZ) actually ends at the moment of initialization (where you declare it), not necessarily when you assign a new value.

// The Zone: It starts at the beginning of the block and ends when the engine reaches the line where let or const is written.

// The Error: If you touch the variable in that zone, you get a ReferenceError (e.g., "Cannot access 'x' before initialization").

// Visualizing the TDZ
// JavaScript
// {
//   // --- START OF TDZ ---
//   // console.log(user); // ❌ ReferenceError!
//   // --- STILL IN TDZ ---

//   let user = "Baljeet"; // ✨ TDZ ENDS HERE

//   console.log(user); // ✅ Works! Logs "Baljeet"
// }
//.
//.
//.
//.
//.
//.
// Question 1: The "What's the Output?" Challenge
// If I run the following code, what will be logged to the console and in what order?

// JavaScript
// var a = 10;
// function test() {
//     console.log(a);
//     var a = 20;
//     console.log(a);
// }
// test();
// Hint: Think about how var a inside the function is hoisted relative to the console.log.

// Question 2: The TDZ Trap
// Explain why the following code throws an error, even though x is declared at the top of the script.

// JavaScript
// let x = "Global";

// function checkScope() {
//     console.log(x);
//     let x = "Local";
// }
// checkScope();
// Hint: Does the let x inside the function create its own "Temporal Dead Zone" for that block?

// Question 3: The Call Stack vs. Memory
// What happens to the Call Stack if you call a function that calls itself (recursion) without an exit condition? What is the specific error message you usually see in the browser?

// ---

// function recursive() {
//   return recursive();
// }
// console.log(recursive()); // This will cause a "Maximum call stack size exceeded" error due to infinite recursion. 

// ### **Homework: Prefix Sum Level 1 Challenge**

// #### **1. Range Sum Query (The Classic)**
// * **Problem:** Given an array `nums` and multiple queries of the form `(i, j)`, return the sum of elements from index `i` to `j` (inclusive).
// * **Goal:** Use your `prefixSum` array to answer each query in **$O(1)$** time.
// * **Formula Hint:** $Sum(i, j) = Prefix[j] - Prefix[i - 1]$.
// example: `nums = [1, 2, 3, 4]` and query `(1, 3)` $\rightarrow$ Output: `2 + 3 + 4 = 9` (using prefix sums).

// time complexity will be O(N) for preprocessing the prefix sum array, and O(1) for each query after that.
// space complexity will be O(N) for the prefix sum array.

// better approach will be to use the original array to store the prefix sums, which can reduce space complexity to O(1) if we are allowed to modify the input array.

// but can we calculate without using prefix sum array? yes we can calculate the sum of a range by iterating through the elements from index i to j and summing them up, but that would take O(n) time for each query, which is less efficient than using a prefix sum array.
// but the time and space complexity will be O(1) for each query if we are allowed to modify the input array to store the prefix sums, and O(n) for preprocessing the prefix sum array.
// so what is the difference between using a modified input array and loop for each query? the difference is that using a modified input array allows us to answer each query in O(1) time after an initial O(n) preprocessing step, while looping through the elements for each query would result in O(n) time for each query, which can be inefficient if there are many queries.

// for(let k = i; k <= j; k++) {
//   sum += nums[k];
// }

// this will calculate the sum of the range from index i to j in O(n) time for each query, which is less efficient than using a prefix sum array that allows us to answer each query in O(1) time after an initial O(n) preprocessing step.



// #### **2. Find the Pivot Index (Equilibrium Point)**
// * **Problem:** Find the index where the sum of numbers to the left is equal to the sum of numbers to the right.
// * **Example:** `[1, 7, 3, 6, 5, 6]` $\rightarrow$ Index 3 is the pivot because $1+7+3 = 11$ and $5+6 = 11$.
// * **Goal:** Solve this in $O(n)$ time.

// ------------
// const pivotArr = [1, 7, 3, 6, 5, 6];
// function findPivotIndex(arr) {
//   if (arr.length < 1) {
//     return "Array should have some no.";
//   }
//   let prefSum = [];
//   prefSum[0] = arr[0];
//   for (let i = 1; i < arr.length; i++) {
//     prefSum[i] = prefSum[i - 1] + arr[i];
//   }

//   for (let i = 1; i < arr.length; i++) {
//     const leftsum = prefSum[i - 1];
//     const rightsum = prefSum[prefSum.length-1] - prefSum[i];

//     if (leftsum === rightsum) {
//       return i;
//     }
//   }

//   return 0;
// }

// ---------------------beter approch
// const pivotArr = [1, 7, 3, 6, 5, 6];

// function findPivotIndex(arr) {
//   let totalsum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     totalsum += arr[i];
//   }

//   let leftsum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     const rightsum = totalsum - leftsum - arr[i];
//     if (leftsum === rightsum) {
//       return i;
//     }
//     leftsum += arr[i];
//   }
//   return null;
// }

// console.log(findPivotIndex(pivotArr));

// #### **3. Running Sum of 1D Array (LeetCode #1480)**
// * **Problem:** Given an array `nums`, return the running sum as `[nums[0], nums[0]+nums[1], ...]`.
// * **Goal:** Try to do this **in-place** (Space Complexity $O(1)$) by modifying the original array instead of creating a new `prefArray`.

// **Input:** `nums = [1, 2, 3, 4]`

// let runArr = [3, 1, 2, 10, 1];
// // Target Output: [3, 4, 6, 16, 17]
// function getRuningArr(arr) {
//   for (let i = 1; i < arr.length; i++) {
//     arr[i] = arr[i - 1] + arr[i];
//   }
//   return arr;
// }

// // time complexity will be o(n)
// // space complexity will be o(1)

// console.log(getRuningArr(runArr));

// * **Step 1:** Leave `nums[0]` as it is. (`1`)
// * **Step 2:** `nums[1]` becomes `nums[0] + nums[1]` $\rightarrow$ $1 + 2 = \mathbf{3}$
// * **Step 3:** `nums[2]` becomes `nums[1] + nums[2]` $\rightarrow$ $3 + 3 = \mathbf{6}$
// * **Step 4:** `nums[3]` becomes `nums[2] + nums[3]` $\rightarrow$ $6 + 4 = \mathbf{10}$

// **Result:** `[1, 3, 6, 10]`

// > **Navi's Tip:** Notice that in Step 3, we used the **updated** `nums[1]` (which was 3) to add to the current value. This is how you build a prefix sum without needing an extra array!

// ---
// #### **4. Find Highest Altitude**
// * **Problem:** A biker starts at altitude 0. You are given an array `gain` of length $n$ where `gain[i]` is the net gain in altitude between points $i$ and $i+1$. Return the highest altitude reached.
// * **Example:** `[-5, 1, 5, 0, -7]` $\rightarrow$ Altitudes are `[0, -5, -4, 1, 1, -6]`. Max is `1`.

// ### **Example for Question 4: Highest Altitude**
// Think of this like your **Step Tracker** or **Calorie Counter**. You start at 0, and the array tells you if you went up or down.

// **Input:** `gain = [-4, -3, -2, -1, 4, 3, 2]`

// 1.  **Start:** Altitude = $0$ (This is your initial `max`)
// 2.  **Point 1:** $0 + (-4) = -4$
// 3.  **Point 2:** $-4 + (-3) = -7$
// 4.  **Point 3:** $-7 + (-2) = -9$
// 5.  **Point 4:** $-9 + (-1) = -10$
// 6.  **Point 5:** $-10 + 4 = -6$
// 7.  **Point 6:** $-6 + 3 = -3$
// 8.  **Point 7:** $-3 + 2 = -1$

// **All Altitudes Reached:** `[0, -4, -7, -9, -10, -6, -3, -1]`
// **The Highest Altitude:** **$0$** (because you never went above the starting point).

// ---

// so first we have to claculate the prefix sum of the array and then we have to retrun max element from that array which will be the highest altitude reached by the biker.

// const gain = [-5, 1, 5, 0, -7];  

// function findHighestAlt(gain) {
//   let prefSum = [];
//   prefSum[0] = gain[0];
//   for (let i = 1; i < gain.length; i++) {
//     prefSum[i] = prefSum[i - 1] + gain[i];
//   }

//   let max = -Infinity;
//   for (let i = 0; i < prefSum.length; i++) {
//     if (prefSum[i] > max) {
//       max = prefSum[i];
//     }
//   }
//   return max;
// }

// better approach will be to calculate the prefix sum and max at the same time without using extra space for prefix sum array.

// const gain = [-5, 1, 5, 0, -7];

// function findHighestAlt(gain) {
//   let max = 0;
//   let currentAlt = 0;  
//   for (let i = 0; i < gain.length; i++) {
//     currentAlt += gain[i]; // Update the current altitude based on the gain
//     if (currentAlt > max) { // Check if the current altitude is the highest so far
//       max = currentAlt;
//     }
//   }
//   return max;
// }  

// console.log(findHighestAlt(gain));

