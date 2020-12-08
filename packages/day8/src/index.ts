import path from 'path';
import fs from 'fs';
import { Instruction, OP_CODE } from './model';

function readInput(filename: string): Instruction[] {
  const filePath = path.join(__dirname, '../data', filename);
  const inputs = fs.readFileSync(filePath, 'utf-8');
  return inputs.split('\n').map((line) => {
    const [opCode, value] = line.split(' ');
    return {
      opCode: opCode.trim() as OP_CODE,
      value: Number(value),
    };
  });
}

function runProgram(instructions: Instruction[]): number {
  const visitedInstructions: Record<number, boolean> = {};
  let instructionPointer = 0;
  let accumulator = 0;
  while (true) {
    if (visitedInstructions[instructionPointer]) {
      throw new Error(`${accumulator}`);
    } else if (instructionPointer < instructions.length) {
      visitedInstructions[instructionPointer] = true;
      const instruction = instructions[instructionPointer];
      switch (instruction.opCode) {
        case OP_CODE.NOP: {
          instructionPointer += 1;
          break;
        }
        case OP_CODE.JMP: {
          instructionPointer += instruction.value;
          break;
        }
        case OP_CODE.ACC: {
          instructionPointer += 1;
          accumulator += instruction.value;
          break;
        }
      }
    } else {
      return accumulator;
    }
  }
}

function computeChallenge1(instructions: Instruction[]): number {
  try {
    return runProgram(instructions);
  } catch (e) {
    return +e.message;
  }
}

function computeChallenge2(instructions: Instruction[]): number {
  let result = 0;
  // NOTE: since instruction is object we can change it in place
  for (const instruction of instructions) {
    try {
      if (instruction.opCode === OP_CODE.NOP) {
        instruction.opCode = OP_CODE.JMP;
      } else if (instruction.opCode === OP_CODE.JMP) {
        instruction.opCode = OP_CODE.NOP;
      } else {
        continue;
      }
      return runProgram(instructions);
    } catch (e) {
      // NOTE: undo changes means we hit infinite loop
      if (instruction.opCode === OP_CODE.JMP) {
        instruction.opCode = OP_CODE.NOP;
      } else if (instruction.opCode === OP_CODE.NOP) {
        instruction.opCode = OP_CODE.JMP;
      }
    }
  }
  return result;
}

async function main(): Promise<number[]> {
  const fileName = typeof process.env.FILE === 'string' ? process.env.FILE : 'test';
  const result = readInput(fileName);
  const challenge1 = computeChallenge1(result);
  const challenge2 = computeChallenge2(result);
  return [challenge1, challenge2];
}

main().then(console.log).catch(console.error);
