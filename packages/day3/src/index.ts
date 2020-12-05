import path from 'path';
import fs from 'fs';

interface Tile {
  i: number;
  j: number;
  isTree: boolean;
}

interface Map {
  width: number;
  height: number;
  tiles: Tile[];
}

async function readInput(filename: string): Promise<Map> {
  const filePath = path.join(__dirname, '../data', filename);
  const input = await fs.promises.readFile(filePath, 'utf-8');
  const lines = input.split('\n');
  const result: Map = {
    height: lines.length,
    width: lines[0].length,
    tiles: [],
  };
  lines.forEach((line, i) => {
    for (let j = 0; j < line.length; ++j) {
      const isTree = line.charAt(j) === '#';
      const Tile = { i, j, isTree: isTree };
      result.tiles.push(Tile);
    }
  });
  return result;
}

interface GetNextPositionInput {
  i: number;
  j: number;
  width: number;
  right: number;
  down: number;
}
function getNextPosition(input: GetNextPositionInput): Pick<GetNextPositionInput, 'i' | 'j'> {
  const { i, j, width, right, down } = input;
  return {
    i: i + down,
    j: (j + right) % width,
  };
}

function getNrOfTrees(tiles: Tile[], width: number, right: number, down: number): number {
  let nrOfTrees = 0;
  let i = down;
  let j = right;

  tiles.forEach((tile) => {
    if (tile.i === i && tile.j === j) {
      ({ i, j } = getNextPosition({ i, j, width, right, down }));
      nrOfTrees += tile.isTree ? 1 : 0;
    }
  });

  return nrOfTrees;
}

function computeChallenge1(map: Map): number {
  return getNrOfTrees(map.tiles, map.width, 3, 1);
}

function computeChallenge2(map: Map): number {
  return [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ]
    .map(({ right, down }) => getNrOfTrees(map.tiles, map.width, right, down))
    .reduce((acc, value) => acc * value, 1);
}

async function main(): Promise<number[]> {
  const fileName = typeof process.env.FILE === 'string' ? process.env.FILE : 'test';
  const result = await readInput(fileName);
  const challenge1 = computeChallenge1(result);
  const challenge2 = computeChallenge2(result);
  return [challenge1, challenge2];
}

main().then(console.log).catch(console.error);
