import path from 'path';
import fs from 'fs';

function readInput(filename: string): number[] {
  const filePath = path.join(__dirname, '../data', filename);
  const inputs = fs.readFileSync(filePath, 'utf-8');
  return inputs.split('\n').map((line) => Number(line));
}

function sumOfPreviousValues(value: number, values: number[]): boolean {
  return values.some((outerValue, index) => {
    return values.slice(index + 1).some((innerValue) => {
      if (outerValue === innerValue) {
        return false;
      }
      return outerValue + innerValue === value;
    });
  });
}

function computeChallenge1(values: number[]): number {
  let preamble = 25;

  for (let i = preamble; i < values.length; ++i) {
    const value = values[i];
    if (!sumOfPreviousValues(value, values.slice(i - preamble, i))) {
      return value;
    }
  }

  return 0;
}

function computeChallenge2(values: number[]): number {
  const nr = 23278925;
  const sumValuesSorFar: number[] = [];
  let sum = 0;
  for (const value of values) {
    if (value > nr || sum === nr) {
      break;
    }

    sum += value;
    sumValuesSorFar.push(value);

    if (sum > nr) {
      do {
        const value = sumValuesSorFar.shift();
        if (value) {
          sum -= value;
        }
      } while (sum > nr);
    }
  }

  return Math.min(...sumValuesSorFar) + Math.max(...sumValuesSorFar);
}

async function main(): Promise<number[]> {
  const fileName = typeof process.env.FILE === 'string' ? process.env.FILE : 'test';
  const result = readInput(fileName);
  const challenge1 = computeChallenge1(result);
  const challenge2 = computeChallenge2(result);
  return [challenge1, challenge2];
}

main().then(console.log).catch(console.error);
