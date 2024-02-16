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
