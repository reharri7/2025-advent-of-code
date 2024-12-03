const fs = require('fs');

const leftArray = [];
const rightArray = [];

try {
  let data;
  let dataString = '';
  data = fs.createReadStream('./data.txt');

  data.on('data', chunk => {
    dataString += chunk;
  });

  data.on('end', () => {
    let counter = 0;
    const numbers = dataString.split(/\s+/).map(Number).filter(n => !isNaN(n));
    numbers.forEach(num => {
      if (counter % 2 === 0) {
        rightArray.push(num);
      } else {
        leftArray.push(num);
      }
      counter++;
    });
    leftArray.sort((a, b) => a - b);
    rightArray.sort((a, b) => a - b);
    const differences = leftArray.map((num, index) => Math.abs(num - rightArray[index]));
    console.log('PART 1');
    console.log(differences.reduce((a, b) => a + b));

    console.log('PART 2');
    const similarityArr = leftArray.map((num) => {
      const freq = frequency(num, rightArray);
      return num * freq;
    });
    console.log(similarityArr.reduce((a, b) => a + b));
  });

} catch (e) {
  console.log('error: ', e);
}

function frequency(num, arr) {
  let counter = 0;
  arr.forEach(n => {
    if (n === num) {
      counter++;
    }
  });
  return counter;
}



