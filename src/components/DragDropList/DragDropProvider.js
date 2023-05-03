import React, { createContext, useEffect, useState } from "react";

const DragDropContext = createContext(null);

const reorder = (list, startIndex, endIndex) => {
  let temp = [...list];
  const [removed] = temp.splice(startIndex, 1);
  temp.splice(endIndex, 0, removed);
  console.log(temp);
  return temp;
};

const DragDropProvider = ({ items, itemIdField, children, onDragEnd }) => {
  const [draggedId, setDraggedId] = useState(null);
  const [targetId, setTargetId] = useState(null);
  const dragOccuring = draggedId !== null;

  const resetIndicies = () => {
    setDraggedId(null);
    setTargetId(null);
  };

  const value = {
    itemIdField,
    draggedId,
    targetId,
    setDraggedId,
    setTargetId,
    onDragEnd,
    items,
    resetIndicies,
    dragOccuring,
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};
export { DragDropProvider, DragDropContext, reorder };
