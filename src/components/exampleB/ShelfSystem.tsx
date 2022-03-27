import React, { FC, useCallback, useState } from 'react';
import { ShelfItemType, ShelfType } from '../../types';
import update from 'immutability-helper';
import Shelf from './Shelf';
import ShelfItem from './ShelfItem';

const ShelfSystem: FC = () => {
  const initialShelves: ShelfType[] = [
    {
      accepts: ['blue', 'green'],
      droppedItem: null,
    },
    {
      accepts: ['blue', 'green'],
      droppedItem: null,
    },
    {
      accepts: ['blue', 'green'],
      droppedItem: null,
    },
    {
      accepts: ['blue', 'green'],
      droppedItem: null,
    },
    {
      accepts: ['blue', 'green'],
      droppedItem: null,
    },
    {
      accepts: ['blue', 'green'],
      droppedItem: null,
    },
  ];

  const itemList: ShelfItemType[] = [
    {
      name: 'shelf_blue_1',
      type: 'blue',
    },
    {
      name: 'shelf_green_1',
      type: 'green',
    },
    {
      name: 'shelf_yellow_1',
      type: 'yellow',
    },
    {
      name: 'shelf_red_1',
      type: 'red',
    },
    {
      name: 'shelf_blue_2',
      type: 'blue',
    },
  ];

  const [shelves, setShelves] = useState(initialShelves);
  const [items] = useState(itemList);

  const handleDrop = useCallback(
    (index: number, item: ShelfItemType) => {
      let newShelves = [...shelves];

      const shelfItem = shelves.find((_, i) => i === index);

      const droppedItem = items.find(i => i.name === item.name);

      const updatedShelf = droppedItem !== undefined &&
        shelfItem?.accepts !== undefined && {
          ...shelfItem,
          droppedItem: droppedItem,
        };

      updatedShelf && newShelves.splice(index, 1, updatedShelf);

      setShelves(newShelves);
    },
    [items, shelves]
  );

  const handleDelete = useCallback(
    (index: number) => {
      let newShelves = [...shelves];

      const updatedItem: ShelfType = {
        accepts: ['blue', 'green'],
        droppedItem: null,
      };

      newShelves.splice(index, 1, updatedItem);

      setShelves(newShelves);
    },
    [shelves]
  );

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div
        style={{
          overflow: 'hidden',
          clear: 'both',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {shelves.map((item, index) => (
          <Shelf
            key={index}
            accept={item.accepts}
            droppedItem={item.droppedItem}
            onDrop={item => handleDrop(index, item)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'grey',
          width: 'fit-content',
        }}
      >
        {items.map(({ name, type }, index) => (
          <ShelfItem name={name} type={type} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ShelfSystem;
