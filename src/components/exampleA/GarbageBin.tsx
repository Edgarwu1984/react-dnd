import React, { CSSProperties, FC } from 'react';
import { useDrop } from 'react-dnd';

const style: CSSProperties = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};

interface BinProps {
  accept: string[];
  lastDroppedItem?: any;
  droppedItems: string[];
  onDrop: (item: any) => void;
}

const GarbageBin: FC<BinProps> = ({
  accept,
  lastDroppedItem,
  droppedItems,
  onDrop,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {isActive ? 'Release to drop' : `This Bin accepts: ${accept.join(', ')}`}

      {lastDroppedItem && (
        <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
      )}
      {droppedItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </div>
  );
};

export default GarbageBin;
