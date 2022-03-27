import React, { FC, useCallback, useState } from 'react';
import { Bin, Garbage } from '../../types';
import update from 'immutability-helper';
import GarbageBin from './GarbageBin';
import GarbageItem from './GarbageItem';

const Container: FC = () => {
  const initialBins: Bin[] = [
    {
      name: 'general',
      accepts: ['food'],
      droppedItems: [],
      lastDroppedItem: null,
    },
    {
      name: 'recycle',
      accepts: ['bottle', 'paper'],
      droppedItems: [],
      lastDroppedItem: null,
    },
    {
      name: 'garden',
      accepts: ['plant'],
      droppedItems: [],
      lastDroppedItem: null,
    },
  ];

  const garbageList: Garbage[] = [
    {
      name: 'vegetable',
      type: 'food',
    },
    {
      name: 'pizza',
      type: 'food',
    },
    {
      name: 'cardboard',
      type: 'paper',
    },
    {
      name: 'water bottle',
      type: 'bottle',
    },
    {
      name: 'grass',
      type: 'plant',
    },
  ];

  const [bins, setBins] = useState(initialBins);
  const [garbages] = useState(garbageList);
  const [droppedGarbageNames, setDroppedGarbageNames] = useState<string[]>([]);

  const isDropped = (garbageName: string) => {
    return droppedGarbageNames.indexOf(garbageName) > -1;
  };

  const handleDrop = useCallback(
    (index: number, item: { name: string }) => {
      const { name } = item;
      setDroppedGarbageNames(
        update(droppedGarbageNames, name ? { $push: [name] } : { $push: [] })
      );
      setBins(
        update(bins, {
          [index]: {
            droppedItems: { $push: [name] },
            lastDroppedItem: { $set: name },
          },
        })
      );
    },
    [bins, droppedGarbageNames]
  );

  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {bins.map(({ accepts, lastDroppedItem, droppedItems }, index) => (
          <GarbageBin
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            droppedItems={droppedItems}
            onDrop={item => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {garbages.map(({ name, type }, index) => (
          <GarbageItem
            name={name}
            type={type}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Container;
