// const str = "abcb";

// function longestSubstringWithoutDup(str) {
//   let left = 0;
//   let right = 0;
//   let maxLength = 0;
//   let charSet = new Set();

//   while (right < str.length) {
//     if (charSet.has(str[right])) {
//       charSet.delete(str[left]);
//       left++;
//     } else {
//       charSet.add(str[right]);
//       maxLength = Math.max(maxLength, right - left + 1);
//       right++;
//     }
//   }
//   return maxLength;
// }

// // time complexity will be O(N) because we are travesing the string only one time
// // space complexity will be O(min(N,M)) where N is the length of the string and M is the size of the character set (e.g., 26 for lowercase letters).

// console.log(longestSubstringWithoutDup(str));



// Optimization Challenge

// 🚀While $O(n)$ is efficient, we can optimize the number of steps the left pointer ⬅️ takes. In your current version, if the duplicate is deep inside the window, the while loop has to run multiple times just to "catch up" the left pointer.


// We can use a Map 🗺️ instead of a Set to store the index of each character. This allows us to "jump" the left pointer directly to the correct spot in a single step.

// If we use a Map to store { character: next_index }, and we are at "abcb":

// We see b at index 1. Our Map stores {'b': 2} (the position after b).

// When we hit the second b at index 3, we check the Map.

// If the Map tells us the "safe" next position is 2, how would we update the left pointer to ensure it only moves forward and never backward? 🧭


function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  let charMap = new Map();
    for (let right = 0; right < s.length; right++) {
    if (charMap.has(s[right]) && charMap.get(s[right]) >= left) {
      left = charMap.get(s[right]) + 1;
    }
    charMap.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  } 
    return maxLength;
}

// time complexity will be O(N) because we are travesing the string only one time
// space complexity will be O(min(N,M)) where N is the length of the string and M is the size of the character set (e.g., 26 for lowercase letters).        

const s = "pwwkew";
console.log(lengthOfLongestSubstring(s));