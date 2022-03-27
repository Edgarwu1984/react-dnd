import React, { CSSProperties, FC } from 'react';
import { useDrop } from 'react-dnd';
import { ShelfItemType } from '../../types';

const style: CSSProperties = {
  height: '3rem',
  width: '12rem',
  marginBottom: '0.2rem',
  textAlign: 'center',
  fontSize: '1rem',
  border: '1px solid black',
};

interface ShelfProps {
  accept: string[];
  droppedItem: ShelfItemType | null;
  onDrop: (item: any) => void;
  onDelete: () => void;
}

const Shelf: FC<ShelfProps> = ({ accept, droppedItem, onDrop, onDelete }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  let backgroundColor = 'white';
  if (isActive) {
    if (canDrop) {
      backgroundColor = 'darkgreen';
    } else {
      backgroundColor = 'red';
    }
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {/* {isActive ? 'Release to drop' : `Only: ${accept.join(', ')}`} */}
      {droppedItem !== null && (
        <div
          style={{
            backgroundColor: 'royalblue',
            height: '100%',
            width: '100%',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // paddingLeft: '1rem',
          }}
        >
          <span style={{ marginLeft: '8px' }}>{droppedItem?.name}</span>
          <button
            onClick={onDelete}
            style={{ color: 'red', marginLeft: 'auto', marginRight: '8px' }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Shelf;
