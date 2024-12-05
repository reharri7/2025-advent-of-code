import {getInput, sum} from "../utils/index.js";

const data = getInput('../day5');

const formatInput = input => {
  const [rules, updates] = input.trim().split('\n\n')

  return {
    rules: rules.split('\n').map(line => {
      const [left, right] = line.split('|').map(Number)
      return { left, right }
    }),
    updates: updates.split('\n').map(line => line.split(',').map(Number)),
  }
}

function indexRules(rules) {
  const result = {}

  for (const rule of rules) {
    const { left, right } = rule

    if (result[left] === undefined) {
      result[left] = new Set()
    }

    result[left].add(right)
  }

  return result
}

function validateUpdate(update, rulesIndex) {
  for (let i = 0; i < update.length; i++) {
    for (let j = i + 1; j < update.length; j++) {
      const left = update[i]
      const right = update[j]

      if (!rulesIndex[left]?.has(right)) {
        return false
      }
    }
  }

  return true
}

function getMiddle(arr) {
  return arr[Math.floor(arr.length / 2)]
}

function solution1(input) {
  const { rules, updates } = formatInput(input)
  const rulesIndex = indexRules(rules)

  const validUpdates = updates.filter(update =>
    validateUpdate(update, rulesIndex)
  )

  const middles = validUpdates.map(getMiddle)

  return sum(middles);
}


function fixUpdate(update, rulesIndex) {
  return update.sort((a, b) => {
    if (rulesIndex[a]?.has(b)) return -1
    if (rulesIndex[b]?.has(a)) return 1
    return 0
  })
}

function solution2(input) {
  const { rules, updates } = formatInput(input)
  const rulesIndex = indexRules(rules)

  const invalidUpdates = updates.filter(
    update => !validateUpdate(update, rulesIndex)
  )

  const fixedUpdates = invalidUpdates.map(update =>
    fixUpdate(update, rulesIndex)
  )

  const middles = fixedUpdates.map(getMiddle)

  return sum(middles);
}

console.log('Solution 1: ', solution1(data))
console.log('Solution 2: ', solution2(data))