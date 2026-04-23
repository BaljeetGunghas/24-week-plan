// let i = 1;

// for (i;i <= 3; i++) {
//     setTimeout(function() {
//         console.log(i);
//     }, 1000);
// }

// const nums = [2, 7, 11, 15];
// const target = 9;

// function twoSumSorted(arr, target) {
//   let left = 0;
//   let right = arr.length - 1;
//   // since we have shorted array so we have idea we have to increase left or decrease right
//   while (left < right) {
//     let sum = arr[left] + arr[right];
//     if (sum === target) {
//       return [left, right];
//     } else if (sum < target) {
//       left++;
//     } else {
//       right--;
//     }
//   }

//   return null;
// }

// console.log(twoSumSorted(nums, target)); // Expected: [0, 1]

// let str = ["h", "e", "l", "l", "o"];

// function reverseString(arr) {
//   let left = 0;
//   let right = arr.length - 1;

//   while (left < right) {
//     [arr[left], arr[right]] = [arr[right], arr[left]];

//     left++;
//     right--;
//   }

//   return str;
// }
// // TC : O(n/2) => O(N)
// // SC : O(1)
// console.log(reverseString(str));

// function createGame() {
//   let score = 0;

//   return {
//     gainPoints: () => {
//       score++;
//       return score;
//     },
//   };
// }

// const game = createGame();

// const gainPoints = game.gainPoints;

// console.log(gainPoints());

// function findMiddle(arr) {
//   let slow = 0;
//   let fast = 0;

//   while (fast < arr.length - 2 || fast < arr.length-1) {
//     slow++;
//     fast += 2;
//   }

//   return arr[slow];
// }

// console.log(findMiddle([1, 2, 3, 4, 5])); // Should return 3
// console.log(findMiddle([1, 2, 3, 4, 5, 6])); // Should return 4

// correct approch --------------------------
// function findMiddle(arr) {
//   let slow = 0;
//   let fast = 0;

//   // As long as fast can move 2 steps, keep going
//   while (fast < arr.length && arr[fast + 1] !== undefined) {
//     slow++;
//     fast += 2;
//   }

//   return arr[slow];
// }

// ---------------------------------------------

// // console.log("1");

// // setTimeout(() => {
// //   console.log("2");
// // }, 0);

// // Promise.resolve().then(() => {
// //   console.log("3");
// // });

// // console.log("4");

// // so for this output will be 

// // 1
// // 4
// // 3
// // 2

// // 1 and 4 will execute imediately while 2 and 3 will are async task so they will be added in seprate queue 
// // 2 will be added in task queue 
// // and 3 will be added in the microtask queue 
// // so when call stack is empty then first it will check microtask queue and it will execute 3 then it will check for task queue so that will be the order 

// // as you mention 
// // Task Queue (Macrotasks): setTimeout, setInterval, setImmediate.

// // Microtask Queue (VIPs): Promises (.then, .catch, .finally) and MutationObserver.


// let str1= "racecar"
// let str2 = "hello"
// let str3 = "a"
// let str4 = ""
// let str5 = "ab"
// let str6 = "Ama"


// function checkPalindrom(str){
//     if(str.length === 0 || str.length === 1){
//         return true
//     }
//     let left = 0
//     let right = str.length-1;

//     while (left < right){
//         let leftChar = str.charAt(left).toLowerCase()
//         let rightChar = str.charAt(right).toLowerCase() 
        
//         if(leftChar !== rightChar){
//             return false 
//         }

//         left++
//         right--
//     }

//     return true
// }

// console.log(checkPalindrom(str1)) // true
// console.log(checkPalindrom(str2)) // false
// console.log(checkPalindrom(str3)) // true
// console.log(checkPalindrom(str4)) // true
// console.log(checkPalindrom(str5)) // false
// console.log(checkPalindrom(str6)) // true


// -----------------------------------------

// The Final Boss Challenge of Day 4
// Since we still have about 20 minutes before our 11:30 PM cutoff, I want to give you one tiny "Advanced Two-Pointer" puzzle. It’s a very slight variation of what you just did.

// Problem: Valid Palindrome II

// Given a string, you can delete at most one character. Can you still make it a palindrome?

// Input: "aba" → Output: true (already a palindrome)

// Input: "abca" → Output: true (you can delete 'b' to get "aca" or 'c' to get "aba")

// Input: "abcde" → Output: false

// Think about the logic:
// When your pointers left and right find a mismatch (e.g., 'b' vs 'c' in "abca"), you have two choices:

// Try skipping the left character and check if the rest is a palindrome.

// Try skipping the right character and check if the rest is a palindrome.

// Don't worry about writing the full code for this one tonight unless you really want to. Instead, just tell me: How would you use the checkPalindrom function you already wrote to solve this? Just explain the logic in 2–3 sentences. This is how you show an interviewer you can "reuse" code efficiently.


// -----------------my input -----------------
// yes sure so here in the above question first 
// we will create a new variable called count with value 0
// in first if condion we will check if leftchar !== rightchar 
// if(count ===1) return false 


// then we will compair str.charAt(left +1) === rightchar || str.charAt(right- 1) === leftchar
// count++
// else return false 

// out of the loop if its work fine then return true

// ------------------my input end-----------------

// optimal solution
// The Optimized Logic
// When you hit a mismatch (str[left] !== str[right]):

// Option A: Check if the substring from left + 1 to right is a palindrome.

// Option B: Check if the substring from left to right - 1 is a palindrome.

// If either one is true, the whole thing is true.

// function validPalindromeII(s) {
//     let left = 0;
//     let right = s.length - 1;

//     while (left < right) {
//         if (s[left] !== s[right]) {
//             // Check both possibilities: skip left or skip right
//             return isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1);
//         }
//         left++;
//         right--;
//     }   
//     return true; // If we made it through the loop, it's already a palindrome
// }

// function isPalindrome(str, left, right) {
//     while (left < right) {
//         if (str[left] !== str[right]) {
//             return false;
//         }
//         left++;
//         right--;
//     }
//     return true;
// }

// console.log(validPalindromeII("aba")); // true
// console.log(validPalindromeII("abca")); // true
// console.log(validPalindromeII("abcde")); // false

// time complexity : O(N) where N is the length of the string, because in the worst case we might have to check the entire string once for the initial palindrome check and once more for the substring check.

// Space complexity : O(1) because we are using only a constant amount of extra space for the pointers and the count variable.