import path from 'path';
import fs from 'fs';
import { Group } from './model';

function readInput(filename: string): Group[] {
  const filePath = path.join(__dirname, '../data', filename);
  const input = fs.readFileSync(filePath, 'utf-8');
  const groups: Group[] = [];
  input.split('\n\n').forEach((groupInput) => {
    const group: Group = {
      persons: [],
    };
    groupInput.split('\n').forEach((personAnswer) => {
      group.persons.push({ answers: personAnswer.split('') });
    });
    groups.push(group);
  });
  return groups;
}

function computeChallenge1(groups: Group[]): number {
  return groups.reduce((acc, group) => {
    const uniqAnswers = new Set();
    group.persons.forEach((p) => {
      p.answers.forEach((answer) => uniqAnswers.add(answer));
    });
    return acc + uniqAnswers.size;
  }, 0);
}

function computeChallenge2(groups: Group[]): number {
  return groups.reduce((acc, group) => {
    const answersPerQuestion: Record<string, number> = {};
    group.persons.forEach((person) => {
      person.answers.forEach((answer) => {
        if (typeof answersPerQuestion[answer] === 'undefined') {
          answersPerQuestion[answer] = 0;
        }
        answersPerQuestion[answer] += 1;
      });
    });
    const answers = Object.values(answersPerQuestion).filter(
      (answerPerQuestion) => answerPerQuestion === group.persons.length,
    ).length;
    return acc + answers;
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
