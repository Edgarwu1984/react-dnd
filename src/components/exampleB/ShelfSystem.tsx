import { FC, useCallback, useState } from 'react';
import { ShelfItemType, ShelfType } from '../../types';
import Shelf from './Shelf';
import ShelfItem from './ShelfItem';

const ShelfSystem: FC = () => {
  const initialShelves: ShelfType[] = [
    {
      id: '1',
      accepts: ['blue', 'green'],
      droppedItem: null,
      type: 'blue',
    },
    {
      id: '2',
      accepts: ['blue', 'green'],
      droppedItem: null,
      type: 'blue',
    },
    {
      id: '3',
      accepts: ['blue', 'green'],
      droppedItem: null,
      type: 'blue',
    },
    {
      id: '4',
      accepts: ['blue', 'green'],
      droppedItem: null,
      type: 'blue',
    },
    {
      id: '5',
      accepts: ['blue', 'green'],
      droppedItem: null,
      type: 'blue',
    },
    {
      id: '6',
      accepts: ['blue', 'green'],
      droppedItem: null,
      type: 'blue',
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
        id: String(index),
        accepts: ['blue', 'green'],
        droppedItem: null,
        type: 'blue',
      };

      newShelves.splice(index, 1, updatedItem);

      setShelves(newShelves);
    },
    [shelves]
  );

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    let newShelves = [...shelves];
    const dragItem = newShelves.find((_, i) => i === dragIndex);
    const targetItem = newShelves.find((_, i) => i === hoverIndex);

    dragItem !== undefined && newShelves.splice(hoverIndex, 1, dragItem);
    targetItem !== undefined && newShelves.splice(dragIndex, 1, targetItem);

    setShelves(newShelves);
  };

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
            index={index}
            id={item.id}
            accept={item.accepts}
            droppedItem={item.droppedItem}
            onDrop={item => handleDrop(index, item)}
            onDelete={() => handleDelete(index)}
            moveShelf={handleMove}
            type={item.type}
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
