export interface Bin {
  name: 'general' | 'recycle' | 'garden';
  accepts: string[];
  droppedItems: string[];
  lastDroppedItem: string | null;
}

export interface Garbage {
  name: string;
  type: 'food' | 'bottle' | 'plant' | 'paper';
}

export interface Container {
  droppedBoxName: string[];
  bins: Bin[];
  boxes: Garbage[];
}

export interface ShelfType {
  accepts: string[];
  droppedItem: ShelfItemType | null;
}

export interface ShelfItemType {
  name: string;
  type: string;
}
