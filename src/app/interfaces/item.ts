export interface Item {
  name: string;
  quantity: number;
}

export interface ExistingItem extends Item {
  id: string;
}
