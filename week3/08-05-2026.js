// function logestSubstringWithoutRepeatingCharacters(s) {
//   if (s.length === 0) {
//     return 0;
//   } else if (s.length === 1) {
//     return 1;
//   }

//   const set = new Set();

//   let left = 0;
//   let count = 0;

//   for (let right = 0; right < s.length - 1; right++) {
//     while (set.has(s[right])) {
//       set.delete(s[left]);
//       left++;
//     }
//     let tempLength = right - left + 1;
//     count = Math.max(count, tempLength);
//     set.add(s.charAt(right));
//   }

//   return count;
// }

// const str = "abcabcbb";
// console.log(logestSubstringWithoutRepeatingCharacters(str)); // Output: 3 (the longest substring is "abc")

// Your logic for the time and space complexity is spot on! You correctly identified that even with a nested `while` loop, each character is visited at most twice (once by `right` and once by `left`), keeping the performance linear.

// However, there are two small "bugs" in your code that would prevent it from getting the correct answer for every string. Let’s look at them:

// ### 1. The `s.length - 1` Trap

// In your `for` loop, you have: `right < s.length - 1`.

// * **The Issue:** This stops the loop one character **before** the end of the string.
// * **The Result:** If the longest substring is at the very end (like `"abccdef"`), your code will miss the last character `'f'`.
// * **The Fix:** Use `right < s.length`.

// ### 2. The Order of Operations

// In your loop, you calculate `tempLength` **before** adding the current character `s[right]` to the Set.

// * **The Issue:** This means your `count` is always one step behind.
// * **The Fix:** Add the character to the Set first, *then* calculate the length.

// ---

// ### Optimized Basic Version

// Here is your code with those two small corrections:

// ```javascript
// function longestSubstringWithoutRepeatingCharacters(s) {
//   if (s.length === 0) return 0;

//   const set = new Set();
//   let left = 0;
//   let count = 0;

//   // 1. Loop through the entire string (remove the -1)
//   for (let right = 0; right < s.length; right++) {

//     while (set.has(s[right])) {
//       set.delete(s[left]);
//       left++;
//     }

//     // 2. Add the character FIRST
//     set.add(s[right]);

//     // 3. Then calculate the window size
//     let tempLength = right - left + 1;
//     count = Math.max(count, tempLength);
//   }

//   return count;
// }

// ```

// ---

// ### Why is SC $O(n)$?

// You mentioned the Space Complexity is $O(n)$ in the worst case.

// * **Scenario:** Imagine a string like `"abcdefg"` (all unique).
// * **Result:** The `Set` will eventually hold every single character of the string at once before the loop finishes. That's why it scales linearly with the input size.

// ### A "Senior" Optimization Tip

// Since you are aiming for high-performance roles, there is a way to make this even faster. Instead of a `Set`, you can use a **Map** to store the **index** of the character.

// Instead of moving `left` one by one in a `while` loop, you could "jump" `left` directly to `lastSeenIndex + 1`.

// **Would you like to try rewriting it using the "Map Jump" method, or should we move on to the next DSA problem on your list?**

// function logestSubstringWithoutRepeatingCharacters(s) {
//   if (s.length === 0) {
//     return 0;
//   } else if (s.length === 1) {
//     return 1;
//   }

//   const map = new Map();

//   let left = 0;
//   let count = 0;

//   for (let right = 0; right < s.length; right++) {
//     const char = s[right];

//     if (map.has(char)) {
//       left = Math.max(left, map.get(char) + 1);
//     }
//     map.set(char, right);
//     count = Math.max(count, right - left + 1);
//   }

//   return count;
// }

// const str = "abcabcbb";
// console.log(logestSubstringWithoutRepeatingCharacters(str)); // Output: 3 (the longest substring is "abc")

// function groupAnagrams(strs) {
//   const map = new Map();

//   for (let i = 0; i < strs.length; i++) {
//     const word = strs[i].split("").sort().join("");
//     if (map.has(word)) {
//       map.get(word).push(strs[i]);
//     } else {
//       map.set(word, [strs[i]]);
//     }
//   }

//   return map;
// }

// const input = ["eat", "tea", "tan", "ate", "nat", "bat"];

// console.log(groupAnagrams(input));

// function groupAnagrams(strs) {
//   const map = new Map();

//   for (let i = 0; i < strs.length; i++) {
//     let arr = new Array(26).fill(0);

//     for (let j = 0; j < strs[i].length; j++) {
//       const charCode = strs[i].charCodeAt(j) - 97;
//       arr[charCode] += 1;
//     }
    
//     const strArr = arr.toLocaleString();

//     if (map.has(strArr)) {
//       map.get(strArr).push(strs[i]);
//     } else {
//       map.set(strArr, [strs[i]]);
//     }
//   }

//   return map;
// }

// const input = ["eat", "tea", "tan", "ate", "nat", "bat"];

// console.log(groupAnagrams(input));


// TC: O(n*K)
// where n is the lenght of array and k is the largest word in the array 

// SC:O(N)
