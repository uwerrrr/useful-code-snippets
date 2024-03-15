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

/// Move the first letter of each word to the end of it, then add "ay" to the end of the word. Leave punctuation marks untouched.
// e.g.
// pigIt('Pig latin is cool'); // igPay atinlay siay oolcay
// pigIt('Hello world !');     // elloHay orldway !
const pigIt = (str) => {
  const lettersRegex = /^[a-zA-Z]+$/;
  const strArr = str.split(" ").map((word) => {
    if (lettersRegex.test(word)) {
      const firstLetter = word[0];
      const flippedWord = word.slice(1, word.length) + firstLetter + "ay";
      return flippedWord;
    }
    return word;
  });
  return strArr.join(" ");
};

/// PaginationHelper class
/* var helper = new PaginationHelper(['a','b','c','d','e','f'], 4);
helper.pageCount(); // should == 2
helper.itemCount(); // should == 6
helper.pageItemCount(0); // should == 4
helper.pageIndex(5); // should == 1 (zero based index)
*/
class PaginationHelper {
  constructor(collection = [], itemsPerPage = 0) {
    // The constructor takes in an array of items and a integer indicating how many
    // items fit within a single page
    this.collection = collection;
    this.itemsPerPage = itemsPerPage;
    this.itemCount = this.collection.length;
    this.pageCount = Math.ceil(this.collection.length / this.itemsPerPage);
    this.pages = [];
    for (let i = 0; i < this.pageCount; i++) {
      this.pages[i] = [];
      for (let j = 0; j < this.itemsPerPage; j++) {
        let index = i * this.itemsPerPage + j;
        if (index < this.itemCounts) {
          this.pages[i][j] = collection[j + this.itemsPerPage * i];
        }
      }
    }
  }
  getItemCount() {
    // returns the number of items within the entire collection
    return this.itemCount;
  }
  getPageCount() {
    // returns the number of pages
    return this.pageCount;
  }
  getPageItemCount(pageIndex) {
    // returns the number of items on the current page. page_index is zero based.
    // this method should return -1 for pageIndex values that are out of range
    return this.pages[pageIndex] ? this.pages[pageIndex].length : -1;
  }
  getPageIndex(itemIndex) {
    // determines what page an item is on. Zero based indexes
    // this method should return -1 for itemIndex values that are out of range
    const pageIndex = Math.floor(itemIndex / this.itemsPerPage);
    return pageIndex < this.pageCounts &&
      pageIndex >= 0 &&
      itemIndex < this.itemCounts
      ? pageIndex
      : -1;
  }
}

//** FUNCTION CHAINING **/
/* a function that will add numbers together when called in succession.
add(1)(2); // == 3 */
const add = (n) => {
  const adder = (x) => {
    let sum = n + x;
    return add(sum);
  };

  adder.valueOf = () => {
    return n;
  };

  return adder;
};

//** Container of integers **/
/**
 * A container of integers that should support
 * addition, removal, and search for the median integer
 */
class Container {
  constructor() {
    this.numbers = [];
  }

  add(value) {
    this.numbers.push(value);
  }

  /**
   * Attempts to delete one item of the specified value from the container
   *
   * @param {number} value
   * @return {boolean} true, if the value has been deleted, or
   *                   false, otherwise.
   */
  delete(value) {
    // filter method
    // this.numbers = this.numbers.filter((number) => number !== value)

    // slice method
    let index = this.numbers.indexOf(value);
    if (index > -1) {
      this.numbers.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Finds the container's median integer value, which is
   * the middle integer when the all integers are sorted in order.
   * If the sorted array has an even length,
   * the leftmost integer between the two middle
   * integers should be considered as the median.
   *
   * @return {number} the median if the array is not empty, or
   * @throws {Error} a runtime exception, otherwise.
   */
  getMedian() {
    this.numbers.sort((a, b) => a - b);
    let medianIndex = 0;
    if (this.numbers.length <= 0) {
      throw Error();
    }
    if (this.numbers.length % 2 == 0) {
      medianIndex = this.numbers.length / 2 - 1;
    } else {
      medianIndex = Math.floor(this.numbers.length / 2);
    }

    return this.numbers[medianIndex];
  }
}

/* HASHING password and authorization */

function authEvents(events) {
  const p = 131;
  const m = 10 ** 9 + 7;

  let allChars = [];
  for (let i = 48; i < 122; i++) {
    allChars.push(String.fromCharCode(i));
  }

  const ascii = (char) => {
    return char.charCodeAt(0);
  };

  const partialHash = (string) => {
    let result = 0;
    let asciiChars = string.split("").map((char) => {
      return ascii(char);
    });
    let charLen = asciiChars.length;

    result = asciiChars.reduce((acc, curr, index) => {
      acc += curr * p ** (charLen - (index + 1));

      return acc;
    }, 0);
    return result;
  };

  const hash = (partialHash) => {
    return partialHash % m;
  };

  let currPass = "";

  let currPartialHash;
  let currHash;

  let hashToCheck = 0;

  let result = [];

  for (let i = 0; i < events.length; i++) {
    const element = events[i];
    if (typeof element === "number") {
      continue;
    } else {
      if (element[0] === "setPassword") {
        currPass = element[1];
        currPartialHash = partialHash(currPass);
        currHash = hash(currPartialHash);
      } else {
        hashToCheck = Number(element[1]);
        if (currHash === hashToCheck) {
          result.push(1);
        } else {
          let found = false;
          for (let j = 0; j < allChars.length; j++) {
            let appendedHash = hash(currPartialHash * p + ascii(allChars[j]));

            if (appendedHash === hashToCheck) {
              found = true;
              break;
            }
          }
          result.push(found ? 1 : 0);
        }
      }
    }
  }

  return result;
}

/* Given an array of numbers and a target sum
Count how many distinct pair of numbers that make up the target sum
e.g. array = [5,7,9,13,11,6,6,3,3] / target = 12 
==> count = 3 => 3 distinct pairs: (5,7); (3,9) ; (6, 6)
*/

///========= Option 1: double loops - easy to read
// function stockPairs(stocksProfit, target) {
//     let count = 0;
//     let totalStock = stocksProfit.length;
//     console.log(totalStock);
//     let checkedStocksI = new Set();
//     stocksProfit = stocksProfit.sort((a, b) => a - b);

//     for (let i = 0; i < totalStock; i++) {
//         let currentStock = stocksProfit[i];
//         let checkedStocksJ =  new Set();
//         if (checkedStocksI.has(currentStock)){
//                 continue
//             }
//         for( let j = i + 1; j < totalStock; j++) {
//             let nextStock = stocksProfit[j];

//             if (checkedStocksJ.has(nextStock)){
//                     continue
//                 }
//             let sum = currentStock + nextStock
//             if (sum === target) {
//                 // console.log(`${sum} = ${currentStock} + ${nextStock}`)
//                 count += 1;
//             }
//             checkedStocksJ.add(nextStock);
//         }
//         checkedStocksI.add(currentStock);
//     }
//     return count;
// }

///========= Option 2: occurrence mapping
// function stockPairs(stocksProfit, target) {
//     stocksProfit = stocksProfit.sort((a, b) => a - b);
//     let count = 0;
//     let profitOccurMap = new Map();
//     let countedPairs = new Set();

//     for (let i = 0; i < stocksProfit.length; i++) {
//         let currentProfit = stocksProfit[i];
//         let diff = target-currentProfit;

//         if (profitOccurMap.has(diff) && !countedPairs.has(diff) && !countedPairs.has(currentProfit)){
//             count += 1
//             countedPairs.add(diff)
//             countedPairs.add(currentProfit)
//         }

//         if (!profitOccurMap.has(currentProfit)){
//             profitOccurMap.set(currentProfit, 0);
//         }

//         profitOccurMap.set(currentProfit, profitOccurMap.get(currentProfit) + 1);
//     }

//     return count;
// }

///========= Option 3: only use Set()
function stockPairs(stocksProfit, target) {
  stocksProfit = stocksProfit.sort((a, b) => a - b);
  let count = 0;
  let profitSet = new Set();
  console.log(profitSet);
  let countedPairs = new Set();

  for (let i = 0; i < stocksProfit.length; i++) {
    let currentProfit = stocksProfit[i];
    let diff = target - currentProfit;

    if (
      profitSet.has(diff) &&
      !countedPairs.has(diff) &&
      !countedPairs.has(currentProfit)
    ) {
      count += 1;
      countedPairs.add(diff);
      countedPairs.add(currentProfit);
    }

    if (!profitSet.has(currentProfit)) {
      profitSet.add(currentProfit);
    }
  }

  return count;
}
