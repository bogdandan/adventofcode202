export enum OP_CODE {
  NOP = 'nop',
  JMP = 'jmp',
  ACC = 'acc',
}

export interface Instruction {
  opCode: OP_CODE;
  value: number;
}
