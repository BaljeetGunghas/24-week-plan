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