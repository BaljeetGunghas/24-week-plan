const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
// Output: [1, 1, 4, 2, 1, 1, 0, 0]
function DailyWarmUp(arr) {
  if (arr.length === 0) {
    return "invlaid input !!";
  }
  if (arr.length === 1) {
    return [0];
  }

  const TempTrek = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    let right = i + 1;

    while (arr[right] <= arr[i] && right < arr.length) {
      right++;
    }
    let dayWait = right - i;
    let notMaxTempFound = right === arr.length ? true : false;
    if (notMaxTempFound) {
      TempTrek[i] = 0;
    } else {
      TempTrek[i] = dayWait;
    }
  }

  return TempTrek;
}

console.log(DailyWarmUp(temperatures));

// TC: O(N2) because in the werse case if there is no temp greateer then start temp then we have to iterate over the full arrya
// SC : O(N) because we are using full space of the arr