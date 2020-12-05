function getMiddle(x: number, y: number): number {
  const middle = parseInt(`${(y - x) / 2}`, 10);
  return y - middle;
}

function getRow(seat: string): number {
  let low = 0;
  let high = 127;
  for (let i = 0; i < seat.length - 3; ++i) {
    const value = seat.charAt(i);
    if (value === 'F') {
      high = getMiddle(low, high);
    } else if (value === 'B') {
      low = getMiddle(low, high);
    }
  }
  return low;
}

function getColumn(seat: string): number {
  let low = 0;
  let high = 7;
  for (let i = seat.length - 3; i < seat.length; ++i) {
    const value = seat.charAt(i);
    if (value === 'L') {
      high = getMiddle(low, high);
    } else if (value === 'R') {
      low = getMiddle(low, high);
    }
  }
  return low;
}

export function getSeatId(seat: string): number {
  const row = getRow(seat);
  const column = getColumn(seat);
  return row * 8 + column;
}
