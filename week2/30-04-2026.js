

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
