import path from 'path';
import fs from 'fs';
import { getSeatId } from './util';

function readInput(filename: string): string[] {
  const filePath = path.join(__dirname, '../data', filename);
  const input = fs.readFileSync(filePath, 'utf-8');
  return input.split('\n');
}

function computeChallenge1(seats: string[]): number {
  return Math.max(...seats.map(getSeatId));
}

function computeChallenge2(seats: string[]): number {
  const missingSeat =
    seats
      .map(getSeatId)
      .sort((a, b) => a - b)
      .find((seat, index, arr) => seat + 2 === arr[index + 1]) ?? -2;
  return missingSeat + 1;
}

async function main(): Promise<number[]> {
  const fileName = typeof process.env.FILE === 'string' ? process.env.FILE : 'test';
  const result = readInput(fileName);
  const challenge1 = computeChallenge1(result);
  const challenge2 = computeChallenge2(result);
  return [challenge1, challenge2];
}

main().then(console.log).catch(console.error);
