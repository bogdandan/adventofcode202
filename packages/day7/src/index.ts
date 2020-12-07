import path from 'path';
import fs from 'fs';
import { Bag, Item } from './model';

function readInput(filename: string): Bag[] {
  const filePath = path.join(__dirname, '../data', filename);
  const inputs = fs.readFileSync(filePath, 'utf-8');
  return inputs.split('\n').map<Bag>((input) => {
    const [color, items] = input.split('bags contain');
    const bag: Bag = { color: color.trim(), holds: [] };
    if (!items.includes('no other bags')) {
      const holds = items
        .trim()
        .split(',')
        .map<Item>(
          (item): Item => {
            const [count, model, color] = item.trim().split(' ');
            return { count: Number(count), color: `${model.trim()} ${color.trim()}`.trim() };
          },
        );
      bag.holds = holds;
    }
    return bag;
  });
}

function canHoldShinyGold(color: string, bags: Bag[]): boolean {
  if (color === 'shiny gold') return true;
  const bag = bags.find((bag) => bag.color === color);
  if (!bag) return false;
  if (bag.holds.length === 0) return false;
  return bag.holds.some((item) => canHoldShinyGold(item.color, bags));
}

function computeChallenge1(bags: Bag[]): number {
  return bags.filter((bag) => bag.holds.some((item) => canHoldShinyGold(item.color, bags))).length;
}

function howManyBagsCanHold(item: Item, bags: Bag[]): number {
  const bag = bags.find((bag) => bag.color === item.color);
  if (!bag) return 0;
  if (bag.holds.length === 0) {
    return 0;
  }

  return bag.holds.reduce((acc, item) => {
    console.log(item, howManyBagsCanHold(item, bags));
    return acc + item.count + item.count * howManyBagsCanHold(item, bags);
  }, 0);
}

function computeChallenge2(bags: Bag[]): number {
  const shinyBag = bags.find((bag) => bag.color === 'shiny gold');
  if (!shinyBag) return 0;

  return shinyBag.holds.reduce((acc, item) => {
    return acc + item.count + item.count * howManyBagsCanHold(item, bags);
  }, 0);
}

async function main(): Promise<number[]> {
  const fileName = typeof process.env.FILE === 'string' ? process.env.FILE : 'test';
  const result = readInput(fileName);
  const challenge1 = computeChallenge1(result);
  const challenge2 = computeChallenge2(result);
  return [challenge1, challenge2];
}

main().then(console.log).catch(console.error);
