import React, { CSSProperties, FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ShelfItemType } from '../../types';
import { XYCoord, Identifier } from 'dnd-core';

const style: CSSProperties = {
  height: '3rem',
  width: '12rem',
  marginBottom: '0.2rem',
  textAlign: 'center',
  fontSize: '1rem',
  border: '1px solid black',
  cursor: 'move',
};

interface ShelfProps {
  id: string;
  index: number;
  moveShelf: (dragIndex: number, hoverIndex: number) => void;
  accept: string[];
  droppedItem: ShelfItemType | null;
  onDrop: (item: any) => void;
  onDelete: () => void;
  type: string;
}

const Shelf: FC<ShelfProps> = ({
  accept,
  index,
  id,
  moveShelf,
  droppedItem,
  onDrop,
  onDelete,
  type,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handleId, isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      handleId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveShelf(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

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
    <div
      ref={ref}
      style={{ ...style, opacity, backgroundColor }}
      data-handler-id={handleId}
    >
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
