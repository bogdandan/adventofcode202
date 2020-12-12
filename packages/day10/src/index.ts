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
  values.unshift(0);
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

function computeChallenge2(values: number[]): number {
  return 0;
}

async function main(): Promise<number[]> {
  const fileName = typeof process.env.FILE === 'string' ? process.env.FILE : 'test';
  const result = readInput(fileName);
  const challenge1 = computeChallenge1(result);
  const challenge2 = computeChallenge2(result);
  return [challenge1, challenge2];
}

main().then(console.log).catch(console.error);
