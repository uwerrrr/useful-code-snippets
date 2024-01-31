function topThreeWords(text) {
  const textArr = text
    .toLowerCase()
    .replace(/[\/=\-+_*&^%$#@!`~\]\[|\}\{";:/.,?><\)\(]/g, "")
    .replace(" ' ", "")
    .split(" ")
    .filter((word) => word != "");

  const uniqueWords = textArr.reduce((acc, curr) => {
    if (!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  // const countObj = uniqueWords.reduce((acc, curUniqueWrd) => {
  //   const wrdCount = textArr.reduce((count, curWrd) => {
  //     if (curWrd === curUniqueWrd) {
  //       count = count + 1;
  //     }
  //     return count;
  //   }, 0);
  //   acc = { [curUniqueWrd]: wrdCount, ...acc };
  //   return acc;
  // }, {});

  const countObj = uniqueWords.reduce((acc, curUniqueWrd) => {
    const wrdCount = textArr.filter((word) => word === curUniqueWrd).length;
    acc = { [curUniqueWrd]: wrdCount, ...acc };
    return acc;
  }, {});

  const sortedUniqueWords = uniqueWords.sort((a, b) => {
    return countObj[b] - countObj[a];
  });

  const topThree = sortedUniqueWords.splice(0, 3);

  console.log(topThree);

  return topThree.length !== 0 ? topThree : [];
}

const josephusSurvivor = (n, k) => {
  let cutIndex = 0;

  // initial arr from 1 to n
  let currArr = new Array(n).fill(0).map((_, i) => i + 1);
  let currArrLen = currArr.length;

  while (currArrLen > 1) {
    cutIndex = cutIndex + k - 1;

    while (currArrLen <= cutIndex) {
      cutIndex = cutIndex - currArrLen;
    }

    currArr.splice(cutIndex, 1);

    currArrLen = currArr.length;
  }

  return currArr[0];
};

/// Flip an Object
const flipKeysAndValues = (obj) => {
  const entries = Object.entries(obj);
  const flippedEntries = entries.map((entry) => entry.reverse());
  const output = Object.fromEntries(flippedEntries);
  return output;
};

///// Convert roman numbers to and from numeric numbers
class RomanNumerals {
  static romanNumDict = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  static toRoman(num) {
    const romanNumDictDesc = Object.fromEntries(
      Object.entries(this.romanNumDict).sort((a, b) => b[1] - a[1])
    );

    let result = "";
    Object.keys(romanNumDictDesc).forEach((romanKey, i) => {
      while (num >= romanNumDictDesc[romanKey]) {
        num = num - romanNumDictDesc[romanKey];
        result = result + romanKey;
      }
    });

    return result;
  }

  static fromRoman(str) {
    let result = 0;

    for (let i = 0; i < str.length; i++) {
      const curChar = str[i];
      const curVal = this.romanNumDict[curChar];
      const nextChar = str[i + 1];
      const nextVal = this.romanNumDict[nextChar];

      if (curVal < nextVal) {
        result = result + nextVal - curVal;
        i++; // skip next char
      } else {
        result = result + curVal;
      }
    }

    return result;
  }
}

/// convert array of integers to ordered string list in range
// e.g.
// solution([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
// returns "-10--8,-6,-3-1,3-5,7-11,14,15,17-20"
const solution = (list) => {
  list.sort((a, b) => a - b); // sort list arr

  let curRange = "";
  let rangeStart;
  let rangeEnd;

  const result = list.reduce((acc, curr, arrIndex, arr) => {
    if (curr <= rangeEnd) {
      // skip if curr <= rangeEnd
      acc = acc;
    } else if (
      // if in range
      arr[arrIndex + 1] === curr + 1 &&
      arr[arrIndex + 2] === curr + 2
    ) {
      rangeStart = curr;
      rangeEnd = curr + 2;

      for (let i = arrIndex + 2; i < arr.length; i++) {
        if (arr[i + 1] === rangeEnd + 1) {
          rangeEnd = arr[i + 1];
        }
      }

      curRange = `${rangeStart}-${rangeEnd}`;
      acc = curr === arr[0] ? curRange : acc + "," + curRange;
    } else {
      // if no range

      acc = curr === arr[0] ? `${curr}` : acc + "," + `${curr}`;
    }

    return acc;
  }, "");

  return result;
};