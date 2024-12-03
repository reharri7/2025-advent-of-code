const fs = require('fs');

function readDataFromFile(filePath) {
  return fs.promises.readFile(filePath, 'utf8');
}

function parseReports(data) {
  return data.split(/\n/).map(report => report.split(/\s+/).map(Number).filter(n => !isNaN(n)));
}

function isReportSafe(arr) {
  return (isAllIncreasing(arr) || isAllDecreasing(arr)) && isLevelChangeSafe(arr);
}

function isAllIncreasing(arr) {
  return arr.every((num, index) => index === 0 || num > arr[index - 1]);
}

function isAllDecreasing(arr) {
  return arr.every((num, index) => index === 0 || num < arr[index - 1]);
}

function isLevelChangeSafe(arr) {
  return arr.every((num, index) => index === 0 || (Math.abs(num - arr[index - 1]) >= 1 && Math.abs(num - arr[index - 1]) <= 3));
}

function countSafeReports(reports, checkWithAlteration = false) {
  return reports.reduce((count, levels) => {
    if (isReportSafe(levels)) {
      return count + 1;
    }
    if (checkWithAlteration) {
      for (let i = 0; i < levels.length; i++) {
        const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isReportSafe(modifiedLevels)) {
          return count + 1;
        }
      }
    }
    return count;
  }, 0);
}

(async function processReports() {
  try {
    const dataString = await readDataFromFile('./data.txt');
    const reports = parseReports(dataString);

    const safeReportsCount = countSafeReports(reports);
    const safeReportsCount2 = countSafeReports(reports, true);

    console.log('PART 1');
    console.log(safeReportsCount);
    console.log('PART 2');
    console.log(safeReportsCount2);
  } catch (e) {
    console.error('error: ', e);
  }
})();