import path from 'path';
import fs from 'fs';
import {
  validateRange,
  validateHeight,
  validateHairColor,
  validateEyeColor,
  validatePid,
  isValidPassport,
} from './util';
import { Passport } from './model';

function readInput(filename: string): Partial<Passport>[] {
  const filePath = path.join(__dirname, '../data', filename);
  const input = fs.readFileSync(filePath, 'utf-8');
  const lines: string[] = [];
  input.split('\n\n').forEach((line) => {
    lines.push(line.split('\n').join(' '));
  });

  return lines.map<Partial<Passport>>((line) => {
    const passport: Partial<Passport> = {};

    line.split(' ').forEach((kv) => {
      const [key, value] = kv.split(':');
      ((passport as unknown) as any)[key] = value;
    });

    return passport;
  });
}

function computeChallenge1(passport: Partial<Passport>[]): number {
  return passport.filter(isValidPassport).length;
}

function computeChallenge2(passport: Partial<Passport>[]): number {
  return passport.filter(({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => {
    return (
      isValidPassport({ byr, iyr, eyr, hgt, hcl, ecl, pid }) &&
      validateRange(byr, 1920, 2002) &&
      validateRange(iyr, 2010, 2020) &&
      validateRange(eyr, 2020, 2030) &&
      validateHeight(hgt) &&
      validateHairColor(hcl) &&
      validateEyeColor(ecl) &&
      validatePid(pid)
    );
  }).length;
}

async function main(): Promise<number[]> {
  const fileName = typeof process.env.FILE === 'string' ? process.env.FILE : 'test';
  const result = readInput(fileName);
  const challenge1 = computeChallenge1(result);
  const challenge2 = computeChallenge2(result);
  return [challenge1, challenge2];
}

main().then(console.log).catch(console.error);
