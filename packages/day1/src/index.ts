import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

interface FileContent {
  inputs: number[];
  inputsRecord: Record<number, number>;
}

async function readInput(filename: string): Promise<FileContent> {
  const filePath = path.join(__dirname, '../data', filename);
  const inputs = await promisify(fs.readFile)(filePath, 'utf8');
  const result: FileContent = {
    inputs: [],
    inputsRecord: {},
  };
  inputs.split('\n').forEach((input) => {
    const nr = Number(input);
    result.inputs.push(nr);
    result.inputsRecord[nr] = nr;
  });
  return result;
}

function computeChallenge1(result: FileContent): number {
  for (let i = 0; i < result.inputs.length; ++i) {
    const key = 2020 - result.inputs[i];
    if (typeof result.inputsRecord[key] === 'number') {
      return result.inputsRecord[key] * result.inputs[i];
    }
  }
  return 0;
}

function computeChallenge2(result: FileContent): number {
  for (let i = 0; i < result.inputs.length; ++i) {
    for (let j = i; j < result.inputs.length; ++j) {
      const key = 2020 - result.inputs[i] - result.inputs[j];
      if (typeof result.inputsRecord[key] === 'number') {
        return result.inputsRecord[key] * result.inputs[i] * result.inputs[j];
      }
    }
  }
  return 0;
}

async function main(): Promise<number[]> {
  const fileName = typeof process.env.FILE === 'string' ? process.env.FILE : 'test';
  const result = await readInput(fileName);
  const challenge1 = computeChallenge1(result);
  const challenge2 = computeChallenge2(result);
  return [challenge1, challenge2];
}

main().then(console.log).catch(console.error);
