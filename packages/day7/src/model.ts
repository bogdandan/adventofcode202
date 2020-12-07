export interface Bag {
  color: string;
  holds: Item[];
}

export interface Item extends Pick<Bag, 'color'> {
  count: number;
}
