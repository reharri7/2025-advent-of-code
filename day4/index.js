const fs = require('fs');

try {
  let dataString = '';
  const data = fs.createReadStream('./data.txt');

  data.on('data', chunk => dataString += chunk);

  data.on('end', () => {
    let lines = dataString.split(/\n/);

    // Count occurrences of the word "XMAS" in various directions
    let occurrences = 0;
    const wordLength = 4; // Length of the word 'XMAS' and its reverse 'SAMX' is fixed

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        // Use a helper function for better readability and DRY principle
        const checkWord = (di, dj, word) => {
          for (let k = 0; k < word.length; k++) {
            if (i + k * di >= lines.length || i + k * di < 0 || j + k * dj >= lines[i].length || j + k * dj < 0) {
              return false; // Out of bounds
            }
            if (lines[i + k * di][j + k * dj] !== word[k]) {
              return false;
            }
          }
          return true;
        };

        // List of possible words and their movement directions
        const wordsAndDirections = [
          ['XMAS', 0, 1], // Horizontal Forward
          ['SAMX', 0, 1], // Horizontal Backward
          ['XMAS', 1, 0], // Vertical Downward
          ['XMAS', -1, 0], // Vertical Upward
          ['XMAS', 1, 1], // Diagonal Downward Right
          ['XMAS', -1, 1],// Diagonal Upward Right
          ['XMAS', 1, -1],// Diagonal Downward Left
          ['XMAS', -1, -1]// Diagonal Upward Left
        ];

        for (const [word, di, dj] of wordsAndDirections) {
          if (checkWord(di, dj, word)) {
            occurrences++;
          }
        }
      }
    }
    
    console.log('Part 1:', occurrences);

    // Part 2

    let occurrences2 = 0;

    for (let i = 1; i < lines.length - 1; i++) { // Start from 1 and end at length - 1 to avoid boundary checks inside
      for (let j = 1; j < lines[i].length - 1; j++) { // Same for columns
        if (lines[i][j] === 'A') {
          const topLeft = lines[i - 1][j - 1];
          const topRight = lines[i - 1][j + 1];
          const bottomLeft = lines[i + 1][j - 1];
          const bottomRight = lines[i + 1][j + 1];

          // Use an array to simplify condition checks
          const conditions = [
            [topLeft, topRight, bottomLeft, bottomRight],  // Check possibility 1
            ['M', 'S', 'M', 'S'],
            // Check possibility 2
            [topLeft, topRight, bottomLeft, bottomRight],  // same array
            ['M', 'M', 'S', 'S'],
            // Check possibility 3
            [topLeft, topRight, bottomLeft, bottomRight],  // same array
            ['S', 'M', 'S', 'M'],
            // Check possibility 4
            [topLeft, topRight, bottomLeft, bottomRight],  // same array
            ['S', 'S', 'M', 'M']
          ];

          // Iterate through conditions to increment occurrences
          for (let k = 0; k < conditions.length; k += 2) {
            if (conditions[k].every((e, idx) => e === conditions[k + 1][idx])) {
              occurrences2++;
              break; // Exit early when a match is found to improve performance
            }
          }
        }
      }
    }

    console.log('Part 2:', occurrences2);
  });

} catch (e) {
  console.log('error: ', e);
}