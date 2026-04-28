function maxSum(arr, k) {
  let sum = 0;

  if (arr.length < k) {
    return "Invalid Input";
  }
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  let i = k;
  let temp = sum;
  while (i < arr.length - 1) {
    temp = temp - arr[i - k] + arr[i ];
    if (temp > sum) {
      sum = temp;
    }

    i++;
  }
  return sum;
}

let arr = [2, 1, 5, 1, 3, 2];
let k = 3;

// time complexity will be O(N)
// space complexity will be O(1)
console.log("max sum of all the " + k + " element is : ", maxSum(arr, k));



const buf = Buffer.from("Hi Navi");
console.log(buf); 
console.log(buf.toString());
console.log(buf.toJSON());

// <Buffer 48 69 20 4e 61 76 69>
// Hi Navi
// {
//   type: 'Buffer',
//   data: [
//     72, 105,  32, 78,
//     97, 118, 105
//   ]
// }