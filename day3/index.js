const fs = require('fs');

try {
  let dataString = '';
  const data = fs.createReadStream('./data.txt');

  data.on('data', chunk => dataString += chunk);

  data.on('end', () => {
    const calculateProducts = (input) => {
      return input.match(/mul\(\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/g).map(num => {
        const [, left, right] = num.match(/mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/);
        return Number(left) * Number(right);
      });
    };

    const products = calculateProducts(dataString);
    console.log('Part 1:', products.reduce((a, b) => a + b));

    const sections = dataString.split(/(?=do\(\)|don't\(\))/);
    const doStrings = sections.filter(section => !section.includes("don't()")).join('');

    const products2 = calculateProducts(doStrings);
    console.log('Part 2:', products2.reduce((a, b) => a + b));
  });

} catch (e) {
  console.log('error: ', e);
}



