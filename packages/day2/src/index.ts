import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

interface Password {
  text: string;
  min: number;
  max: number;
  character: string;
}

async function readInput(filename: string): Promise<Password[]> {
  const filePath = path.join(__dirname, '../data', filename);
  const lines = await promisify(fs.readFile)(filePath, 'utf8');
  return lines.split('\n').map<Password>((line) => {
    const [minMax, character, text] = line.split(' ');
    const [min, max] = minMax.split('-');
    return {
      min: Number(min),
      max: Number(max),
      character: character.charAt(0),
      text,
    };
  });
}

function isPasswordValid({ min, max, character, text }: Password): boolean {
  if (text.length < min) {
    return false;
  }

  let foundTimes = 0;

  for (let index = 0; index <= text.length; ++index) {
    if (text.charAt(index) === character) {
      foundTimes += 1;
    }
    if (foundTimes > max) {
      return false;
    }
  }

  return min <= foundTimes && foundTimes <= max;
}

function computeChallenge1(paswords: Password[]): number {
  return paswords.filter(isPasswordValid).length;
}

function computeChallenge2(paswords: Password[]): number {
  return paswords.filter(({ min: pos, max: pos1, character, text }) => {
    const char1 = text.charAt(pos - 1) === character;
    const char2 = text.charAt(pos1 - 1) === character;
    return (char1 && !char2) || (char2 && !char1);
  }).length;
}

async function main(): Promise<number[]> {
  const fileName = typeof process.env.FILE === 'string' ? process.env.FILE : 'test';
  const result = await readInput(fileName);
  const challenge1 = computeChallenge1(result);
  const challenge2 = computeChallenge2(result);
  return [challenge1, challenge2];
}

main().then(console.log).catch(console.error);

