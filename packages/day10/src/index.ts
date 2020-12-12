import path from 'path';
import fs from 'fs';
import { maxHeaderSize } from 'http';

function readInput(filename: string): number[] {
  const filePath = path.join(__dirname, '../data', filename);
  const inputs = fs.readFileSync(filePath, 'utf-8');
  return inputs
    .split('\n')
    .map((line) => Number(line))
    .sort((a, b) => a - b);
}

function computeChallenge1(values: number[]): number {
  const jolts: Record<number, number[]> = { 1: [], 2: [], 3: [] };

  values.forEach((jolt, index, arr) => {
    if (index === arr.length - 1) {
      jolts[3].push(jolt);
    } else {
      const diff = arr[index + 1] - jolt;
      jolts[diff].push(jolt);
    }
  });

  return jolts[1].length * jolts[3].length;
}

function tribonacci(v: number): number {
  let result = 1;
  for (let index = 1; index < v; ++index) {
    result += index;
  }

  return result;
}

function computeChallenge2(values: number[]): number {
  const result = values
    .map((value, index, arr) => {
      if (index === arr.length - 1) {
        return 3;
      } else {
        return arr[index + 1] - value;
      }
    })
    .join('')
    .split('3')
    .filter((values) => values.length)
    .reduce((acc, value) => {
      return acc * tribonacci(value.length);
    }, 1);
  return result;
}

async function main(): Promise<number[]> {
  const fileName = typeof process.env.FILE === 'string' ? process.env.FILE : 'test';
  const result = readInput(fileName);
  result.unshift(0);
  const challenge1 = computeChallenge1(result);
  const challenge2 = computeChallenge2(result);
  return [challenge1, challenge2];
}

main().then(console.log).catch(console.error);
