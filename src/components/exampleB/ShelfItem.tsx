import React, { CSSProperties, FC } from 'react';
import { useDrag } from 'react-dnd';

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  width: '100px',
  textAlign: 'center',
};

interface ShelfItemProps {
  name: string;
  type: string;
}

const ShelfItem: FC<ShelfItemProps> = ({ name, type }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type]
  );
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      {name}
    </div>
  );
};

export default ShelfItem;
