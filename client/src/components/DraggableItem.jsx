import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "./ItemTypes";

const DraggableItem = ({ id, type, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.DRAGGABLE_ITEM,
    item: { id, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ opacity }}>
      {children}
    </div>
  );
};

export default DraggableItem;
