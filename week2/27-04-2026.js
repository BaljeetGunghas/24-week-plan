// let NO_OF_CHARS = 256;

// function isAnagram(s, t) {
    
//   if (s.length !== t.length) {
//     return false;
//   }

//   let array = new Array(NO_OF_CHARS).fill(0);

//   for (let i = 0; i < s.length; i++) {
//     array[s[i].charCodeAt(0)]++;
//   }
//   for (let i = 0; i < t.length; i++) {
//     array[t[i].charCodeAt(0)]--;
//   }

//   let i = 0;
//   while (i < array.length) {
//     if (array[i] > 0) return false;

//     i++;
//   }

//   return true;
// }



// // time complexity will be O(N)
// // space complexity will be O(1) here i am not sure like we are createing array of length 256 that's a constant lenght so thats why i am thinking that the space complexity will be order of 1

// console.log(isAnagram("abecde", "aebecd"));

// console.log("A");

// setTimeout(() => {
//   console.log("B");
// }, 0);

// Promise.resolve().then(() => {
//   console.log("C");
// });

// console.log("D");


// // output will be :::

// // A
// // D 
// // C microtask queue include promice(.then .catch .finialy) , async await 
// // B macroTask queue include settimeout , timeinterval, setimediate


// async function myFunc() {
//   console.log("1");
//   await Promise.resolve();
//   console.log("2");
// }

// console.log("3");
// myFunc();
// console.log("4");


// // "3" sync
// // "1" sync
// // "4" async event loop move this task to microtask queue
// // "2" after async this one also move to microtask queue