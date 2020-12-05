import { Passport } from './model';

export function isValidPassport(passport: Partial<Passport>): passport is Passport {
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;
  return !!byr && !!iyr && !!eyr && !!hgt && !!hcl && !!ecl && !!pid;
}

export function validateRange(
  input: string | number | undefined,
  min: number,
  max: number,
): boolean {
  if (!input) {
    return false;
  }
  const nr = typeof input === 'string' ? parseInt(input, 10) : input;
  return min <= nr && nr <= max;
}

export function validateHeight(value: string | undefined): boolean {
  if (!value) {
    return false;
  }
  const height = parseInt(value, 10);
  if (value.endsWith('cm')) {
    return validateRange(height, 150, 193);
  } else if (value.endsWith('in')) {
    return validateRange(height, 59, 76);
  } else {
    return false;
  }
}

export function validateHairColor(value: string | undefined): boolean {
  if (!value) {
    return false;
  }
  return value.length === 7 && new RegExp('^#[0-9a-f]{6}').test(value);
}

export function validateEyeColor(value: string | undefined): boolean {
  if (!value) {
    return false;
  }
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
}

export function validatePid(value: string | undefined): boolean {
  if (!value) {
    return false;
  }
  return value.length === 9 && new RegExp('[\\d]{9}').test(value);
}
