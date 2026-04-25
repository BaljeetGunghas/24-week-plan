// Sum of N Numbers

// Example: sumRange(3) should return 6 ($3 + 2 + 1$).
// Example: sumRange(5) should return 15 ($5 + 4 + 3 + 2 + 1$).

// function sumrange(num) {
//   // if number is equal to 1 than i have to stop this rescursion fun
//   // this is the main track for recursion if we missed this condition over call stack will overflow and excude memorey
//   if (num === 1) {
//     return 1;
//   }

//   return num + sumrange(num - 1);
// }

// console.log(sumrange(3));
// console.log(sumrange(5));

// Challenge: Fibonacci Sequence

// function fibonacciSeq(num) {
//     // here we have to return the nth number in the fibonacci sequence where the first two numbers are 1 and 1
//     // and each subsequent number is the sum of the previous two numbers. So the sequence starts like this: 1, 1, 2, 3, 5, 8, 13, ...
//   if (num <= 2) {
//     return 1;
//   }
//   return fibonacciSeq(num - 1) + fibonacciSeq(num - 2);
// }

// console.log(fibonacciSeq(5));
// console.log(fibonacciSeq(6));
// console.log(fibonacciSeq(60)); // This will take a very long time to compute due to the exponential growth of the number of function calls.

