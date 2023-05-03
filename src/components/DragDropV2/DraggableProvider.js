import React, { createContext, useState } from "react";

export const draggableContext = createContext(null);

export const DraggableProvider = ({
  children,
  items,
  onDragEnd,
  pressDelay,
}) => {
  const [dragEvent, setDragEvent] = useState({
    dragOccuring: false,
    ref: null,
    children: null,
    sourceIndex: null,
    destinationIndex: null,
    clientX: 0,
    clientY: 0,
  });

  const resetDragEvent = () => {
    setDragEvent({
      dragOccuring: false,
      ref: null,
      children: null,
      sourceIndex: null,
      destinationIndex: null,
      clientX: 0,
      clientY: 0,
    });
  };

  const value = {
    dragEvent,
    setDragEvent,
    resetDragEvent,
    items,
    onDragEnd,
    pressDelay,
  };

  return (
    <draggableContext.Provider value={value}>
      {children}
    </draggableContext.Provider>
  );
};
